import { z } from 'zod';

const privateIpv4Ranges = [
  /^10\./,
  /^127\./,
  /^169\.254\./,
  /^172\.(1[6-9]|2\d|3[0-1])\./,
  /^192\.168\./,
  /^0\./,
];

function isPrivateOrLocalHost(hostname: string): boolean {
  const host = hostname.toLowerCase();

  if (host === 'localhost' || host.endsWith('.localhost')) {
    return true;
  }

  if (host === '::1' || host.startsWith('fc') || host.startsWith('fd')) {
    return true;
  }

  return privateIpv4Ranges.some((range) => range.test(host));
}

export const analyzeRequestSchema = z.object({
  url: z
    .string()
    .trim()
    .min(1, 'URL is required')
    .refine((value) => {
      try {
        const parsed = new URL(value);
        return parsed.protocol === 'http:' || parsed.protocol === 'https:';
      } catch {
        return false;
      }
    }, 'URL must be a valid http or https URL')
    .refine((value) => {
      const parsed = new URL(value);
      return !isPrivateOrLocalHost(parsed.hostname);
    }, 'Local and private network URLs are not allowed'),
});

export type AnalyzeRequest = z.infer<typeof analyzeRequestSchema>;

