import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, CheckCircle2, AlertCircle, ArrowRight, Clipboard } from 'lucide-react';
import { resumeService } from '../services/resume.service';
import { useToast } from '../context/ToastContext';
import { Button } from '../components/common/Button';
import { Input, Textarea } from '../components/common/Input';
import { Card } from '../components/common/Card';

export function UploadResumePage() {
  const [mode, setMode] = useState('file'); // 'file' or 'text'
  const [file, setFile] = useState(null);
  const [rawText, setRawText] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const toast = useToast();
  const navigate = useNavigate();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelected(e.target.files[0]);
    }
  };

  const handleFileSelected = (selected) => {
    const ext = selected.name.split('.').pop().toLowerCase();
    if (!['pdf', 'docx', 'doc', 'txt'].includes(ext)) {
      toast.error('Unsupported file format. Please upload PDF, DOCX, or TXT.');
      return;
    }
    setFile(selected);
    if (!title) {
      setTitle(selected.name.replace(/\.[^/.]+$/, ''));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (mode === 'file' && !file) {
      toast.error('Please select a resume file to upload.');
      return;
    }

    if (mode === 'text' && !rawText.trim()) {
      toast.error('Please paste your resume text.');
      return;
    }

    try {
      setLoading(true);
      let res;
      if (mode === 'file') {
        res = await resumeService.uploadFile(file, title);
      } else {
        res = await resumeService.uploadText(rawText, title);
      }

      if (res.success && res.resume) {
        toast.success('Resume parsed successfully!');
        navigate(`/resumes/${res.resume._id}/preview`);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to parse resume. Please check the file.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Upload & Parse Resume</h1>
        <p className="text-xs text-slate-400 mt-1">
          Our parser extracts structured sections, identifies contact info, and detects layout barriers.
        </p>
      </div>

      <div className="flex items-center gap-2 p-1 bg-navy-900 rounded-xl border border-white/10 w-fit">
        <button
          type="button"
          onClick={() => setMode('file')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            mode === 'file' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Upload className="w-3.5 h-3.5" />
          File Upload (PDF / DOCX)
        </button>
        <button
          type="button"
          onClick={() => setMode('text')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            mode === 'text' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Clipboard className="w-3.5 h-3.5" />
          Direct Text Paste
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          id="title"
          label="Resume Label / Title"
          placeholder="e.g. Senior Full Stack - v2.1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {mode === 'file' ? (
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-3xl p-10 text-center cursor-pointer transition-all ${
              dragActive
                ? 'border-blue-500 bg-blue-500/10'
                : file
                ? 'border-emerald-500/40 bg-emerald-500/5'
                : 'border-white/15 bg-navy-900/50 hover:border-white/30'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,.doc,.txt"
              onChange={handleFileChange}
              className="hidden"
            />
            {file ? (
              <div className="space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-base font-bold text-white">{file.name}</p>
                  <p className="text-xs text-slate-400">{(file.size / 1024).toFixed(1)} KB • Click to swap file</p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mx-auto">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Click to browse or drop your resume here</p>
                  <p className="text-xs text-slate-400 mt-1">Supports PDF, DOCX, and TXT (Max 10MB)</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Textarea
            id="rawText"
            label="Raw Resume Text"
            rows={10}
            placeholder="Paste your resume content here including summary, work experience, bullet points, skills, and education..."
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            required
          />
        )}

        <Button type="submit" size="lg" loading={loading} className="w-full gap-2">
          Parse & Extract Resume
          <ArrowRight className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
}
