import React from 'react';
import { Card } from '../common/Card';
import { ScoreCounter } from '../common/ScoreCounter';

export function StatCard({ title, value, subtitle, icon: Icon, color = 'blue', suffix = '' }) {
  const colorMap = {
    blue: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    amber: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  };

  return (
    <Card className="relative overflow-hidden group">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{title}</span>
        {Icon && (
          <div className={`p-2 rounded-xl border ${colorMap[color] || colorMap.blue} group-hover:scale-110 transition-transform`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>
      <div className="mt-3 flex items-baseline gap-1">
        <span className="text-3xl font-extrabold text-white tracking-tight">
          <ScoreCounter value={typeof value === 'number' ? value : 0} />
          {suffix}
        </span>
      </div>
      {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
    </Card>
  );
}
