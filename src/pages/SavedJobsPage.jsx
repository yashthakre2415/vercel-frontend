import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Trash2, Play, Plus } from 'lucide-react';
import { jobService } from '../services/job.service';
import { useToast } from '../context/ToastContext';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';

export function SavedJobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const loadJobs = async () => {
    try {
      const res = await jobService.getJobs();
      if (res.success) setJobs(res.jobs);
    } catch (err) {
      console.error('Failed to load jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job description?')) return;
    try {
      const res = await jobService.deleteJob(id);
      if (res.success) {
        toast.success('Job description deleted.');
        setJobs(prev => prev.filter(j => j._id !== id));
      }
    } catch (err) {
      toast.error('Failed to delete job description.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Saved Target Roles</h1>
          <p className="text-xs text-slate-400 mt-1">Manage job postings used for comparative ATS evaluations.</p>
        </div>
        <Link to="/jobs">
          <Button size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            Add New Job
          </Button>
        </Link>
      </div>

      {jobs.length === 0 ? (
        <Card className="text-center py-16 space-y-3">
          <Briefcase className="w-8 h-8 text-slate-400 mx-auto" />
          <p className="text-sm text-slate-400">No job postings stored in your vault.</p>
          <Link to="/jobs"><Button size="sm">Create First Job Record</Button></Link>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobs.map((job) => (
            <Card key={job._id} className="p-6 space-y-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-white">{job.title}</h3>
                  {job.company && <p className="text-xs text-slate-400">{job.company}</p>}
                </div>
                <button
                  onClick={() => handleDelete(job._id)}
                  className="text-slate-500 hover:text-red-400 p-1.5 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Required Competencies:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(job.requiredSkills || []).map((skill, idx) => (
                    <Badge key={idx} variant="primary" size="sm">{skill}</Badge>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-white/5 text-xs">
                <span className="text-slate-400 font-mono text-[11px]">
                  {new Date(job.createdAt).toLocaleDateString()}
                </span>
                <Link to={`/jobs`}>
                  <Button variant="ghost" size="sm" className="gap-1.5">
                    <Play className="w-3.5 h-3.5 text-blue-400" /> Run Scan
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
