import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from '../components/common/Button';

export function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-4 space-y-6">
      <div className="w-16 h-16 rounded-3xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
        <Sparkles className="w-8 h-8" />
      </div>
      <div className="space-y-2">
        <h1 className="text-6xl font-black text-white font-mono">404</h1>
        <h2 className="text-xl font-bold text-white">Page Not Found</h2>
        <p className="text-xs text-slate-400 max-w-sm mx-auto">
          The requested page or analysis record does not exist or has been relocated.
        </p>
      </div>
      <Link to="/">
        <Button variant="secondary" className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Homepage
        </Button>
      </Link>
    </div>
  );
}
