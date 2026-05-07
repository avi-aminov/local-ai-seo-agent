import type { SeoReport } from '../types/report.types';

interface ReportMetricsProps {
  report: SeoReport;
}

export function ReportMetrics({ report }: ReportMetricsProps) {
  const metrics = [
    ['Critical issues', String(report.analysis.criticalIssues.length)],
    ['Medium issues', String(report.analysis.mediumIssues.length)],
    ['Recommendations', String(report.analysis.recommendations.length)],
    ['Schema blocks', String(report.scan.schema.count)],
    ['Words scanned', String(report.scan.content.wordCount)],
    ['Missing alt', `${report.scan.images.missingAlt}/${report.scan.images.total}`],
  ];

  return (
    <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
      {metrics.map(([label, value]) => (
        <div className="rounded-md border border-slate-200 bg-white p-4 shadow-sm" key={label}>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{value}</p>
        </div>
      ))}
    </section>
  );
}
