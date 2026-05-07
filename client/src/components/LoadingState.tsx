export function LoadingState() {
  return (
    <div className="rounded-md border border-slate-200 bg-white p-6 shadow-sm">
      <div className="h-3 w-32 animate-pulse rounded bg-slate-200" />
      <div className="mt-4 h-8 w-48 animate-pulse rounded bg-slate-200" />
      <div className="mt-4 space-y-2">
        <div className="h-3 animate-pulse rounded bg-slate-100" />
        <div className="h-3 w-5/6 animate-pulse rounded bg-slate-100" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-slate-100" />
      </div>
    </div>
  );
}

