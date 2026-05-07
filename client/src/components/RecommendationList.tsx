interface RecommendationListProps {
  items: string[];
}

export function RecommendationList({ items }: RecommendationListProps) {
  return (
    <section className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-950">Recommendations</h2>
      {items.length === 0 ? (
        <p className="mt-3 text-sm text-slate-500">No recommendations were returned.</p>
      ) : (
        <ol className="mt-3 space-y-2">
          {items.map((item, index) => (
            <li
              className="flex gap-3 rounded border border-slate-100 bg-slate-50 px-3 py-2 text-sm text-slate-700"
              key={`${index}-${item}`}
            >
              <span className="font-semibold text-teal-700">{index + 1}.</span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
