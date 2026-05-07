interface SeoScoreCardProps {
  score: number;
}

function scoreLabel(score: number): string {
  if (score >= 90) return 'Excellent';
  if (score >= 70) return 'Good';
  if (score >= 50) return 'Needs work';
  return 'High priority';
}

export function SeoScoreCard({ score }: SeoScoreCardProps) {
  return (
    <section className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">SEO Score</p>
      <div className="mt-2 flex items-end gap-2">
        <span className="text-5xl font-bold text-slate-950">{score}</span>
        <span className="pb-2 text-slate-500">/100</span>
      </div>
      <p className="mt-3 text-sm font-semibold text-teal-700">{scoreLabel(score)}</p>
    </section>
  );
}

