interface IssueListProps {
  title: string;
  items: string[];
  emptyText: string;
}

export function IssueList({ title, items, emptyText }: IssueListProps) {
  return (
    <section className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-950">{title}</h2>
      {items.length === 0 ? (
        <p className="mt-3 text-sm text-slate-500">{emptyText}</p>
      ) : (
        <ul className="mt-3 space-y-2">
          {items.map((item) => (
            <li className="rounded border border-slate-100 bg-slate-50 px-3 py-2 text-sm text-slate-700" key={item}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

