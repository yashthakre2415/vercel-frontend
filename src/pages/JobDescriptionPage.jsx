import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Briefcase, Play, Plus, ArrowRight, CheckCircle2 } from 'lucide-react';
import { jobService } from '../services/job.service';
import { resumeService } from '../services/resume.service';
import { analysisService } from '../services/analysis.service';
import { useToast } from '../context/ToastContext';
import { Button } from '../components/common/Button';
import { Input, Textarea } from '../components/common/Input';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';

export function JobDescriptionPage() {
  const [jobs, setJobs] = useState([]);
  const [resumes, setResumes] = useState([]);
  const [selectedResumeId, setSelectedResumeId] = useState('');
  const [selectedJobId, setSelectedJobId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newRawText, setNewRawText] = useState('');
  const [submittingJob, setSubmittingJob] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const [searchParams] = useSearchParams();
  const urlResumeId = searchParams.get('resumeId');

  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadData() {
      try {
        const [jobsRes, resumesRes] = await Promise.all([
          jobService.getJobs(),
          resumeService.getResumes(),
        ]);
        if (jobsRes.success) setJobs(jobsRes.jobs);
        if (resumesRes.success) {
          setResumes(resumesRes.resumes);
          if (urlResumeId) {
            setSelectedResumeId(urlResumeId);
          } else if (resumesRes.resumes.length > 0) {
            setSelectedResumeId(resumesRes.resumes[0]._id);
          }
        }
      } catch (err) {
        console.error('Failed to load jobs or resumes:', err);
      }
    }
    loadData();
  }, [urlResumeId]);

  const handleCreateJob = async (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newRawText.trim()) {
      toast.error('Title and job description text are required.');
      return;
    }

    try {
      setSubmittingJob(true);
      const res = await jobService.createJob({
        title: newTitle,
        company: newCompany,
        rawText: newRawText,
      });
      if (res.success) {
        toast.success('Job description saved & requirements extracted.');
        setJobs(prev => [res.job, ...prev]);
        setSelectedJobId(res.job._id);
        setIsModalOpen(false);
        setNewTitle('');
        setNewCompany('');
        setNewRawText('');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save job description.');
    } finally {
      setSubmittingJob(false);
    }
  };

  const handleRunAnalysis = async () => {
    if (!selectedResumeId) {
      toast.error('Please select a resume to analyze.');
      return;
    }

    try {
      setAnalyzing(true);
      const res = await analysisService.createAnalysis(selectedResumeId, selectedJobId || null);
      if (res.success && res.analysis) {
        toast.success('Analysis complete!');
        navigate(`/results/${res.analysis._id}`);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to complete analysis.');
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Job Descriptions & Analysis</h1>
          <p className="text-xs text-slate-400 mt-1">
            Target specific job openings to test ATS alignment, skill coverage, and keyword density.
          </p>
        </div>
        <Button size="sm" onClick={() => setIsModalOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Job Description
        </Button>
      </div>

      {/* Runner Bar */}
      <Card className="p-6 border border-blue-500/25 bg-navy-900/80 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Play className="w-4 h-4 text-blue-400" />
          Run ATS Analysis
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Select Resume
            </label>
            <select
              value={selectedResumeId}
              onChange={(e) => setSelectedResumeId(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl text-sm bg-navy-950 border border-white/10 text-white focus:outline-none focus:border-blue-500"
            >
              {resumes.length === 0 ? (
                <option value="">No resumes found. Please upload one first.</option>
              ) : (
                resumes.map((r) => (
                  <option key={r._id} value={r._id}>
                    {r.title} ({r.originalFileName || 'Upload'})
                  </option>
                ))
              )}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Select Target Job (Optional)
            </label>
            <select
              value={selectedJobId}
              onChange={(e) => setSelectedJobId(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl text-sm bg-navy-950 border border-white/10 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="">General Market Assessment (No specific job)</option>
              {jobs.map((j) => (
                <option key={j._id} value={j._id}>
                  {j.title} {j.company ? `@ ${j.company}` : ''}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Button
          size="lg"
          onClick={handleRunAnalysis}
          loading={analyzing}
          disabled={!selectedResumeId}
          className="w-full gap-2 shadow-xl shadow-blue-500/20"
        >
          Execute ATS Scan
          <ArrowRight className="w-4 h-4" />
        </Button>
      </Card>

      {/* Saved Jobs List */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Saved Target Roles</h3>
        {jobs.length === 0 ? (
          <Card className="text-center py-12 p-6 space-y-3">
            <Briefcase className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-sm text-slate-400">No job descriptions added yet.</p>
            <Button size="sm" onClick={() => setIsModalOpen(true)}>Add Target Job</Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {jobs.map((job) => (
              <Card key={job._id} className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-base font-bold text-white">{job.title}</h4>
                    {job.company && <p className="text-xs text-slate-400">{job.company}</p>}
                  </div>
                  <Badge variant="primary" size="sm">{job.requiredYearsOfExperience || 3}+ Yrs</Badge>
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-slate-400 block">Required Skills:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {(job.requiredSkills || []).slice(0, 6).map((s, idx) => (
                      <span key={idx} className="text-[11px] px-2 py-0.5 rounded-md bg-navy-900 border border-white/5 text-slate-300">
                        {s}
                      </span>
                    ))}
                    {(job.requiredSkills || []).length > 6 && (
                      <span className="text-[11px] text-slate-400">+{job.requiredSkills.length - 6} more</span>
                    )}
                  </div>
                </div>
                <div className="pt-2 flex items-center justify-between border-t border-white/5">
                  <span className="text-[10px] text-slate-400">
                    Added {new Date(job.createdAt).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => {
                      setSelectedJobId(job._id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-xs font-semibold text-blue-400 hover:text-blue-300"
                  >
                    Select for Scan
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Add Job Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Target Job Description" maxWidth="max-w-2xl">
        <form onSubmit={handleCreateJob} className="space-y-4">
          <Input
            id="jobTitle"
            label="Job Title"
            placeholder="Senior Full Stack Software Engineer"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            required
          />
          <Input
            id="company"
            label="Company (Optional)"
            placeholder="Acme Corp"
            value={newCompany}
            onChange={(e) => setNewCompany(e.target.value)}
          />
          <Textarea
            id="jobDescriptionText"
            label="Full Job Description Text"
            rows={8}
            placeholder="Paste the complete requirements, responsibilities, and qualifications from the job posting..."
            value={newRawText}
            onChange={(e) => setNewRawText(e.target.value)}
            required
          />
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" loading={submittingJob}>
              Save & Extract Skills
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
