import type { SeoAiAnalysis, SeoReport, SeoScanResult } from '../types/seo.types.js';

interface ReportRuntime {
  model: string;
  mode: 'fast' | 'quality';
  localAi: boolean;
  scanDurationMs: number;
  aiDurationMs: number;
  totalDurationMs: number;
  cacheHit: boolean;
  promptVersion: string;
}

export function buildReport(scan: SeoScanResult, analysis: SeoAiAnalysis, runtime: ReportRuntime): SeoReport {
  return {
    url: scan.url,
    finalUrl: scan.finalUrl,
    scan,
    analysis,
    runtime,
  };
}
