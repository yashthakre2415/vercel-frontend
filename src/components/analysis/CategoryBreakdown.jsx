import React from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';

export function CategoryBreakdown({ breakdown = [] }) {
  return (
    <Card className="p-6 space-y-5">
      <div>
        <h3 className="text-base font-bold text-white">ATS Scoring Rubric Breakdown</h3>
        <p className="text-xs text-slate-400">100-Point Deterministic Compatibility Model</p>
      </div>

      <div className="space-y-4">
        {breakdown.map((cat, idx) => {
          const pct = Math.min(100, Math.max(0, cat.percentage || 0));
          let barColor = 'bg-blue-500';
          let statusBadge = 'default';

          if (pct >= 80) {
            barColor = 'bg-emerald-500';
            statusBadge = 'success';
          } else if (pct >= 60) {
            barColor = 'bg-indigo-500';
            statusBadge = 'primary';
          } else if (pct >= 40) {
            barColor = 'bg-amber-500';
            statusBadge = 'warning';
          } else {
            barColor = 'bg-red-500';
            statusBadge = 'danger';
          }

          return (
            <div key={idx} className="space-y-1.5 p-3 rounded-xl bg-navy-900/50 border border-white/5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-200">{cat.category}</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-slate-400">
                    <strong className="text-white">{cat.score}</strong> / {cat.weight} pts
                  </span>
                  <Badge variant={statusBadge} size="sm">
                    {pct}%
                  </Badge>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-navy-950 rounded-full h-2 overflow-hidden border border-white/5">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${barColor}`}
                  style={{ width: `${pct}%` }}
                />
              </div>

              {cat.findings && (
                <p className="text-[11px] text-slate-400 pt-0.5">{cat.findings}</p>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
