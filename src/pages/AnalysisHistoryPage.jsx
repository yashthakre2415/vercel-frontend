import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { History, Download, ArrowRight, FileText, CheckCircle2 } from 'lucide-react';
import { analysisService } from '../services/analysis.service';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Skeleton } from '../components/common/Skeleton';

export function AnalysisHistoryPage() {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHistory() {
      try {
        const res = await analysisService.getAnalyses();
        if (res.success) {
          setAnalyses(res.analyses);
        }
      } catch (err) {
        console.error('Failed to load history:', err);
      } finally {
        setLoading(false);
      }
    }
    loadHistory();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 max-w-5xl mx-auto">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-64" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Audit & Scan History</h1>
          <p className="text-xs text-slate-400 mt-1">Review your historical ATS evaluations and track optimization progress.</p>
        </div>
        <Link to="/upload">
          <Button size="sm">New Resume Scan</Button>
        </Link>
      </div>

      <Card className="p-0 overflow-hidden">
        {analyses.length === 0 ? (
          <div className="text-center py-16 p-6 space-y-3">
            <History className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-sm text-slate-400">No past scan records located.</p>
            <Link to="/upload"><Button size="sm">Run First Scan</Button></Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-navy-950 border-b border-white/5 uppercase text-slate-400 font-bold">
                <tr>
                  <th className="px-6 py-4">Scan Date</th>
                  <th className="px-6 py-4">Evaluation Type</th>
                  <th className="px-6 py-4">Score</th>
                  <th className="px-6 py-4">Engine Version</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {analyses.map((a) => (
                  <tr key={a._id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 text-slate-300 font-mono">
                      {new Date(a.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 font-semibold text-white">
                      {a.isGeneralAssessment ? 'General Market Assessment' : 'Targeted Job Match'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-mono font-bold px-2 py-0.5 rounded border ${
                        a.score >= 80 ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' :
                        a.score >= 60 ? 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20' :
                        'text-amber-400 bg-amber-500/10 border-amber-500/20'
                      }`}>
                        {a.score}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400 font-mono text-[11px]">
                      {a.scoringVersion}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <a
                        href={analysisService.getReportPdfUrl(a._id)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                        title="Download PDF Report"
                      >
                        <Download className="w-4 h-4" />
                      </a>
                      <Link to={`/results/${a._id}`}>
                        <Button variant="ghost" size="sm">Inspect</Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
