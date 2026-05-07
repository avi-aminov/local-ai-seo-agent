import type { SeoScanResult } from '../types/report.types';

interface ScanHighlightsProps {
  scan: SeoScanResult;
}

export function ScanHighlights({ scan }: ScanHighlightsProps) {
  const highlights = [
    ['Title', scan.title || 'Missing'],
    ['Meta description', scan.metaDescription || 'Missing'],
    ['H1 count', String(scan.headings.h1.length)],
    ['Images missing alt', `${scan.images.missingAlt} / ${scan.images.total}`],
    ['Internal links', String(scan.links.internal)],
    ['External links', String(scan.links.external)],
    ['Schema blocks', String(scan.schema.count)],
    ['Word count', String(scan.content.wordCount)],
  ];

  return (
    <section className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-950">Scan Highlights</h2>
      <dl className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {highlights.map(([label, value]) => (
          <div className="rounded border border-slate-100 bg-slate-50 p-3" key={label}>
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</dt>
            <dd className="mt-1 break-words text-sm font-medium text-slate-800">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

