export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface SeoScanResult {
  url: string;
  finalUrl: string;
  title: string;
  metaDescription: string;
  canonical: string | null;
  robots: string | null;
  viewport: string | null;
  headings: Record<HeadingLevel, string[]>;
  images: {
    total: number;
    missingAlt: number;
    missingAltSamples: string[];
  };
  links: {
    internal: number;
    external: number;
    empty: number;
  };
  openGraph: {
    title: string | null;
    description: string | null;
    image: string | null;
    url: string | null;
  };
  schema: {
    count: number;
    types: string[];
  };
  content: {
    textLength: number;
    wordCount: number;
  };
}

export interface SeoAiAnalysis {
  score: number;
  summary: string;
  criticalIssues: string[];
  mediumIssues: string[];
  recommendations: string[];
  suggestedTitle: string;
  suggestedMetaDescription: string;
}

export interface SeoReport {
  url: string;
  finalUrl: string;
  scan: SeoScanResult;
  analysis: SeoAiAnalysis;
  runtime: {
    model: string;
    mode: 'fast' | 'quality';
    localAi: boolean;
    scanDurationMs: number;
    aiDurationMs: number;
    totalDurationMs: number;
    cacheHit: boolean;
    promptVersion: string;
  };
}
