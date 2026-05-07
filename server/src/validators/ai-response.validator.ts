import { z } from 'zod';

export const seoAiAnalysisSchema = z.object({
  score: z.number().min(0).max(100),
  summary: z.string().min(1),
  criticalIssues: z.array(z.string()),
  mediumIssues: z.array(z.string()),
  recommendations: z.array(z.string()),
  suggestedTitle: z.string(),
  suggestedMetaDescription: z.string(),
});

