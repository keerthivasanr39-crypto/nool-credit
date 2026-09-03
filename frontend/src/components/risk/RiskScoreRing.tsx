import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, TrendingUp, AlertCircle, Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface RiskScoreRingProps {
  score?: number;
  showBreakdown?: boolean;
}

export const RiskScoreRing: React.FC<RiskScoreRingProps> = ({ score = 86, showBreakdown = true }) => {
  const { t } = useTranslation();
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = score / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [score]);

  // SVG Circle calculation
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  const getRiskTier = (val: number) => {
    if (val >= 80) return { label: 'LOW RISK', color: '#10B981', textColor: 'text-emerald-600', bg: 'bg-emerald-50' };
    if (val >= 60) return { label: 'MEDIUM RISK', color: '#F59E0B', textColor: 'text-amber-600', bg: 'bg-amber-50' };
    return { label: 'HIGH RISK', color: '#EF4444', textColor: 'text-rose-600', bg: 'bg-rose-50' };
  };

  const tier = getRiskTier(score);

  const breakdownItems = [
    { label: 'Business Profile', score: 18, max: 20 },
    { label: 'Document Verification', score: 18, max: 20 },
    { label: 'Invoice Quality', score: 19, max: 20 },
    { label: 'Buyer Reliability', score: 14, max: 15 },
    { label: 'Payment History', score: 12, max: 15 },
    { label: 'Platform Activity', score: 5, max: 10 }
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {t('risk.scoreLabel')}
          </span>
          <h3 className="text-base font-extrabold text-slate-900 mt-0.5">
            Credit Health & Readiness Index
          </h3>
        </div>
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${tier.bg} ${tier.textColor}`}>
          {tier.label}
        </span>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-around gap-8">
        {/* Animated Radial Score Gauge */}
        <div className="relative flex items-center justify-center">
          <svg className="w-48 h-48 transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r={radius}
              stroke="#F1F5F9"
              strokeWidth="12"
              fill="transparent"
            />
            <motion.circle
              cx="96"
              cy="96"
              r={radius}
              stroke={tier.color}
              strokeWidth="12"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
          </svg>

          {/* Centered Score */}
          <div className="absolute flex flex-col items-center justify-center">
            <div className="flex items-baseline">
              <span className="text-4xl font-extrabold text-slate-900 tracking-tight">
                {animatedScore}
              </span>
              <span className="text-sm font-semibold text-slate-400">/100</span>
            </div>
            <span className={`text-[11px] font-extrabold uppercase mt-1 tracking-wider ${tier.textColor}`}>
              {tier.label}
            </span>
          </div>
        </div>

        {/* Breakdown bars */}
        {showBreakdown && (
          <div className="w-full lg:w-3/5 space-y-3">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Score Breakdown Metrics
            </h4>
            {breakdownItems.map((item, idx) => {
              const pct = (item.score / item.max) * 100;
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-600">{item.label}</span>
                    <span className="font-bold text-slate-800">
                      {item.score} / {item.max}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-brand-600 to-emerald-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 1, delay: idx * 0.1 }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* How to Improve Recommendation Callout */}
      <div className="mt-8 pt-6 border-t border-slate-100 bg-slate-50/60 rounded-2xl p-4">
        <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mb-2">
          <Award className="w-4 h-4 text-brand-600" />
          {t('risk.howToImprove')}
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
          <div className="flex items-center gap-1.5">
            <span className="text-emerald-500 font-bold">✓</span> {t('risk.tip1')}
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-emerald-500 font-bold">✓</span> {t('risk.tip2')}
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-emerald-500 font-bold">✓</span> {t('risk.tip3')}
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-emerald-500 font-bold">✓</span> {t('risk.tip4')}
          </div>
        </div>
      </div>
    </div>
  );
};
