import type { Request, Response, NextFunction } from 'express';
import { analyzeSeoWithAi } from '../services/ai-analyzer.service.js';
import { buildReport } from '../services/report.service.js';
import { getCachedReport, getReportCacheKey, setCachedReport } from '../services/report-cache.service.js';
import { scanSeo } from '../services/seo-scanner.service.js';
import { analyzeRequestSchema } from '../validators/analyze.validator.js';

const modelByMode = {
  fast: 'gemma4:e2b',
  quality: process.env.OLLAMA_MODEL || 'gemma4:e4b',
} as const;

const promptVersion = 'seo-audit-v1';

export async function analyzeController(req: Request, res: Response, next: NextFunction) {
  try {
    const startedAt = Date.now();
    const { url, mode } = analyzeRequestSchema.parse(req.body);
    const model = modelByMode[mode];
    const cacheKey = getReportCacheKey(url, model);
    const cachedReport = getCachedReport(cacheKey);

    if (cachedReport) {
      res.json({ success: true, data: cachedReport });
      return;
    }

    const scanStartedAt = Date.now();
    const scan = await scanSeo(url);
    const scanDurationMs = Date.now() - scanStartedAt;
    const aiStartedAt = Date.now();
    const analysis = await analyzeSeoWithAi(scan, model);
    const aiDurationMs = Date.now() - aiStartedAt;

    const report = buildReport(scan, analysis, {
      model,
      mode,
      localAi: true,
      scanDurationMs,
      aiDurationMs,
      totalDurationMs: Date.now() - startedAt,
      cacheHit: false,
      promptVersion,
    });

    setCachedReport(cacheKey, report);

    res.json({
      success: true,
      data: report,
    });
  } catch (error) {
    next(error);
  }
}
