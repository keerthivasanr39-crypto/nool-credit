import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, TrendingUp, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const NoolBusinessScoreCard: React.FC = () => {
  const score = 84;
  const categories = [
    { name: 'Profile Completeness', score: 18, max: 20, pct: 90, color: 'bg-emerald-500' },
    { name: 'Document Verification', score: 20, max: 20, pct: 100, color: 'bg-emerald-600' },
    { name: 'Invoice Reliability', score: 18, max: 20, pct: 90, color: 'bg-brand-600' },
    { name: 'Payment History', score: 15, max: 20, pct: 75, color: 'bg-amber-500' },
    { name: 'Business Activity', score: 13, max: 20, pct: 65, color: 'bg-indigo-500' },
  ];

  const recommendations = [
    'Upload latest Q2 audited bank statement (+3 pts)',
    'Add 2 more verified buyer purchase orders (+5 pts)',
    'Maintain 100% on-time settlement record with ABC Garments',
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-700 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-brand-700/20">
            <Sparkles className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-900">
              NOOL BUSINESS SCORE
            </h3>
            <p className="text-xs text-slate-400">
              Comprehensive MSME Financial & Operational Health Engine
            </p>
          </div>
        </div>

        <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
          EXCELLENT HEALTH
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left: Circular Gauge Score */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center p-4 bg-slate-50/80 rounded-2xl border border-slate-100 text-center">
          <div className="relative w-36 h-36 flex items-center justify-center">
            {/* SVG Circular Progress Ring */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                className="text-slate-200"
                strokeWidth="9"
                stroke="currentColor"
                fill="transparent"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="40"
                className="text-brand-600"
                strokeWidth="9"
                strokeDasharray={2 * Math.PI * 40}
                initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                animate={{ strokeDashoffset: (2 * Math.PI * 40) * (1 - score / 100) }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-3xl font-extrabold text-slate-900 leading-none"
              >
                {score}
              </motion.span>
              <span className="text-[11px] text-slate-400 font-semibold mt-0.5">/ 100</span>
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mt-1">
                Low Risk
              </span>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 font-medium">
            Higher than 82% of regional textile MSMEs
          </p>
        </div>

        {/* Right: 5 Category Breakdown Bars */}
        <div className="lg:col-span-8 space-y-3">
          {categories.map((cat, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-700">{cat.name}</span>
                <span className="text-slate-900 font-bold">
                  {cat.score} <span className="text-slate-400 font-normal">/ {cat.max}</span>
                </span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${cat.pct}%` }}
                  transition={{ duration: 1, delay: idx * 0.1 }}
                  className={`h-full rounded-full ${cat.color}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations Checklist */}
      <div className="p-4 bg-brand-50/60 rounded-2xl border border-brand-100 space-y-2">
        <div className="text-xs font-bold text-brand-900 flex items-center gap-1.5">
          <TrendingUp className="w-4 h-4 text-brand-600" />
          <span>Actionable Ways to Reach 90+ Score:</span>
        </div>
        <div className="space-y-1.5 text-xs text-brand-800">
          {recommendations.map((rec, i) => (
            <div key={i} className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>{rec}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
