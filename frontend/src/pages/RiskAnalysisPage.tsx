import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Sliders,
  Sparkles,
  Info,
  DollarSign,
  Layers,
  ArrowRight
} from 'lucide-react';
import { RiskScoreRing } from '../components/risk/RiskScoreRing';
import { ExplainableRiskCard } from '../components/risk/ExplainableRiskCard';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const RiskAnalysisPage: React.FC = () => {
  const { t } = useTranslation();
  const [invoiceAmount, setInvoiceAmount] = useState(100000);
  const [paymentDelay, setPaymentDelay] = useState(12);
  const [buyerReliability, setBuyerReliability] = useState(94);
  const [historicalInvoices, setHistoricalInvoices] = useState(12);

  // Dynamic score simulation
  const computedScore = Math.min(
    98,
    Math.max(35, Math.round(50 + (buyerReliability * 0.3) + (historicalInvoices * 1.5) - (paymentDelay * 0.6)))
  );

  const riskLevel = computedScore >= 80 ? 'LOW' : computedScore >= 60 ? 'MEDIUM' : 'HIGH';
  const advanceAmount = Math.round(invoiceAmount * (riskLevel === 'LOW' ? 0.85 : riskLevel === 'MEDIUM' ? 0.7 : 0.5));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-brand-900 via-brand-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg relative overflow-hidden">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-brand-700/80 border border-brand-500/40 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">
              Explainable AI Risk Engine
            </div>
            <h1 className="text-2xl font-extrabold">Underwriting Risk & Signal Analysis</h1>
            <p className="text-xs text-brand-200 mt-0.5">
              Transparent, data-driven credit readiness scoring built specifically for MSME invoice portfolios.
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Score Gauge + Signals Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Signal Inputs */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-brand-600" />
                Live Risk Signal Simulator
              </h3>
              <p className="text-xs text-slate-400">
                Adjust variables to see explainable impact on credit rating
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            {/* Input 1: Invoice Amount */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-bold text-slate-700">
                <span>Invoice Amount</span>
                <span className="text-brand-700 font-extrabold">₹{invoiceAmount.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="20000"
                max="500000"
                step="10000"
                value={invoiceAmount}
                onChange={(e) => setInvoiceAmount(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
              />
            </div>

            {/* Input 2: Buyer Payment Reliability */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-bold text-slate-700">
                <span>Buyer Reliability Score</span>
                <span className="text-emerald-600 font-extrabold">{buyerReliability}%</span>
              </div>
              <input
                type="range"
                min="40"
                max="100"
                value={buyerReliability}
                onChange={(e) => setBuyerReliability(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
            </div>

            {/* Input 3: Previous Successful Invoices */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-bold text-slate-700">
                <span>Completed Previous Invoices</span>
                <span className="text-brand-700 font-extrabold">{historicalInvoices} Invoices</span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                value={historicalInvoices}
                onChange={(e) => setHistoricalInvoices(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
              />
            </div>

            {/* Input 4: Average Payment Delay */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-bold text-slate-700">
                <span>Average Settlement Delay</span>
                <span className="text-amber-600 font-extrabold">{paymentDelay} Days</span>
              </div>
              <input
                type="range"
                min="0"
                max="45"
                value={paymentDelay}
                onChange={(e) => setPaymentDelay(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
              />
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-2.5 text-xs text-slate-500">
            <Info className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
            <p>
              <strong>Explainability Principle:</strong> Our prototype uses invoice and transaction signals to generate an explainable financing risk assessment.
            </p>
          </div>
        </div>

        {/* Right: Score Ring & Decision Box */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm flex flex-col items-center text-center space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              Computed Risk Profile
            </h3>

            <div className="relative w-40 h-40 flex items-center justify-center">
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
                  className={computedScore >= 80 ? 'text-emerald-500' : computedScore >= 60 ? 'text-amber-500' : 'text-rose-500'}
                  strokeWidth="9"
                  strokeDasharray={2 * Math.PI * 40}
                  animate={{ strokeDashoffset: (2 * Math.PI * 40) * (1 - computedScore / 100) }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-extrabold text-slate-900 leading-none">
                  {computedScore}
                </span>
                <span className="text-xs text-slate-400 font-semibold mt-1">/ 100</span>
                <span className={`text-[10px] font-bold uppercase tracking-wider mt-1 px-2 py-0.5 rounded-full ${
                  computedScore >= 80
                    ? 'bg-emerald-50 text-emerald-700'
                    : computedScore >= 60
                    ? 'bg-amber-50 text-amber-700'
                    : 'bg-rose-50 text-rose-700'
                }`}>
                  {riskLevel} RISK
                </span>
              </div>
            </div>

            <div className="w-full pt-4 border-t border-slate-100 grid grid-cols-2 gap-4 text-left text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Recommended Advance</span>
                <span className="text-base font-extrabold text-emerald-600">
                  ₹{advanceAmount.toLocaleString('en-IN')}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Advance Ratio</span>
                <span className="text-base font-extrabold text-brand-700">
                  {riskLevel === 'LOW' ? '85%' : riskLevel === 'MEDIUM' ? '70%' : '50%'}
                </span>
              </div>
            </div>

            <Link
              to="/pool"
              className="w-full py-3 px-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Bundle Invoices with this Score</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <ExplainableRiskCard
            positiveFactors={[
              'Strong buyer payment history with ABC Garments (38 successful settlements)',
              `${historicalInvoices} successful previous invoice clearings without dispute`,
              'Transaction values within normal regional operating bounds',
            ]}
            riskFactors={[
              paymentDelay > 10 ? `Slight settlement variance (${paymentDelay} day avg)` : 'Standard credit buffer apply',
            ]}
          />
        </div>
      </div>
    </div>
  );
};
