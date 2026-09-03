import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle2, AlertCircle, TrendingUp, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const TimelineFlow: React.FC = () => {
  const { t } = useTranslation();

  const steps = [
    {
      day: t('problem.day1Title'),
      desc: t('problem.day1Desc'),
      icon: CheckCircle2,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/30',
      status: 'success',
    },
    {
      day: t('problem.day30Title'),
      desc: t('problem.day30Desc'),
      icon: Clock,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/30',
      status: 'pending',
    },
    {
      day: t('problem.day60Title'),
      desc: t('problem.day60Desc'),
      icon: AlertCircle,
      color: 'text-rose-400',
      bg: 'bg-rose-500/10 border-rose-500/30',
      status: 'squeeze',
      highlight: true,
    },
    {
      day: t('problem.day90Title'),
      desc: t('problem.day90Desc'),
      icon: TrendingUp,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/30',
      status: 'received',
    },
  ];

  return (
    <div className="w-full py-8">
      {/* Visual Timeline Nodes */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
        {/* Connecting Line behind items on desktop */}
        <div className="hidden md:block absolute top-1/2 left-8 right-8 h-0.5 bg-gradient-to-r from-blue-500/40 via-rose-500/40 to-emerald-500/40 -translate-y-6 z-0" />

        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
              className={`relative z-10 p-5 rounded-2xl border glass-card transition-all ${
                step.highlight
                  ? 'border-rose-500/40 shadow-xl shadow-rose-500/10 scale-105'
                  : 'hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-xl border ${step.bg}`}>
                  <Icon className={`w-5 h-5 ${step.color}`} />
                </div>
                <span className={`text-xs font-bold tracking-wider px-2 py-0.5 rounded-full ${step.bg} ${step.color}`}>
                  {step.day}
                </span>
              </div>

              <h4 className="text-sm font-semibold text-slate-200 mb-1 leading-snug">
                {step.desc}
              </h4>

              {step.highlight && (
                <div className="mt-3 pt-2.5 border-t border-rose-500/20 text-[11px] text-rose-300 font-medium flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  Cashflow Gap Stress Point
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Solution Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="mt-8 p-4 md:p-6 rounded-2xl bg-gradient-to-r from-blue-900/40 via-indigo-900/40 to-cyan-900/40 border border-blue-500/30 text-center flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <div className="text-left">
          <h4 className="text-base font-bold text-white font-display">
            {t('problem.bridge')}
          </h4>
          <p className="text-xs text-slate-300">
            Get up to 85% advance working capital against verified pending invoices within 24-48 hours.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 bg-cyan-950/60 px-3.5 py-2 rounded-xl border border-cyan-500/30">
          <span>Accelerate Cashflow</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </motion.div>
    </div>
  );
};
