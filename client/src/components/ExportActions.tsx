import type { SeoReport } from '../types/report.types';

interface ExportActionsProps {
  report: SeoReport;
}

function buildReportText(report: SeoReport): string {
  const lines = [
    `Local AI SEO Agent report`,
    `URL: ${report.finalUrl}`,
    `Mode: ${report.runtime.mode}`,
    `Model: ${report.runtime.model}`,
    `Score: ${report.analysis.score}/100`,
    '',
    `Summary:`,
    report.analysis.summary,
    '',
    `Critical issues:`,
    ...(report.analysis.criticalIssues.length ? report.analysis.criticalIssues : ['None']).map((item) => `- ${item}`),
    '',
    `Medium issues:`,
    ...(report.analysis.mediumIssues.length ? report.analysis.mediumIssues : ['None']).map((item) => `- ${item}`),
    '',
    `Recommendations:`,
    ...(report.analysis.recommendations.length ? report.analysis.recommendations : ['None']).map((item) => `- ${item}`),
    '',
    `Suggested title: ${report.analysis.suggestedTitle}`,
    `Suggested meta description: ${report.analysis.suggestedMetaDescription}`,
  ];

  return lines.join('\n');
}

function downloadJson(report: SeoReport) {
  const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `seo-report-${new URL(report.finalUrl).hostname}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

export function ExportActions({ report }: ExportActionsProps) {
  async function copyReport() {
    await navigator.clipboard.writeText(buildReportText(report));
  }

  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <button
        className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-teal-600 hover:text-teal-700"
        onClick={copyReport}
        type="button"
      >
        Copy report
      </button>
      <button
        className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-teal-600 hover:text-teal-700"
        onClick={() => downloadJson(report)}
        type="button"
      >
        Download JSON
      </button>
    </div>
  );
}

