import axios from 'axios';
import { buildSeoAnalysisPrompt } from '../prompts/seo-analysis.prompt.js';
import type { SeoAiAnalysis, SeoScanResult } from '../types/seo.types.js';
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

export async function analyzeSeoWithAi(scan: SeoScanResult): Promise<SeoAiAnalysis> {
  const ollamaUrl = process.env.OLLAMA_URL || 'http://localhost:11434';
  const model = process.env.OLLAMA_MODEL || 'gemma4:e4b';
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
      timeout: 60000,
    },
  );

  if (!data.response) {
    throw new Error('Ollama returned an empty response');
  }

  return seoAiAnalysisSchema.parse(extractJson(data.response));
}
