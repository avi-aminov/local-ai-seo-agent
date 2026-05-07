import type { SeoScanResult } from '../types/seo.types.js';

export function buildSeoAnalysisPrompt(scan: SeoScanResult): string {
  return [
    'You are an expert technical SEO auditor.',
    'Analyze only the provided scanner JSON. Do not invent data that is not present.',
    'Return valid JSON only. Do not return markdown, comments, code fences, or explanations outside JSON.',
    'The JSON shape must be exactly:',
    '{"score":number,"summary":string,"criticalIssues":string[],"mediumIssues":string[],"recommendations":string[],"suggestedTitle":string,"suggestedMetaDescription":string}',
    'Score must be from 0 to 100.',
    'Critical issues should include high-impact problems such as missing title, missing meta description, no H1, empty content, or severe crawl problems.',
    'Medium issues should include weaker heading structure, missing image alt text, missing Open Graph tags, low content length, or missing schema.',
    'Recommendations must be concise, specific, and actionable.',
    'Suggested title should usually stay under 60 characters.',
    'Suggested meta description should usually stay under 160 characters.',
    'Scanner JSON:',
    JSON.stringify(scan),
  ].join('\n');
}

