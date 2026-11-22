import React from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { AlertCircle } from 'lucide-react';

export function MissingSkillsList({ skills = [] }) {
  if (!skills || skills.length === 0) {
    return (
      <Card className="h-72 flex flex-col items-center justify-center text-center p-6">
        <p className="text-sm text-slate-400">No skill gaps detected!</p>
        <p className="text-xs text-slate-400 mt-1">Your analyzed resumes align well with your target job requirements.</p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <AlertCircle className="w-4 h-4 text-amber-400" />
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Top Priority Skill Gaps</h3>
      </div>
      <p className="text-xs text-slate-400 mb-4">
        Skills most frequently required across your target roles that are currently absent from your resumes:
      </p>
      <div className="space-y-2.5">
        {skills.map((item, idx) => {
          const name = typeof item === 'string' ? item : item.skill;
          const count = typeof item === 'object' ? item.count : null;
          return (
            <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-navy-900 border border-white/5">
              <span className="text-sm font-semibold text-slate-200">{name}</span>
              {count ? (
                <Badge variant="warning" size="sm">
                  Required in {count} role{count > 1 ? 's' : ''}
                </Badge>
              ) : (
                <Badge variant="danger" size="sm">Missing</Badge>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
