import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Download, Sparkles, GitCompare, ArrowLeft, ShieldAlert } from 'lucide-react';
import { analysisService } from '../services/analysis.service';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { ScoreGauge } from '../components/common/ScoreGauge';
import { CategoryBreakdown } from '../components/analysis/CategoryBreakdown';
import { SkillsMatrix } from '../components/analysis/SkillsMatrix';
import { FormattingIssuesList } from '../components/analysis/FormattingIssuesList';
import { RecommendationsView } from '../components/analysis/RecommendationsView';
import { ScoreRadarChart } from '../components/analysis/ScoreRadarChart';
import { Skeleton } from '../components/common/Skeleton';

export function AnalysisResultsPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAnalysis() {
      try {
        const res = await analysisService.getAnalysisById(id);
        if (res.success) {
          setData(res);
        }
      } catch (err) {
        console.error('Failed to load analysis:', err);
      } finally {
        setLoading(false);
      }
    }
    loadAnalysis();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto space-y-6">
        <Skeleton className="h-10 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-64" />
          <Skeleton className="h-64 md:col-span-2" />
        </div>
        <Skeleton className="h-96" />
      </div>
    );
  }

  if (!data || !data.analysis) {
    return (
      <div className="text-center py-16 space-y-4">
        <h2 className="text-xl font-bold text-white">Analysis not found</h2>
        <Link to="/dashboard"><Button>Return to Dashboard</Button></Link>
      </div>
    );
  }

  const { analysis, resume, job } = data;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Top Bar Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors mb-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Dashboard
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">ATS Audit & Compatibility Report</h1>
          <p className="text-xs text-slate-400">
            Resume: <span className="text-white font-medium">{resume?.title}</span> • Target: <span className="text-white font-medium">{job?.title || 'General Assessment'}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={analysisService.getReportPdfUrl(analysis._id)}
            target="_blank"
            rel="noopener noreferrer"
            download
          >
            <Button variant="secondary" size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              Download PDF Report
            </Button>
          </a>
          <Link to="/studio">
            <Button size="sm" className="gap-2 shadow-lg shadow-blue-500/20">
              <Sparkles className="w-4 h-4" />
              Improve in Studio
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero Score & Match Summary Card */}
      <Card className="p-8 border border-blue-500/20 bg-navy-900/90 relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="flex flex-col items-center justify-center">
            <ScoreGauge score={analysis.score} size={210} label={analysis.scoreLabel || 'ATS Score'} />
          </div>

          <div className="md:col-span-2 space-y-4 text-left">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Executive Match Summary</span>
              <h3 className="text-xl font-bold text-white">{analysis.matchSummary}</h3>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {analysis.disclaimer}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-navy-950 border border-white/5">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Matched Skills</span>
                <span className="text-lg font-bold text-emerald-400 font-mono">
                  {(analysis.skillMatches || []).length}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-navy-950 border border-white/5">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Identified Gaps</span>
                <span className="text-lg font-bold text-red-400 font-mono">
                  {(analysis.missingSkills || []).length}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-navy-950 border border-white/5">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Format Notices</span>
                <span className="text-lg font-bold text-amber-400 font-mono">
                  {(analysis.formattingIssues || []).length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Category Breakdown & Radar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CategoryBreakdown breakdown={analysis.scoreBreakdown} />
        </div>
        <div>
          <ScoreRadarChart breakdown={analysis.scoreBreakdown} />
        </div>
      </div>

      {/* Skills Matrix */}
      <SkillsMatrix
        matchedSkills={analysis.skillMatches}
        missingSkills={analysis.missingSkills}
      />

      {/* Formatting & Parseability Check */}
      <FormattingIssuesList issues={analysis.formattingIssues} />

      {/* AI Google XYZ Action Plan */}
      <RecommendationsView recommendations={analysis.recommendations} />
    </div>
  );
}
