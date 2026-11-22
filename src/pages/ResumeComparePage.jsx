import React, { useState, useEffect } from 'react';
import { GitCompare, ArrowRight, Award, CheckCircle2, XCircle } from 'lucide-react';
import { analysisService } from '../services/analysis.service';
import { resumeService } from '../services/resume.service';
import { jobService } from '../services/job.service';
import { useToast } from '../context/ToastContext';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';

export function ResumeComparePage() {
  const [resumes, setResumes] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [resumeId1, setResumeId1] = useState('');
  const [resumeId2, setResumeId2] = useState('');
  const [jobId, setJobId] = useState('');
  const [comparison, setComparison] = useState(null);
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  useEffect(() => {
    async function loadOptions() {
      try {
        const [rRes, jRes] = await Promise.all([
          resumeService.getResumes(),
          jobService.getJobs(),
        ]);
        if (rRes.success && rRes.resumes.length >= 2) {
          setResumes(rRes.resumes);
          setResumeId1(rRes.resumes[0]._id);
          setResumeId2(rRes.resumes[1]._id);
        } else if (rRes.success) {
          setResumes(rRes.resumes);
          if (rRes.resumes[0]) setResumeId1(rRes.resumes[0]._id);
        }
        if (jRes.success && jRes.jobs.length > 0) {
          setJobs(jRes.jobs);
          setJobId(jRes.jobs[0]._id);
        }
      } catch (err) {
        console.error('Failed to load comparison data:', err);
      }
    }
    loadOptions();
  }, []);

  const handleCompare = async (e) => {
    e.preventDefault();
    if (!resumeId1 || !resumeId2) {
      toast.error('Please select two distinct resumes to compare.');
      return;
    }
    if (resumeId1 === resumeId2) {
      toast.error('Please choose two different resumes.');
      return;
    }

    try {
      setLoading(true);
      const res = await analysisService.compareResumes(resumeId1, resumeId2, jobId || null);
      if (res.success) {
        setComparison(res);
        toast.success('Comparative analysis completed.');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Comparison failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Version A/B Comparator</h1>
        <p className="text-xs text-slate-400 mt-1">
          Evaluate two resume versions against the same job description to measure score improvements and keyword gains.
        </p>
      </div>

      <Card className="p-6">
        <form onSubmit={handleCompare} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Version A (Baseline)
              </label>
              <select
                value={resumeId1}
                onChange={(e) => setResumeId1(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl text-sm bg-navy-950 border border-white/10 text-white focus:outline-none focus:border-blue-500"
              >
                {resumes.map((r) => (
                  <option key={r._id} value={r._id}>{r.title}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Version B (Revised)
              </label>
              <select
                value={resumeId2}
                onChange={(e) => setResumeId2(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl text-sm bg-navy-950 border border-white/10 text-white focus:outline-none focus:border-blue-500"
              >
                {resumes.map((r) => (
                  <option key={r._id} value={r._id}>{r.title}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Target Role
              </label>
              <select
                value={jobId}
                onChange={(e) => setJobId(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl text-sm bg-navy-950 border border-white/10 text-white focus:outline-none focus:border-blue-500"
              >
                <option value="">General Benchmark</option>
                {jobs.map((j) => (
                  <option key={j._id} value={j._id}>{j.title}</option>
                ))}
              </select>
            </div>
          </div>

          <Button type="submit" loading={loading} className="w-full gap-2">
            <GitCompare className="w-4 h-4" />
            Compare Resumes
          </Button>
        </form>
      </Card>

      {comparison && (
        <div className="space-y-6">
          {/* Winner Banner */}
          <div className="p-6 rounded-2xl glass-panel border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Top Performer</span>
                <h3 className="text-lg font-bold text-white">{comparison.winner}</h3>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 block">Score Differential</span>
              <span className={`text-xl font-mono font-bold ${
                comparison.scoreDifference > 0 ? 'text-emerald-400' :
                comparison.scoreDifference < 0 ? 'text-red-400' : 'text-slate-300'
              }`}>
                {comparison.scoreDifference > 0 ? `+${comparison.scoreDifference}%` : `${comparison.scoreDifference}%`}
              </span>
            </div>
          </div>

          {/* Side-by-Side Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Version 1 */}
            <Card className="p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h4 className="text-base font-bold text-white">{comparison.resume1.title}</h4>
                <span className="text-2xl font-mono font-bold text-blue-400">{comparison.resume1.score}%</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Matched Skills</span>
                  <strong className="text-white">{comparison.resume1.matchedSkillsCount}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Missing Skills</span>
                  <strong className="text-red-400">{comparison.resume1.missingSkillsCount}</strong>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Format Notices</span>
                  <strong className="text-amber-400">{comparison.resume1.formatIssuesCount}</strong>
                </div>
              </div>
            </Card>

            {/* Version 2 */}
            <Card className="p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h4 className="text-base font-bold text-white">{comparison.resume2.title}</h4>
                <span className="text-2xl font-mono font-bold text-indigo-400">{comparison.resume2.score}%</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Matched Skills</span>
                  <strong className="text-white">{comparison.resume2.matchedSkillsCount}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Missing Skills</span>
                  <strong className="text-red-400">{comparison.resume2.missingSkillsCount}</strong>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Format Notices</span>
                  <strong className="text-amber-400">{comparison.resume2.formatIssuesCount}</strong>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
