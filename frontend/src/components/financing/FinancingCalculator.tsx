import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Sparkles, TrendingUp, ShieldCheck, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { PrivacyMask } from '../common/PrivacyMask';

export const FinancingCalculator: React.FC = () => {
  const { t } = useTranslation();
  const [invoiceValue, setInvoiceValue] = useState<number>(100000);
  const [riskScore, setRiskScore] = useState<number>(86);
  const [buyerReliability, setBuyerReliability] = useState<number>(92);
  const [paymentHistory, setPaymentHistory] = useState<number>(88);

  // Dynamic formula
  const compositeScore = Math.round(riskScore * 0.4 + buyerReliability * 0.35 + paymentHistory * 0.25);
  const financingRate = compositeScore >= 80 ? 0.85 : compositeScore >= 60 ? 0.70 : 0.50;
  const estimatedAmount = Math.round(invoiceValue * financingRate);
  const riskTier = compositeScore >= 80 ? 'LOW' : compositeScore >= 60 ? 'MEDIUM' : 'HIGH';

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-100">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900">{t('calculator.title')}</h3>
          <p className="text-xs text-slate-400">{t('calculator.subtitle')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Sliders Input Area */}
        <div className="lg:col-span-7 space-y-5">
          {/* Invoice Value */}
          <div>
            <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
              <span className="text-slate-700">{t('calculator.invoiceValue')}</span>
              <span className="font-bold text-brand-700 text-sm">
                ₹{invoiceValue.toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              min={25000}
              max={1000000}
              step={5000}
              value={invoiceValue}
              onChange={(e) => setInvoiceValue(Number(e.target.value))}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-brand-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-medium">
              <span>₹25,000</span>
              <span>₹5,00,000</span>
              <span>₹10,00,000</span>
            </div>
          </div>

          {/* Risk Score */}
          <div>
            <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
              <span className="text-slate-700">{t('calculator.riskScore')}</span>
              <span className="font-bold text-slate-900 text-sm">{riskScore} / 100</span>
            </div>
            <input
              type="range"
              min={30}
              max={100}
              value={riskScore}
              onChange={(e) => setRiskScore(Number(e.target.value))}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-brand-600"
            />
          </div>

          {/* Buyer Reliability */}
          <div>
            <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
              <span className="text-slate-700">{t('calculator.buyerReliability')}</span>
              <span className="font-bold text-slate-900 text-sm">{buyerReliability} / 100</span>
            </div>
            <input
              type="range"
              min={50}
              max={100}
              value={buyerReliability}
              onChange={(e) => setBuyerReliability(Number(e.target.value))}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
          </div>

          {/* Payment History */}
          <div>
            <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
              <span className="text-slate-700">{t('calculator.paymentHistory')}</span>
              <span className="font-bold text-slate-900 text-sm">{paymentHistory} / 100</span>
            </div>
            <input
              type="range"
              min={50}
              max={100}
              value={paymentHistory}
              onChange={(e) => setPaymentHistory(Number(e.target.value))}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>
        </div>

        {/* Dynamic Result Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-brand-900 via-slate-900 to-brand-950 text-white rounded-3xl p-6 sm:p-7 shadow-xl relative overflow-hidden flex flex-col justify-between h-full border border-brand-800/60">
          <div className="absolute top-0 right-0 w-36 h-36 bg-brand-500/10 rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-bold text-brand-300 uppercase tracking-wider">
                Instant Simulation
              </span>
              <span
                className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase ${
                  riskTier === 'LOW'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : riskTier === 'MEDIUM'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                }`}
              >
                {riskTier} RISK
              </span>
            </div>

            <div className="mb-4">
              <div className="text-xs text-slate-300 font-medium">{t('calculator.estimatedFinancing')}</div>
              <div className="text-3xl font-extrabold text-white tracking-tight mt-1 text-emerald-400">
                <PrivacyMask value={estimatedAmount} type="currency" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 py-3 border-t border-slate-800 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Advance Ratio</span>
                <span className="font-bold text-white text-sm">{(financingRate * 100).toFixed(0)}%</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Composite Rating</span>
                <span className="font-bold text-white text-sm">{compositeScore} / 100</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 text-[10px] text-slate-400 flex items-start gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
            <p className="leading-tight">{t('calculator.disclaimer')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
