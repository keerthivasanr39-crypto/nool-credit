import React from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, AlertTriangle, ShieldCheck, Info } from 'lucide-react';

interface ExplainableRiskCardProps {
  positiveFactors?: string[];
  riskFactors?: string[];
}

export const ExplainableRiskCard: React.FC<ExplainableRiskCardProps> = ({
  positiveFactors = [
    'Strong buyer payment history (>95% on-time settlement record)',
    'Multiple previous successful invoice completions with buyer',
    'Consistent transaction volume over the past 12 months',
    'Invoice value aligns within normal historical PO ranges'
  ],
  riskFactors = [
    'Slight increase in average industry payment clearing delay (+6 days)',
    'Seasonal fluctuations in regional raw textile yarn pricing'
  ]
}) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900">{t('risk.whyThisScore')}</h3>
          <p className="text-xs text-slate-400">Transparent AI Explainability breakdown for lenders and MSMEs</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Positive Factors */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{t('risk.positiveFactors')}</span>
          </div>
          <div className="space-y-2">
            {positiveFactors.map((factor, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-emerald-50/40 border border-emerald-100 text-xs text-slate-700 flex items-start gap-2.5"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed font-medium">{factor}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Warnings & Considerations */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-100">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>{t('risk.riskFactors')}</span>
          </div>
          <div className="space-y-2">
            {riskFactors.length === 0 ? (
              <div className="p-4 rounded-2xl bg-slate-50 text-xs text-slate-400 text-center">
                No major risk alerts detected for this profile.
              </div>
            ) : (
              riskFactors.map((factor, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-amber-50/40 border border-amber-100 text-xs text-slate-700 flex items-start gap-2.5"
                >
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed font-medium">{factor}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
