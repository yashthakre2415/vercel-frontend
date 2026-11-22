import React, { useState, useEffect } from 'react';
import { Sliders, Save, User, Shield } from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Card } from '../components/common/Card';

export function SettingsPage() {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState(0);
  const [industry, setIndustry] = useState('');
  const [saving, setSaving] = useState(false);

  const toast = useToast();

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setTargetRole(user.profile?.targetRole || '');
      setYearsOfExperience(user.profile?.yearsOfExperience || 0);
      setIndustry(user.profile?.industry || '');
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await api.put('/users/profile', {
        name,
        targetRole,
        yearsOfExperience: Number(yearsOfExperience),
        industry,
      });
      if (res.data.success) {
        toast.success('Profile settings updated successfully.');
      }
    } catch (err) {
      toast.error('Failed to update profile settings.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Account & Career Settings</h1>
        <p className="text-xs text-slate-400 mt-1">
          Customize your default professional profile and career target preferences.
        </p>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-white/10">
            <div className="w-10 h-10 rounded-full bg-indigo-600/30 border border-indigo-500/30 flex items-center justify-center font-bold text-indigo-300">
              {name ? name[0].toUpperCase() : 'U'}
            </div>
            <div>
              <p className="text-sm font-bold text-white">{name || 'Your Name'}</p>
              <p className="text-xs text-slate-400">{user?.email}</p>
            </div>
          </div>

          <div className="space-y-4">
            <Input
              id="name"
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                id="targetRole"
                label="Target Job Title"
                placeholder="Senior Full Stack Engineer"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
              />
              <Input
                id="yearsExp"
                label="Years of Experience"
                type="number"
                min="0"
                max="50"
                value={yearsOfExperience}
                onChange={(e) => setYearsOfExperience(e.target.value)}
              />
            </div>

            <Input
              id="industry"
              label="Primary Industry / Domain"
              placeholder="Cloud Software / FinTech"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            />
          </div>

          <Button type="submit" loading={saving} className="gap-2">
            <Save className="w-4 h-4" />
            Save Profile Settings
          </Button>
        </form>
      </Card>
    </div>
  );
}
