import React from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

export function RecommendationsView({ recommendations = [] }) {
  if (!recommendations || recommendations.length === 0) {
    return (
      <Card className="p-6 text-center space-y-2">
        <Sparkles className="w-8 h-8 text-blue-400 mx-auto" />
        <h4 className="text-base font-bold text-white">No Critical Recommendations</h4>
        <p className="text-xs text-slate-400">Your profile meets the target criteria effectively.</p>
      </Card>
    );
  }

  return (
    <Card className="p-6 space-y-5">
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-xl bg-violet-600/20 border border-violet-500/20 text-violet-400">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white">AI-Powered Action Plan</h3>
          <p className="text-xs text-slate-400">Prioritized enhancements to maximize your interview conversion rate</p>
        </div>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec, idx) => (
          <div key={idx} className="p-4 rounded-xl bg-navy-900/60 border border-white/5 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{rec.category}</span>
                <h4 className="text-sm font-bold text-white">{rec.title}</h4>
              </div>
              <Badge variant={rec.priority === 'high' ? 'danger' : 'primary'} size="sm">
                {rec.priority || 'medium'} priority
              </Badge>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">{rec.explanation}</p>

            {rec.sampleRewrites && rec.sampleRewrites.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-white/5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Example Bullet Transformation:</span>
                {rec.sampleRewrites.map((sr, sIdx) => (
                  <div key={sIdx} className="p-3 rounded-lg bg-navy-950 border border-white/5 text-xs space-y-1.5">
                    <div className="text-slate-400 line-through text-[11px]">{sr.original}</div>
                    <div className="text-emerald-300 font-medium flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{sr.improved}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {rec.actionItems && rec.actionItems.length > 0 && (
              <ul className="space-y-1.5 pt-1">
                {rec.actionItems.map((action, aIdx) => (
                  <li key={aIdx} className="text-xs text-slate-300 flex items-start gap-2">
                    <ArrowRight className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            )}

            {rec.tailoredSummaryExample && (
              <div className="p-3 rounded-lg bg-indigo-950/20 border border-indigo-500/20 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">Suggested Summary Template</span>
                <p className="text-xs text-indigo-200 italic leading-relaxed">{rec.tailoredSummaryExample}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
