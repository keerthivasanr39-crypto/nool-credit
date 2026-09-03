import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  CheckCircle2, 
  ChevronRight, 
  ArrowUpRight, 
  FileCheck2, 
  Building2, 
  TrendingUp, 
  Zap,
  Info
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface ReadinessScoreCardProps {
  score?: number;
}

export const ReadinessScoreCard: React.FC<ReadinessScoreCardProps> = ({ score = 82 }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(false);

  const breakdown = [
    { label: t('readiness.profileCompletion'), value: 20, max: 20, color: 'from-blue-500 to-cyan-400' },
    { label: t('readiness.documentVerification'), value: 15, max: 20, color: 'from-cyan-500 to-teal-400' },
    { label: t('readiness.invoiceQuality'), value: 18, max: 20, color: 'from-emerald-500 to-green-400' },
    { label: t('readiness.transactionConsistency'), value: 13, max: 15, color: 'from-indigo-500 to-purple-400' },
    { label: t('readiness.paymentHistory'), value: 14, max: 15, color: 'from-blue-500 to-indigo-400' },
    { label: t('readiness.platformActivity'), value: 2, max: 10, color: 'from-amber-500 to-orange-400' },
  ];

  return (
    <div className="glass-card p-6 rounded-3xl border border-blue-500/25 relative overflow-hidden space-y-5 shadow-xl">
      {/* Background Soft Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-600/10 via-cyan-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-0.5 shadow-md shadow-blue-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <h3 className="text-base font-bold text-white font-display">
              {t('readiness.title')}
            </h3>
            <p className="text-xs text-slate-400">
              {t('readiness.subtitle')}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 bg-cyan-950/40 px-3 py-1.5 rounded-xl border border-cyan-500/30 transition-all"
        >
          <span>{showDetails ? 'Hide Breakdown' : 'Score Breakdown'}</span>
          <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showDetails ? 'rotate-90' : ''}`} />
        </button>
      </div>

      {/* Score Readout and Progress Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
        <div className="md:col-span-4 flex items-center gap-4 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-slate-400">
              {t('readiness.scoreLabel')}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-white font-display">
                {score}
              </span>
              <span className="text-xs text-slate-400 font-medium">/100</span>
            </div>
          </div>

          <div className="ml-auto">
            <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider">
              {t('readiness.gradeGood')}
            </span>
          </div>
        </div>

        <div className="md:col-span-8 space-y-2">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-slate-300">Readiness Progress</span>
            <span className="text-cyan-400 font-mono">82% High Eligibility</span>
          </div>
          <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden p-0.5 border border-slate-800">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${score}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 h-full rounded-full"
            />
          </div>
          <p className="text-[11px] text-slate-400">
            Qualifies for expedited institutional underwriting and lower collateral margin haircuts.
          </p>
        </div>
      </div>

      {/* Collapsible Factor Breakdown */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="pt-2 border-t border-slate-800/80 space-y-3"
          >
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Score Pillars Breakdown
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {breakdown.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium">{item.label}</span>
                    <span className="font-bold text-white font-mono">{item.value}/{item.max}</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`bg-gradient-to-r ${item.color} h-full rounded-full`}
                      style={{ width: `${(item.value / item.max) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actionable Improvement Recommendations */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/30 via-slate-900/60 to-cyan-950/30 border border-blue-500/20 space-y-2.5 relative z-10">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            {t('readiness.howToImprove')}
          </span>
          <button
            onClick={() => navigate('/msme/documents')}
            className="text-[11px] font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1"
          >
            <span>Open Vault</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2 text-slate-300 p-2 rounded-xl bg-slate-900/60 border border-slate-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
            <span>{t('readiness.rec1')} (+5 pts)</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300 p-2 rounded-xl bg-slate-900/60 border border-slate-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
            <span>{t('readiness.rec2')} (+3 pts)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
