import type { SeoReport } from '../types/seo.types.js';

const cache = new Map<string, { expiresAt: number; report: SeoReport }>();
const ttlMs = Number(process.env.REPORT_CACHE_TTL_MS || 15 * 60 * 1000);

export function getReportCacheKey(url: string, model: string): string {
  return `${model}:${url.trim().toLowerCase()}`;
}

export function getCachedReport(key: string): SeoReport | null {
  const entry = cache.get(key);

  if (!entry) {
    return null;
  }

  if (entry.expiresAt < Date.now()) {
    cache.delete(key);
    return null;
  }

  return {
    ...entry.report,
    runtime: {
      ...entry.report.runtime,
      cacheHit: true,
      scanDurationMs: 0,
      aiDurationMs: 0,
      totalDurationMs: 0,
      promptVersion: entry.report.runtime.promptVersion,
    },
  };
}

export function setCachedReport(key: string, report: SeoReport): void {
  cache.set(key, {
    expiresAt: Date.now() + ttlMs,
    report: {
      ...report,
      runtime: {
        ...report.runtime,
        cacheHit: false,
      },
    },
  });
}
