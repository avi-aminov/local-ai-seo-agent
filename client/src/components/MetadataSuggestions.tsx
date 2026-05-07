interface MetadataSuggestionsProps {
  title: string;
  description: string;
}

export function MetadataSuggestions({ title, description }: MetadataSuggestionsProps) {
  return (
    <section className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-950">Suggested Metadata</h2>
      <div className="mt-3 grid gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Title</p>
          <p className="mt-1 rounded border border-slate-100 bg-slate-50 px-3 py-2 text-sm text-slate-800">{title}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Meta description</p>
          <p className="mt-1 rounded border border-slate-100 bg-slate-50 px-3 py-2 text-sm text-slate-800">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}

