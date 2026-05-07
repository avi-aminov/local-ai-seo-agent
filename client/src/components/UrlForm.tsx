import type { FormEvent } from 'react';

interface UrlFormProps {
  url: string;
  loading: boolean;
  onUrlChange: (url: string) => void;
  onSubmit: () => void;
}

export function UrlForm({ url, loading, onUrlChange, onSubmit }: UrlFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form className="flex flex-col gap-3 md:flex-row" onSubmit={handleSubmit}>
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
        className="min-h-12 rounded-md bg-teal-700 px-6 font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-slate-400"
        disabled={loading}
        type="submit"
      >
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>
    </form>
  );
}

