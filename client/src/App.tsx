import { useState } from 'react';
import { ErrorAlert } from './components/ErrorAlert';
import { IssueList } from './components/IssueList';
import { LoadingState } from './components/LoadingState';
import { MetadataSuggestions } from './components/MetadataSuggestions';
import { RecommendationList } from './components/RecommendationList';
import { ScanHighlights } from './components/ScanHighlights';
import { SeoScoreCard } from './components/SeoScoreCard';
import { UrlForm } from './components/UrlForm';
import { analyzeUrl } from './services/analyze.service';
import type { SeoReport } from './types/report.types';

function isValidUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

export default function App() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [report, setReport] = useState<SeoReport | null>(null);

  async function handleSubmit() {
    setError('');

    if (!isValidUrl(url)) {
      setError('Enter a valid http or https URL.');
      return;
    }

    setLoading(true);
    try {
      const nextReport = await analyzeUrl(url);
      setReport(nextReport);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Analysis failed.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 md:py-12">
        <header className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">Local AI SEO Agent</p>
          <h1 className="mt-3 text-3xl font-bold text-slate-950 md:text-5xl">
            Audit a webpage with local Gemma analysis.
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Scan page SEO signals, send structured data to Ollama, and get a practical report without cloud AI APIs.
          </p>
        </header>

        <section className="rounded-md border border-slate-200 bg-white p-4 shadow-sm md:p-5">
          <UrlForm loading={loading} onSubmit={handleSubmit} onUrlChange={setUrl} url={url} />
        </section>

        {error ? <ErrorAlert message={error} /> : null}
        {loading ? <LoadingState /> : null}

        {report ? (
          <div className="grid gap-5">
            <div className="grid gap-5 lg:grid-cols-[280px_1fr]">
              <SeoScoreCard score={report.analysis.score} />
              <section className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-medium text-slate-500">Summary</p>
                <h2 className="mt-2 break-words text-xl font-semibold text-slate-950">{report.finalUrl}</h2>
                <p className="mt-3 leading-7 text-slate-700">{report.analysis.summary}</p>
              </section>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              <IssueList
                emptyText="No critical issues were reported."
                items={report.analysis.criticalIssues}
                title="Critical Issues"
              />
              <IssueList
                emptyText="No medium-priority issues were reported."
                items={report.analysis.mediumIssues}
                title="Medium Issues"
              />
            </div>

            <RecommendationList items={report.analysis.recommendations} />
            <MetadataSuggestions
              description={report.analysis.suggestedMetaDescription}
              title={report.analysis.suggestedTitle}
            />
            <ScanHighlights scan={report.scan} />
          </div>
        ) : null}
      </div>
    </main>
  );
}

