import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Upload,
  Briefcase,
  Layers,
  History,
  Sliders,
  Sparkles,
  GitCompare,
  ShieldAlert,
} from 'lucide-react';

export function Sidebar() {
  const links = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/upload', label: 'Upload & Parse', icon: Upload },
    { to: '/jobs', label: 'Job Descriptions', icon: Briefcase },
    { to: '/studio', label: 'Improvement Studio', icon: Sparkles },
    { to: '/compare', label: 'Version Comparison', icon: GitCompare },
    { to: '/history', label: 'Analysis History', icon: History },
    { to: '/resumes', label: 'Resume Library', icon: Layers },
    { to: '/settings', label: 'Account Settings', icon: Sliders },
    { to: '/privacy', label: 'Privacy & Data Deletion', icon: ShieldAlert },
  ];

  return (
    <aside className="w-64 glass-panel border-r border-white/10 hidden md:flex flex-col justify-between p-4 shrink-0 h-[calc(100vh-4rem)] sticky top-16">
      <div className="space-y-6">
        <div className="px-3 pt-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Navigation Menu
          </span>
        </div>
        <nav className="space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600/15 text-blue-400 border border-blue-500/20 shadow-sm'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="p-3 bg-navy-900/60 rounded-xl border border-white/5 text-xs text-slate-400 space-y-1">
        <div className="flex items-center gap-1.5 font-semibold text-slate-300">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Deterministic Engine v1.2
        </div>
        <p className="text-[11px] text-slate-400">Transparent 7-factor scoring active.</p>
      </div>
    </aside>
  );
}
