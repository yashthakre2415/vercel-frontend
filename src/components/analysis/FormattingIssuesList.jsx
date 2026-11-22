import React from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { AlertCircle, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export function FormattingIssuesList({ issues = [] }) {
  if (!issues || issues.length === 0) {
    return (
      <Card className="p-6 text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h4 className="text-base font-bold text-white">Clean ATS Parseability</h4>
        <p className="text-xs text-slate-400 max-w-sm mx-auto">
          No parser barriers or formatting violations detected. Resume text and contact details cleanly extracted.
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white">ATS Readability & Layout Audit</h3>
          <p className="text-xs text-slate-400">Identified formatting obstacles that impede automated parsing</p>
        </div>
        <Badge variant={issues.some(i => i.severity === 'critical') ? 'danger' : 'warning'} size="sm">
          {issues.length} {issues.length === 1 ? 'Notice' : 'Notices'}
        </Badge>
      </div>

      <div className="space-y-3">
        {issues.map((issue, idx) => {
          const isCrit = issue.severity === 'critical';
          const isHigh = issue.severity === 'high';

          return (
            <div
              key={idx}
              className={`p-4 rounded-xl border space-y-2 ${
                isCrit
                  ? 'bg-red-950/25 border-red-500/30'
                  : isHigh
                  ? 'bg-amber-950/20 border-amber-500/20'
                  : 'bg-navy-900 border-white/5'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  {isCrit || isHigh ? (
                    <AlertTriangle className={`w-4 h-4 shrink-0 ${isCrit ? 'text-red-400' : 'text-amber-400'}`} />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-blue-400 shrink-0" />
                  )}
                  <span className="text-sm font-bold text-white">{issue.title || issue.type}</span>
                </div>
                <Badge variant={isCrit ? 'danger' : isHigh ? 'warning' : 'default'} size="sm">
                  {issue.severity || 'Notice'}
                </Badge>
              </div>

              <p className="text-xs text-slate-300">{issue.description}</p>

              {issue.fix && (
                <div className="text-[11px] p-2.5 rounded-lg bg-navy-950 border border-white/5 text-slate-400 flex items-start gap-2">
                  <strong className="text-blue-400 shrink-0">Fix:</strong>
                  <span>{issue.fix}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
