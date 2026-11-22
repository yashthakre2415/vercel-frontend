import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Shield, Lock, FileCheck } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-navy-950 py-12 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4 md:col-span-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">ResumeIQ ATS</span>
          </div>
          <p className="text-sm text-slate-400 max-w-sm">
            Know Your Match. Improve Your Resume. Get Interview Ready. Built with genuine deterministic ATS parsing algorithms and privacy-first data processing.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-blue-400" /> GDPR Ready</span>
            <span className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-indigo-400" /> Never Sells Data</span>
            <span className="flex items-center gap-1.5"><FileCheck className="w-3.5 h-3.5 text-emerald-400" /> Explainable ATS</span>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Product Features</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link to="/upload" className="hover:text-white transition-colors">Resume Parser</Link></li>
            <li><Link to="/jobs" className="hover:text-white transition-colors">Job Description Matcher</Link></li>
            <li><Link to="/studio" className="hover:text-white transition-colors">Google XYZ Bullet Studio</Link></li>
            <li><Link to="/compare" className="hover:text-white transition-colors">Version Comparison</Link></li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Privacy & Legal</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link to="/privacy" className="hover:text-white transition-colors">Data Deletion Rights</Link></li>
            <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><span className="text-xs text-slate-400 block pt-4">© {new Date().getFullYear()} ResumeIQ. All rights reserved.</span></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
