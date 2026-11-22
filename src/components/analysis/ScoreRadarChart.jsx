import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Card } from '../common/Card';

export function ScoreRadarChart({ breakdown = [] }) {
  const radarData = breakdown.map(item => ({
    subject: item.category.replace(/ Match| Alignment| & Practical Evidence| & Certifications| & Formatting| Coverage & Anti-Stuffing/, ''),
    score: item.percentage || 0,
    fullMark: 100,
  }));

  if (radarData.length === 0) return null;

  return (
    <Card className="p-6 flex flex-col items-center">
      <div className="w-full text-left mb-2">
        <h3 className="text-base font-bold text-white">Competency Radar</h3>
        <p className="text-xs text-slate-400">Multi-dimensional strength profile across all evaluation pillars</p>
      </div>
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
            <PolarGrid stroke="#334155" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 11 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} stroke="#334155" />
            <Radar
              name="Compatibility"
              dataKey="score"
              stroke="#8b5cf6"
              fill="#8b5cf6"
              fillOpacity={0.45}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
