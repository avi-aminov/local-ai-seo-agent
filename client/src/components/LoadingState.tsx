interface LoadingStateProps {
  elapsedSeconds: number;
  step: string;
}

export function LoadingState({ elapsedSeconds, step }: LoadingStateProps) {
  return (
    <div className="rounded-md border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold text-teal-700">Analysis in progress</p>
          <h2 className="mt-2 text-xl font-semibold text-slate-950">{step}</h2>
          <p className="mt-2 text-sm text-slate-600">
            Local Gemma analysis can take longer on the first run while the model loads into memory.
          </p>
        </div>
        <div className="rounded border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
          {elapsedSeconds}s
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="h-3 animate-pulse rounded bg-slate-100" />
        <div className="h-3 w-5/6 animate-pulse rounded bg-slate-100" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-slate-100" />
      </div>
    </div>
  );
}
