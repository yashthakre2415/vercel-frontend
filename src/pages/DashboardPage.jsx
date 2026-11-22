import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  TrendingUp,
  Award,
  AlertTriangle,
  Upload,
  Briefcase,
  GitCompare,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { analysisService } from '../services/analysis.service';
import { StatCard } from '../components/dashboard/StatCard';
import { ScoreTrendChart } from '../components/dashboard/ScoreTrendChart';
import { MissingSkillsList } from '../components/dashboard/MissingSkillsList';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Skeleton } from '../components/common/Skeleton';

export function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await analysisService.getDashboardStats();
        if (res.success) {
          setStats(res.stats);
        }
      } catch (err) {
        console.error('Failed to load dashboard statistics:', err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-48" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="h-80 lg:col-span-2" />
          <Skeleton className="h-80" />
        </div>
      </div>
    );
  }

  const {
    totalResumes = 0,
    totalAnalyses = 0,
    averageScore = 0,
    highestScore = 0,
    scoreTrend = [],
    topMissingSkills = [],
    recentAnalyses = [],
  } = stats || {};

  return (
    <div className="space-y-8">
      {/* Top Banner / Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Performance Overview</h1>
          <p className="text-xs text-slate-400 mt-1">Real-time ATS analytics and job match diagnostics</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/upload">
            <Button size="sm" className="gap-2 shadow-lg">
              <Upload className="w-4 h-4" />
              Upload Resume
            </Button>
          </Link>
          <Link to="/jobs">
            <Button variant="secondary" size="sm" className="gap-2">
              <Briefcase className="w-4 h-4" />
              Target Jobs
            </Button>
          </Link>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Average ATS Match"
          value={averageScore}
          suffix="%"
          subtitle="Mean score across all scans"
          icon={TrendingUp}
          color="blue"
        />
        <StatCard
          title="Highest Compatibility"
          value={highestScore}
          suffix="%"
          subtitle="Top matching resume version"
          icon={Award}
          color="emerald"
        />
        <StatCard
          title="Total Resumes"
          value={totalResumes}
          subtitle="Processed & stored in library"
          icon={FileText}
          color="purple"
        />
        <StatCard
          title="Completed Scans"
          value={totalAnalyses}
          subtitle="ATS algorithmic evaluations"
          icon={Sparkles}
          color="amber"
        />
      </div>

      {/* Main Charts & Missing Skills */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ScoreTrendChart data={scoreTrend} />
        </div>
        <div>
          <MissingSkillsList skills={topMissingSkills} />
        </div>
      </div>

      {/* Recent Analyses and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Analyses Table */}
        <Card className="lg:col-span-2 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Recent ATS Analyses</h3>
            <Link to="/history" className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1">
              View All History <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentAnalyses.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <p className="text-sm text-slate-400">No ATS evaluations performed yet.</p>
              <Link to="/upload">
                <Button size="sm">Run Your First Analysis</Button>
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-white/5 overflow-x-auto">
              {recentAnalyses.map((item) => (
                <div key={item._id} className="py-3 flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <span className="text-sm font-semibold text-white block">
                      {item.isGeneralAssessment ? 'General Market Assessment' : 'Targeted Job Evaluation'}
                    </span>
                    <span className="text-xs text-slate-400">
                      {new Date(item.createdAt).toLocaleDateString()} • {item.scoringVersion}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-mono font-bold px-2.5 py-1 rounded-lg border ${
                      item.score >= 80 ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' :
                      item.score >= 60 ? 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20' :
                      'text-amber-400 bg-amber-500/10 border-amber-500/20'
                    }`}>
                      {item.score}%
                    </span>
                    <Link to={`/results/${item._id}`}>
                      <Button variant="ghost" size="sm">Inspect</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Quick Launchpad */}
        <Card className="p-6 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Productivity Studio</h3>
          <p className="text-xs text-slate-400">Accelerate your application workflows:</p>

          <div className="space-y-2.5">
            <Link to="/studio" className="block">
              <div className="p-3.5 rounded-xl bg-navy-900 border border-white/5 hover:border-blue-500/30 transition-all flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-violet-400" />
                  <span className="text-xs font-semibold text-white">Google XYZ Rewriter</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </div>
            </Link>

            <Link to="/compare" className="block">
              <div className="p-3.5 rounded-xl bg-navy-900 border border-white/5 hover:border-blue-500/30 transition-all flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <GitCompare className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-semibold text-white">Version A/B Comparator</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </div>
            </Link>

            <Link to="/jobs" className="block">
              <div className="p-3.5 rounded-xl bg-navy-900 border border-white/5 hover:border-blue-500/30 transition-all flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Briefcase className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-semibold text-white">Target Job Vault</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </div>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
