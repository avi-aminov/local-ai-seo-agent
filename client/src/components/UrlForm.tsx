import type { FormEvent } from 'react';
import type { AnalysisMode } from '../services/analyze.service';

interface UrlFormProps {
  url: string;
  loading: boolean;
  mode: AnalysisMode;
  onModeChange: (mode: AnalysisMode) => void;
  onUrlChange: (url: string) => void;
  onSubmit: () => void;
}

export function UrlForm({ url, loading, mode, onModeChange, onUrlChange, onSubmit }: UrlFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-700">Analysis mode</p>
          <p className="mt-1 text-sm text-slate-500">
            Fast is better for quick checks. Quality is better for deeper recommendations.
          </p>
        </div>
        <div className="grid grid-cols-2 rounded-md border border-slate-200 bg-slate-50 p-1">
          {[
            ['fast', 'Fast', 'gemma4:e2b'],
            ['quality', 'Quality', 'gemma4:e4b'],
          ].map(([value, label, model]) => (
            <button
              aria-pressed={mode === value}
              className={`rounded px-4 py-2 text-sm font-semibold transition ${
                mode === value ? 'bg-white text-teal-800 shadow-sm' : 'text-slate-600 hover:text-slate-950'
              }`}
              disabled={loading}
              key={value}
              onClick={() => onModeChange(value as AnalysisMode)}
              type="button"
            >
              <span className="block">{label}</span>
              <span className="block text-xs font-medium text-slate-500">{model}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3 md:flex-row">
      <label className="sr-only" htmlFor="url">
        Website URL
      </label>
      <input
        id="url"
        className="min-h-12 flex-1 rounded-md border border-slate-300 bg-white px-4 text-base outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
        placeholder="https://example.com"
        value={url}
        disabled={loading}
        onChange={(event) => onUrlChange(event.target.value)}
      />
      <button
        className="min-h-12 rounded-md bg-teal-700 px-6 font-semibold text-white transition hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-400"
        disabled={loading}
        type="submit"
      >
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>
      </div>
    </form>
  );
}
