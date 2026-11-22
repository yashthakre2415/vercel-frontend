import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FileText, Mail, Phone, MapPin, Linkedin, Github, Play, Sparkles, Download, CheckCircle2 } from 'lucide-react';
import { resumeService } from '../services/resume.service';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Skeleton } from '../components/common/Skeleton';

export function ResumePreviewPage() {
  const { id } = useParams();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadResume() {
      try {
        const res = await resumeService.getResumeById(id);
        if (res.success) {
          setResume(res.resume);
        }
      } catch (err) {
        console.error('Failed to fetch resume:', err);
      } finally {
        setLoading(false);
      }
    }
    loadResume();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-40" />
        <Skeleton className="h-64" />
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="text-center py-16 space-y-4">
        <h2 className="text-xl font-bold text-white">Resume not found</h2>
        <Link to="/resumes"><Button>Return to Library</Button></Link>
      </div>
    );
  }

  const contact = resume.contactInfo || {};

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{resume.title}</h1>
          <p className="text-xs text-slate-400 mt-1">
            {resume.originalFileName} • {resume.fileFormat?.toUpperCase()} • {((resume.fileSize || 0) / 1024).toFixed(1)} KB
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link to={`/jobs?resumeId=${resume._id}`}>
            <Button size="sm" className="gap-2 shadow-lg shadow-blue-500/20">
              <Play className="w-4 h-4" />
              Run ATS Analysis
            </Button>
          </Link>
          <Link to="/studio">
            <Button variant="secondary" size="sm" className="gap-2">
              <Sparkles className="w-4 h-4 text-violet-400" />
              Open in Studio
            </Button>
          </Link>
        </div>
      </div>

      {/* Contact Info Header Card */}
      <Card className="p-6 space-y-4">
        <div className="border-b border-white/10 pb-4">
          <h2 className="text-xl font-bold text-white">{contact.name || 'Applicant'}</h2>
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 mt-2">
            {contact.email && (
              <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-blue-400" /> {contact.email}</span>
            )}
            {contact.phone && (
              <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-emerald-400" /> {contact.phone}</span>
            )}
            {contact.location && (
              <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-amber-400" /> {contact.location}</span>
            )}
            {contact.linkedin && (
              <span className="flex items-center gap-1.5"><Linkedin className="w-3.5 h-3.5 text-indigo-400" /> LinkedIn</span>
            )}
            {contact.github && (
              <span className="flex items-center gap-1.5"><Github className="w-3.5 h-3.5 text-slate-400" /> GitHub</span>
            )}
          </div>
        </div>

        {/* Summary */}
        {resume.summary && (
          <div className="space-y-1.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Professional Summary</h3>
            <p className="text-sm text-slate-200 leading-relaxed">{resume.summary}</p>
          </div>
        )}
      </Card>

      {/* Extracted Skills */}
      <Card className="p-6 space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Extracted Skills</h3>
        <div className="flex flex-wrap gap-2">
          {(resume.skills || []).map((s, idx) => (
            <Badge key={idx} variant="primary" size="md">
              {typeof s === 'string' ? s : s.name}
            </Badge>
          ))}
        </div>
      </Card>

      {/* Experience */}
      {resume.experience && resume.experience.length > 0 && (
        <Card className="p-6 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Work History</h3>
          <div className="space-y-6 divide-y divide-white/5">
            {resume.experience.map((exp, idx) => (
              <div key={idx} className={idx > 0 ? 'pt-4 space-y-2' : 'space-y-2'}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <h4 className="text-base font-bold text-white">{exp.title}</h4>
                  <span className="text-xs text-slate-400">{exp.company}</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {(exp.bullets || []).map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2">
                      <span className="text-blue-400">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Education */}
      {resume.education && resume.education.length > 0 && (
        <Card className="p-6 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Education</h3>
          <div className="space-y-2">
            {resume.education.map((edu, idx) => (
              <div key={idx} className="text-xs text-slate-200">
                <strong className="text-white">{edu.degree}</strong> {edu.institution ? `• ${edu.institution}` : ''}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
