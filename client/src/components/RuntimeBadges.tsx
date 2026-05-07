import type { SeoReport } from '../types/report.types';

interface RuntimeBadgesProps {
  runtime: SeoReport['runtime'];
}

function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  const seconds = Math.round(ms / 1000);
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
}

export function RuntimeBadges({ runtime }: RuntimeBadgesProps) {
  const badges = [
    ['Mode', runtime.mode === 'fast' ? 'Fast' : 'Quality'],
    ['Model', runtime.model],
    ['AI mode', runtime.localAi ? 'Local Ollama' : 'Remote'],
    ['Cache', runtime.cacheHit ? 'Hit' : 'Miss'],
    ['Scan', formatDuration(runtime.scanDurationMs)],
    ['Gemma', formatDuration(runtime.aiDurationMs)],
    ['Total', formatDuration(runtime.totalDurationMs)],
    ['Prompt', runtime.promptVersion],
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {badges.map(([label, value]) => (
        <span
          className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800"
          key={label}
        >
          <span className="text-teal-600">{label}</span>
          <span>{value}</span>
        </span>
      ))}
    </div>
  );
}
