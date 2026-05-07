import axios from 'axios';
import { buildSeoAnalysisPrompt } from '../prompts/seo-analysis.prompt.js';
import type { SeoAiAnalysis, SeoScanResult } from '../types/seo.types.js';
import { AppError } from '../utils/app-error.js';
import { seoAiAnalysisSchema } from '../validators/ai-response.validator.js';

interface OllamaResponse {
  response?: string;
}

function extractJson(raw: string): unknown {
  try {
    return JSON.parse(raw);
  } catch {
    const start = raw.indexOf('{');
    const end = raw.lastIndexOf('}');
    if (start === -1 || end === -1 || end <= start) {
      throw new Error('AI response did not contain JSON');
    }
    return JSON.parse(raw.slice(start, end + 1));
  }
}

function normalizeAiPayload(payload: unknown): unknown {
  if (!payload || typeof payload !== 'object') {
    return payload;
  }

  const record = payload as Record<string, unknown>;

  return {
    ...record,
    criticalIssues: Array.isArray(record.criticalIssues) ? record.criticalIssues : [],
    mediumIssues: Array.isArray(record.mediumIssues) ? record.mediumIssues : [],
    recommendations: Array.isArray(record.recommendations) ? record.recommendations : [],
    suggestedTitle: typeof record.suggestedTitle === 'string' ? record.suggestedTitle : '',
    suggestedMetaDescription:
      typeof record.suggestedMetaDescription === 'string' ? record.suggestedMetaDescription : '',
  };
}

export async function analyzeSeoWithAi(scan: SeoScanResult): Promise<SeoAiAnalysis> {
  const ollamaUrl = process.env.OLLAMA_URL || 'http://localhost:11434';
  const model = process.env.OLLAMA_MODEL || 'gemma4:e4b';
  const timeoutMs = Number(process.env.OLLAMA_TIMEOUT_MS || 180000);
  const prompt = buildSeoAnalysisPrompt(scan);

  const { data } = await axios.post<OllamaResponse>(
    `${ollamaUrl.replace(/\/$/, '')}/api/generate`,
    {
      model,
      prompt,
      stream: false,
      options: {
        temperature: 0.1,
      },
    },
    {
      timeout: timeoutMs,
    },
  );

  try {
    if (!data.response) {
      throw new AppError('Ollama returned an empty response', 503);
    }

    return seoAiAnalysisSchema.parse(normalizeAiPayload(extractJson(data.response)));
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    console.warn('AI response validation failed', {
      model,
      finalUrl: scan.finalUrl,
      error: error instanceof Error ? error.message : 'Unknown error',
    });

    throw new AppError('Failed to validate AI response', 422);
  }
}
