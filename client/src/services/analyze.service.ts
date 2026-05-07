import type { ApiError, ApiSuccess, SeoReport } from '../types/report.types';

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export type AnalysisMode = 'fast' | 'quality';

export async function analyzeUrl(url: string, mode: AnalysisMode): Promise<SeoReport> {
  const response = await fetch(`${apiUrl}/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url, mode }),
  });

  const payload = (await response.json()) as ApiSuccess<SeoReport> | ApiError;

  if (!payload.success) {
    throw new Error(payload.message);
  }

  return payload.data;
}
