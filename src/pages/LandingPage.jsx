import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  CheckCircle2,
  Shield,
  FileText,
  TrendingUp,
  Cpu,
  Layers,
  ArrowRight,
  Target,
  FileCheck,
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { ScoreGauge } from '../components/common/ScoreGauge';
import { useAuth } from '../context/AuthContext';

export function LandingPage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-navy-950 to-navy-950 -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border-blue-500/30 text-blue-300 text-xs font-semibold"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Next-Generation Deterministic ATS Architecture</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight"
          >
            Know Your Match.{' '}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-violet-400 bg-clip-text text-transparent">
              Improve Your Resume.
            </span>{' '}
            Get Interview Ready.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            Stop guessing why recruiters aren’t calling. Get transparent 100-point compatibility scoring, uncover genuine skill gaps, and rewrite bullet points into Google XYZ format.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link to={isAuthenticated ? '/upload' : '/register'}>
              <Button size="lg" className="w-full sm:w-auto gap-2 text-base px-8 py-3.5 shadow-2xl shadow-blue-500/25">
                Analyze Resume Free
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to={isAuthenticated ? '/dashboard' : '/login'}>
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-base px-8 py-3.5">
                {isAuthenticated ? 'View Dashboard' : 'Sign In'}
              </Button>
            </Link>
          </motion.div>

          {/* Trust badges */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-8 text-xs text-slate-400">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              100% Deterministic Engine
            </span>
            <span className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-400" />
              Zero Fabrication AI Rules
            </span>
            <span className="flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-indigo-400" />
              PDF, DOCX & TXT Extraction
            </span>
          </div>

          {/* Interactive Preview Hero Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 max-w-4xl mx-auto glass-card p-8 rounded-3xl border border-white/10 shadow-2xl relative"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="flex flex-col items-center">
                <ScoreGauge score={88} size={180} />
              </div>
              <div className="md:col-span-2 text-left space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white">Senior Full Stack Engineer</h3>
                    <p className="text-xs text-slate-400">Target Role: Cloud Infrastructure & Microservices</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    High Compatibility
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Exceptional Match (88%). Profile strongly validates 6 of 7 required skills with measurable work history. Minor gaps detected in GraphQL and AWS Kubernetes ECS pipelines.
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-navy-900 border border-white/5">
                    <span className="text-slate-400 block text-[10px]">Required Skills</span>
                    <strong className="text-emerald-400 font-mono text-sm">33.5 / 35 pts</strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-navy-900 border border-white/5">
                    <span className="text-slate-400 block text-[10px]">Bullet Quality & XYZ</span>
                    <strong className="text-blue-400 font-mono text-sm">18.0 / 20 pts</strong>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Pillar Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Built on Real ATS Standards</h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Unlike superficial resume scanners that return arbitrary percentages, ResumeIQ computes explainable scores across 7 rigorous hiring dimensions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="space-y-4 p-8">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Deterministic Scoring</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              No black-box hallucinated numbers. Our transparent 100-point engine allocates 35 pts for required skills, 20 pts for experience, 15 pts for preferred skills, and 10 pts for machine readability.
            </p>
          </Card>

          <Card className="space-y-4 p-8">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Google XYZ Formula</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Elevate passive bullet points into quantifiable impact statements: "Accomplished [X] as measured by [Y] by doing [Z]". With strict metrics placeholders—never fabricated claims.
            </p>
          </Card>

          <Card className="space-y-4 p-8">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Privacy & Instant Deletion</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Your career history belongs to you. We never train public models on your resume, and provide single-click permanent erasure of all uploaded files, parsed text, and scores.
            </p>
          </Card>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-10 rounded-3xl border border-blue-500/30 text-center space-y-6 relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <h2 className="text-3xl font-black text-white">Ready to Optimize Your Next Application?</h2>
          <p className="text-sm text-slate-300 max-w-lg mx-auto">
            Upload your resume now to run deep compatibility checks, download detailed PDF reports, and optimize your bullet points.
          </p>
          <Link to={isAuthenticated ? '/upload' : '/register'}>
            <Button size="lg" className="px-8 py-3.5 text-base shadow-xl">
              Get Started Free Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
