import type { Request, Response, NextFunction } from 'express';
import { analyzeSeoWithAi } from '../services/ai-analyzer.service.js';
import { buildReport } from '../services/report.service.js';
import { scanSeo } from '../services/seo-scanner.service.js';
import { analyzeRequestSchema } from '../validators/analyze.validator.js';

export async function analyzeController(req: Request, res: Response, next: NextFunction) {
  try {
    const { url } = analyzeRequestSchema.parse(req.body);
    const scan = await scanSeo(url);
    const analysis = await analyzeSeoWithAi(scan);
    res.json({ success: true, data: buildReport(scan, analysis) });
  } catch (error) {
    next(error);
  }
}

