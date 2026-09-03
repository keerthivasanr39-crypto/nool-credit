import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Building, FileSpreadsheet, FileCheck, Award, ArrowRight, CheckCircle2 } from 'lucide-react';
import { RiskScoreRing } from '../components/risk/RiskScoreRing';
import { ExplainableRiskCard } from '../components/risk/ExplainableRiskCard';

export const EligibilityPage: React.FC = () => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(5); // Default to Step 5 to immediately showcase the 86/100 score, but allow navigating 1-5

  const steps = [
    { num: 1, title: 'Business Profile', icon: Building },
    { num: 2, title: 'Invoice Details', icon: FileSpreadsheet },
    { num: 3, title: 'Verification Docs', icon: FileCheck },
    { num: 4, title: 'Risk Assessment', icon: ShieldCheck },
    { num: 5, title: 'Readiness Result', icon: Award }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm">
        <h1 className="text-2xl font-extrabold text-slate-900">{t('nav.eligibility')}</h1>
        <p className="text-xs text-slate-500 mt-1">
          5-Step MSME Credit Assessment & Readiness Score Engine
        </p>

        {/* Step Indicator Nodes */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-6 pt-6 border-t border-slate-100">
          {steps.map((s) => {
            const Icon = s.icon;
            const isDone = currentStep > s.num;
            const isCurrent = currentStep === s.num;

            return (
              <button
                key={s.num}
                onClick={() => setCurrentStep(s.num)}
                className={`p-3 rounded-2xl border text-left transition-all flex items-center gap-2.5 ${
                  isCurrent
                    ? 'bg-brand-50 border-brand-300 text-brand-800 font-bold shadow-xs'
                    : isDone
                    ? 'bg-emerald-50/50 border-emerald-200 text-emerald-800'
                    : 'bg-slate-50 border-slate-200 text-slate-400'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs shrink-0 ${
                    isCurrent
                      ? 'bg-brand-600 text-white font-bold'
                      : isDone
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {isDone ? <CheckCircle2 className="w-4 h-4" /> : s.num}
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-bold truncate leading-tight">{s.title}</div>
                  <div className="text-[9px] text-slate-400">Step {s.num}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        {currentStep === 5 ? (
          <motion.div
            key="step5"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <RiskScoreRing score={86} showBreakdown />
            <ExplainableRiskCard />
          </motion.div>
        ) : (
          <motion.div
            key={`step-${currentStep}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-4 max-w-2xl mx-auto"
          >
            <h3 className="text-base font-bold text-slate-900">
              Step {currentStep}: {steps[currentStep - 1].title}
            </h3>
            <p className="text-xs text-slate-500">
              Information has been pre-verified from GST & MSME Sandbox records.
            </p>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Step data synchronized with Sri Lakshmi Knits (Tiruppur) profile.</span>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => setCurrentStep((prev) => Math.min(5, prev + 1))}
                className="flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-sm"
              >
                <span>Continue to Next Step</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
