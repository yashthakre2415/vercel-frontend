import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Trash2, CheckCircle2, Lock, EyeOff } from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';

export function PrivacyPage() {
  const [confirmDelete, setConfirmDelete] = useState('');
  const [deleting, setDeleting] = useState(false);
  const { logout } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    if (confirmDelete !== 'DELETE MY DATA') {
      toast.error('Please type DELETE MY DATA exactly to confirm.');
      return;
    }

    try {
      setDeleting(true);
      const res = await api.delete('/users/delete-account');
      if (res.data.success) {
        toast.success('Your account and all associated data have been permanently erased.');
        await logout();
        navigate('/');
      }
    } catch (err) {
      toast.error('Failed to complete data deletion request.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Privacy, GDPR & Data Deletion</h1>
        <p className="text-xs text-slate-400 mt-1">
          Full data sovereignty. We process your resume solely for your direct analysis and never sell your profile.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5 space-y-2">
          <Lock className="w-5 h-5 text-blue-400" />
          <h4 className="text-sm font-bold text-white">Encrypted Transmission</h4>
          <p className="text-xs text-slate-400">All resume text and tokens are processed via TLS/HTTPS encryption.</p>
        </Card>
        <Card className="p-5 space-y-2">
          <EyeOff className="w-5 h-5 text-indigo-400" />
          <h4 className="text-sm font-bold text-white">No Public AI Training</h4>
          <p className="text-xs text-slate-400">Your resume bullets and employer data are never fed into foundation model training corpora.</p>
        </Card>
        <Card className="p-5 space-y-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <h4 className="text-sm font-bold text-white">Instant Data Erasure</h4>
          <p className="text-xs text-slate-400">Right to be forgotten: Execute irreversible account and database record deletion anytime.</p>
        </Card>
      </div>

      {/* Danger Zone: Permanent Account & Data Deletion */}
      <Card className="p-6 border border-red-500/30 bg-red-950/10 space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-red-500/20 text-red-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Permanent Account & Data Erasure</h3>
            <p className="text-xs text-red-300">Irreversible action under GDPR Article 17 (Right to Erasure)</p>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Executing this request will immediately purge your user credentials, uploaded resumes, parsed section buffers, job descriptions, ATS score records, and saved version history from the database.
        </p>

        <div className="space-y-3 pt-2">
          <label className="block text-xs font-semibold text-slate-300">
            To proceed, type <span className="font-mono text-red-400 font-bold">DELETE MY DATA</span> in the field below:
          </label>
          <input
            type="text"
            value={confirmDelete}
            onChange={(e) => setConfirmDelete(e.target.value)}
            placeholder="DELETE MY DATA"
            className="w-full px-4 py-2.5 rounded-xl text-sm bg-navy-950 border border-red-500/30 text-white placeholder-slate-600 focus:outline-none focus:border-red-500 font-mono"
          />
          <Button
            variant="danger"
            onClick={handleDeleteAccount}
            loading={deleting}
            disabled={confirmDelete !== 'DELETE MY DATA'}
            className="gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Permanently Erase All Data
          </Button>
        </div>
      </Card>
    </div>
  );
}
