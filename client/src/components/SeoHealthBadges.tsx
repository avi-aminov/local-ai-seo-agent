import type { SeoReport } from '../types/report.types';

interface SeoHealthBadgesProps {
  report: SeoReport;
}

function statusClass(status: string): string {
  if (status === 'Good') return 'border-emerald-100 bg-emerald-50 text-emerald-800';
  if (status === 'Missing') return 'border-red-100 bg-red-50 text-red-800';
  return 'border-amber-100 bg-amber-50 text-amber-800';
}

export function SeoHealthBadges({ report }: SeoHealthBadgesProps) {
  const scan = report.scan;
  const badges = [
    ['Metadata', scan.title && scan.metaDescription ? 'Good' : 'Needs work'],
    ['Headings', scan.headings.h1.length === 1 && scan.headings.h2.length > 0 ? 'Good' : 'Needs work'],
    ['Images', scan.images.missingAlt === 0 ? 'Good' : 'Needs work'],
    ['Schema', scan.schema.count > 0 ? 'Good' : 'Missing'],
    ['Open Graph', scan.openGraph.title && scan.openGraph.description ? 'Good' : 'Needs work'],
    ['Content', scan.content.wordCount >= 300 ? 'Good' : 'Needs work'],
  ];

  return (
    <section className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-950">SEO Health</h2>
          <p className="mt-1 text-sm text-slate-500">Quick deterministic checks before Gemma recommendations.</p>
        </div>
        {report.runtime.cacheHit ? (
          <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-800">
            Served from local memory cache
          </span>
        ) : null}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {badges.map(([label, status]) => (
          <span
            className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusClass(status)}`}
            key={label}
          >
            {label}: {status}
          </span>
        ))}
      </div>
    </section>
  );
}
