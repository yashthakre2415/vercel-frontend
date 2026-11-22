import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layers, Download, Trash2, Eye, Play, Sparkles } from 'lucide-react';
import { resumeService } from '../services/resume.service';
import { useToast } from '../context/ToastContext';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';

export function ResumeLibraryPage() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const loadResumes = async () => {
    try {
      const res = await resumeService.getResumes();
      if (res.success) setResumes(res.resumes);
    } catch (err) {
      console.error('Failed to load resumes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadResumes();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this resume?')) return;
    try {
      const res = await resumeService.deleteResume(id);
      if (res.success) {
        toast.success('Resume deleted.');
        setResumes(prev => prev.filter(r => r._id !== id));
      }
    } catch (err) {
      toast.error('Failed to delete resume.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Resume Library</h1>
          <p className="text-xs text-slate-400 mt-1">Manage your parsed resumes, download DOCX/PDF versions, and run audits.</p>
        </div>
        <Link to="/upload">
          <Button size="sm">Upload New Resume</Button>
        </Link>
      </div>

      {resumes.length === 0 ? (
        <Card className="text-center py-16 space-y-3">
          <Layers className="w-8 h-8 text-slate-400 mx-auto" />
          <p className="text-sm text-slate-400">No resumes stored yet.</p>
          <Link to="/upload"><Button size="sm">Upload Your First Resume</Button></Link>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resumes.map((resume) => (
            <Card key={resume._id} className="p-6 space-y-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-white">{resume.title}</h3>
                  <p className="text-xs text-slate-400">
                    {resume.originalFileName} • {resume.fileFormat?.toUpperCase()} • {((resume.fileSize || 0) / 1024).toFixed(1)} KB
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(resume._id)}
                  className="text-slate-500 hover:text-red-400 p-1.5 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {resume.summary && (
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {resume.summary}
                </p>
              )}

              <div className="flex flex-wrap gap-1.5">
                {(resume.skills || []).slice(0, 5).map((s, idx) => (
                  <Badge key={idx} variant="default" size="sm">
                    {typeof s === 'string' ? s : s.name}
                  </Badge>
                ))}
                {(resume.skills || []).length > 5 && (
                  <span className="text-[11px] text-slate-400">+{resume.skills.length - 5} more</span>
                )}
              </div>

              <div className="pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <a
                    href={resumeService.getDownloadDocxUrl(resume._id)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors text-xs inline-flex items-center gap-1 font-mono"
                    title="Download DOCX"
                  >
                    <Download className="w-3.5 h-3.5" /> DOCX
                  </a>
                  <a
                    href={resumeService.getDownloadPdfUrl(resume._id)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors text-xs inline-flex items-center gap-1 font-mono"
                    title="Download PDF"
                  >
                    <Download className="w-3.5 h-3.5" /> PDF
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <Link to={`/resumes/${resume._id}/preview`}>
                    <Button variant="ghost" size="sm" className="gap-1.5">
                      <Eye className="w-3.5 h-3.5" /> Preview
                    </Button>
                  </Link>
                  <Link to={`/jobs?resumeId=${resume._id}`}>
                    <Button size="sm" className="gap-1.5">
                      <Play className="w-3.5 h-3.5" /> Scan
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
