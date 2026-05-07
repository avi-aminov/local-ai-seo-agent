import type { SeoAiAnalysis, SeoReport, SeoScanResult } from '../types/seo.types.js';

export function buildReport(scan: SeoScanResult, analysis: SeoAiAnalysis): SeoReport {
  return {
    url: scan.url,
    finalUrl: scan.finalUrl,
    scan,
    analysis,
  };
}

