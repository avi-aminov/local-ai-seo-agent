import type { SeoScanResult } from '../types/seo.types.js';

function summarizeScanForPrompt(scan: SeoScanResult) {
  return {
    url: scan.url,
    finalUrl: scan.finalUrl,
    metadata: {
      title: scan.title,
      titleLength: scan.title.length,
      metaDescription: scan.metaDescription,
      metaDescriptionLength: scan.metaDescription.length,
      canonical: scan.canonical,
      robots: scan.robots,
      viewport: scan.viewport,
    },
    headings: {
      counts: {
        h1: scan.headings.h1.length,
        h2: scan.headings.h2.length,
        h3: scan.headings.h3.length,
        h4: scan.headings.h4.length,
        h5: scan.headings.h5.length,
        h6: scan.headings.h6.length,
      },
      h1: scan.headings.h1.slice(0, 3),
      h2: scan.headings.h2.slice(0, 8),
      h3: scan.headings.h3.slice(0, 8),
    },
    images: scan.images,
    links: scan.links,
    openGraph: scan.openGraph,
    schema: scan.schema,
    content: scan.content,
  };
}

export function buildSeoAnalysisPrompt(scan: SeoScanResult): string {
  const promptScan = summarizeScanForPrompt(scan);

  return [
    'You are an expert technical SEO auditor.',
    'Analyze only the provided scanner summary. Do not invent data that is not present.',
    'Return valid JSON only. Do not return markdown, comments, code fences, or explanations outside JSON.',
    'The JSON shape must be exactly:',
    '{"score":number,"summary":string,"criticalIssues":string[],"mediumIssues":string[],"recommendations":string[],"suggestedTitle":string,"suggestedMetaDescription":string}',
    'Score must be from 0 to 100.',
    'Critical issues should include high-impact problems such as missing title, missing meta description, no H1, empty content, or severe crawl problems.',
    'Medium issues should include weaker heading structure, missing image alt text, missing Open Graph tags, low content length, or missing schema.',
    'Recommendations must be concise, specific, and actionable.',
    'Suggested title should usually stay under 60 characters.',
    'Suggested meta description should usually stay under 160 characters.',
    'Scanner summary JSON:',
    JSON.stringify(promptScan),
  ].join('\n');
}
