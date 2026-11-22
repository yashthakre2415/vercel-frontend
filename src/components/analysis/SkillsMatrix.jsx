import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { CheckCircle2, AlertTriangle, XCircle, Search } from 'lucide-react';

export function SkillsMatrix({ matchedSkills = [], missingSkills = [] }) {
  const [filter, setFilter] = useState('all'); // all, matched, missing
  const [search, setSearch] = useState('');

  const allItems = [
    ...matchedSkills.map(s => ({ ...s, isMatched: true })),
    ...missingSkills.map(s => ({ ...s, isMatched: false })),
  ];

  const filtered = allItems.filter(item => {
    const name = (item.skill || item.name || '').toLowerCase();
    const matchesSearch = name.includes(search.toLowerCase());
    if (filter === 'matched') return matchesSearch && item.isMatched;
    if (filter === 'missing') return matchesSearch && !item.isMatched;
    return matchesSearch;
  });

  return (
    <Card className="p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-white">Skills Compatibility Matrix</h3>
          <p className="text-xs text-slate-400">Granular audit of technical and domain proficiencies against job criteria</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
              filter === 'all' ? 'bg-blue-600 text-white' : 'bg-navy-900 text-slate-400 hover:text-white'
            }`}
          >
            All ({allItems.length})
          </button>
          <button
            onClick={() => setFilter('matched')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
              filter === 'matched' ? 'bg-emerald-600 text-white' : 'bg-navy-900 text-slate-400 hover:text-white'
            }`}
          >
            Matched ({matchedSkills.length})
          </button>
          <button
            onClick={() => setFilter('missing')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
              filter === 'missing' ? 'bg-red-600 text-white' : 'bg-navy-900 text-slate-400 hover:text-white'
            }`}
          >
            Missing ({missingSkills.length})
          </button>
        </div>
      </div>

      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        <input
          type="text"
          placeholder="Filter skills by keyword..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-xl text-xs bg-navy-900 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
        {filtered.map((item, idx) => (
          <div
            key={idx}
            className={`p-3.5 rounded-xl border flex items-start justify-between gap-3 ${
              item.isMatched
                ? 'bg-emerald-950/20 border-emerald-500/20'
                : 'bg-red-950/20 border-red-500/20'
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                {item.isMatched ? (
                  item.status === 'stronglySupported' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  )
                ) : (
                  <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                )}
                <span className="text-sm font-semibold text-white">{item.skill || item.name}</span>
                <Badge
                  variant={item.importance === 'Required' ? 'primary' : 'default'}
                  size="sm"
                >
                  {item.importance || 'Target'}
                </Badge>
              </div>
              <p className="text-xs text-slate-400 pl-6">
                {item.evidence || item.recommendation || (item.isMatched ? 'Detected in resume' : 'Not detected in parsed resume text')}
              </p>
            </div>
            {item.occurrences && (
              <span className="text-[11px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded-md shrink-0">
                {item.occurrences}x
              </span>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
