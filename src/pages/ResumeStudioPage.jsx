import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, Copy, Download, RefreshCw } from 'lucide-react';
import { resumeService } from '../services/resume.service';
import { jobService } from '../services/job.service';
import { useToast } from '../context/ToastContext';
import { Button } from '../components/common/Button';
import { Input, Textarea } from '../components/common/Input';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';

export function ResumeStudioPage() {
  const [bullet, setBullet] = useState('Responsible for improving the website performance and helping team members.');
  const [targetSkill, setTargetSkill] = useState('React');
  const [rewritten, setRewritten] = useState(null);
  const [rewriting, setRewriting] = useState(false);

  // Full resume optimization states
  const [resumes, setResumes] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [selectedResumeId, setSelectedResumeId] = useState('');
  const [selectedJobId, setSelectedJobId] = useState('');
  const [optimizing, setOptimizing] = useState(false);
  const [optimizedResult, setOptimizedResult] = useState(null);

  const toast = useToast();

  useEffect(() => {
    async function initData() {
      try {
        const [rRes, jRes] = await Promise.all([
          resumeService.getResumes(),
          jobService.getJobs(),
        ]);
        if (rRes.success && rRes.resumes.length > 0) {
          setResumes(rRes.resumes);
          setSelectedResumeId(rRes.resumes[0]._id);
        }
        if (jRes.success && jRes.jobs.length > 0) {
          setJobs(jRes.jobs);
          setSelectedJobId(jRes.jobs[0]._id);
        }
      } catch (err) {
        console.error('Failed to load studio data:', err);
      }
    }
    initData();
  }, []);

  const handleRewriteBullet = async (e) => {
    e.preventDefault();
    if (!bullet.trim()) return;

    try {
      setRewriting(true);
      const res = await resumeService.rewriteBullet(bullet, targetSkill);
      if (res.success && res.rewrite) {
        setRewritten(res.rewrite);
        toast.success('Bullet point transformed via Google XYZ formula.');
      }
    } catch (err) {
      toast.error('Failed to rewrite bullet point.');
    } finally {
      setRewriting(false);
    }
  };

  const handleOptimizeResume = async () => {
    if (!selectedResumeId) {
      toast.error('Please choose a resume to optimize.');
      return;
    }

    try {
      setOptimizing(true);
      const res = await resumeService.optimizeResume(selectedResumeId, selectedJobId || null, true);
      if (res.success && res.optimized) {
        setOptimizedResult(res.optimized);
        toast.success('Resume optimized and saved as a new version!');
      }
    } catch (err) {
      toast.error('Failed to optimize resume.');
    } finally {
      setOptimizing(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Resume Improvement Studio</h1>
        <p className="text-xs text-slate-400 mt-1">
          Apply recruiter-standard formulations (Google XYZ) to upgrade passive experience descriptions and eliminate buzzword fluff.
        </p>
      </div>

      {/* Interactive Bullet Rewriter */}
      <Card className="p-6 space-y-6 border border-violet-500/25 bg-navy-900/80">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-violet-600/20 text-violet-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Google XYZ Bullet Point Optimizer</h3>
            <p className="text-xs text-slate-400">"Accomplished [X] as measured by [Y] by doing [Z]" with verifiable placeholders</p>
          </div>
        </div>

        <form onSubmit={handleRewriteBullet} className="space-y-4">
          <Textarea
            id="bulletInput"
            label="Original Bullet Point"
            rows={3}
            value={bullet}
            onChange={(e) => setBullet(e.target.value)}
            placeholder="e.g. Worked on the API and fixed bugs."
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              id="skillInput"
              label="Key Skill to Integrate"
              placeholder="e.g. Node.js, React, Docker"
              value={targetSkill}
              onChange={(e) => setTargetSkill(e.target.value)}
            />
            <div className="flex items-end">
              <Button type="submit" size="md" loading={rewriting} className="w-full gap-2">
                <RefreshCw className="w-4 h-4" />
                Transform via XYZ
              </Button>
            </div>
          </div>
        </form>

        {rewritten && (
          <div className="p-5 rounded-2xl bg-navy-950 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant="purple" size="sm">Optimized Transformation</Badge>
              <button
                onClick={() => copyToClipboard(rewritten.improved)}
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white"
              >
                <Copy className="w-3.5 h-3.5" /> Copy
              </button>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold text-emerald-300 leading-relaxed">
                {rewritten.improved}
              </p>
              <p className="text-xs text-slate-400">
                <strong className="text-slate-300">Rule:</strong> {rewritten.notes}
              </p>
            </div>
          </div>
        )}
      </Card>

      {/* Full Resume Auto-Tailor */}
      <Card className="p-6 space-y-6">
        <div>
          <h3 className="text-base font-bold text-white">Full-Resume ATS Tailoring</h3>
          <p className="text-xs text-slate-400">
            Synthesize your resume with target job skills, update summary statements, and generate a downloadable ATS DOCX.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Select Source Resume
            </label>
            <select
              value={selectedResumeId}
              onChange={(e) => setSelectedResumeId(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl text-sm bg-navy-950 border border-white/10 text-white focus:outline-none focus:border-blue-500"
            >
              {resumes.map((r) => (
                <option key={r._id} value={r._id}>{r.title}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Select Target Job
            </label>
            <select
              value={selectedJobId}
              onChange={(e) => setSelectedJobId(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl text-sm bg-navy-950 border border-white/10 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="">Standard Software Engineering Alignment</option>
              {jobs.map((j) => (
                <option key={j._id} value={j._id}>{j.title} {j.company ? `@ ${j.company}` : ''}</option>
              ))}
            </select>
          </div>
        </div>

        <Button
          onClick={handleOptimizeResume}
          loading={optimizing}
          disabled={!selectedResumeId}
          className="w-full gap-2"
        >
          Generate Optimized Version
          <ArrowRight className="w-4 h-4" />
        </Button>

        {optimizedResult && (
          <div className="p-5 rounded-2xl bg-navy-950 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Optimized Draft Ready
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={resumeService.getDownloadDocxUrl(selectedResumeId)}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  <Button variant="secondary" size="sm" className="gap-1.5">
                    <Download className="w-3.5 h-3.5" /> DOCX
                  </Button>
                </a>
                <a
                  href={resumeService.getDownloadPdfUrl(selectedResumeId)}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  <Button variant="secondary" size="sm" className="gap-1.5">
                    <Download className="w-3.5 h-3.5" /> PDF
                  </Button>
                </a>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Tailored Summary:</span>
              <p className="text-xs text-slate-200 leading-relaxed italic bg-navy-900 p-3 rounded-xl border border-white/5">
                {optimizedResult.summary}
              </p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
