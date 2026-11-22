import React from 'react';
import { motion } from 'framer-motion';

export function ScoreGauge({
  score = 0,
  size = 200,
  strokeWidth = 14,
  label = 'ATS Match',
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const safeScore = Math.min(100, Math.max(0, score));
  const strokeDashoffset = circumference - (safeScore / 100) * circumference;

  let strokeColor = '#3b82f6';
  let badgeColor = 'text-blue-400 bg-blue-500/10 border-blue-500/20';
  let tierLabel = 'Moderate Match';

  if (safeScore >= 80) {
    strokeColor = '#10b981';
    badgeColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    tierLabel = 'Strong Match';
  } else if (safeScore >= 60) {
    strokeColor = '#8b5cf6';
    badgeColor = 'text-purple-400 bg-purple-500/10 border-purple-500/20';
    tierLabel = 'Competitive';
  } else if (safeScore >= 40) {
    strokeColor = '#f59e0b';
    badgeColor = 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    tierLabel = 'Needs Work';
  } else {
    strokeColor = '#ef4444';
    badgeColor = 'text-red-400 bg-red-500/10 border-red-500/20';
    tierLabel = 'Low Compatibility';
  }

  return (
    <div className="flex flex-col items-center justify-center relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Track Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Animated Progress Circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          strokeLinecap="round"
          fill="transparent"
        />
      </svg>
      {/* Central Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-4xl font-extrabold tracking-tight text-white font-mono">
          {safeScore}%
        </span>
        <span className="text-xs font-semibold text-slate-400 mt-0.5 uppercase tracking-wider">
          {label}
        </span>
        <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full mt-2 border ${badgeColor}`}>
          {tierLabel}
        </span>
      </div>
    </div>
  );
}
