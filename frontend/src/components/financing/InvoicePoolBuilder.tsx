import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDemoData } from '../../context/DemoDataContext';
import { 
  Layers, 
  Plus, 
  Trash2, 
  ShieldCheck, 
  ArrowRight, 
  TrendingUp, 
  CheckCircle2,
  Building2,
  Sparkles
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const InvoicePoolBuilder: React.FC = () => {
  const { invoices, createPool, submitFinancingRequest } = useDemoData();
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Default pre-select INV-1001, INV-1002, INV-1003 for the hackathon showcase
  const [selectedInvoiceIds, setSelectedInvoiceIds] = useState<string[]>([
    'inv-1001',
    'inv-1002',
    'inv-1003',
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const toggleSelect = (id: string) => {
    setSelectedInvoiceIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectedInvoices = invoices.filter((i) => selectedInvoiceIds.includes(i.id));

  // Calculations
  const totalValue = selectedInvoices.reduce((sum, i) => sum + i.invoiceAmount, 0);
  const weightedScoreSum = selectedInvoices.reduce(
    (sum, i) => sum + i.riskScore * i.invoiceAmount,
    0
  );
  const weightedRiskScore = totalValue > 0 ? Math.round(weightedScoreSum / totalValue) : 0;
  const riskLevel = weightedRiskScore >= 80 ? 'LOW' : weightedRiskScore >= 60 ? 'MEDIUM' : 'HIGH';
  const bundleFinancingRate = riskLevel === 'LOW' ? 0.80 : riskLevel === 'MEDIUM' ? 0.65 : 0.40;
  const eligibleFinancing = Math.round(totalValue * bundleFinancingRate);

  const handleCreateAndSubmit = async () => {
    if (selectedInvoiceIds.length === 0) return;
    setIsSubmitting(true);

    const pool = await createPool(selectedInvoiceIds);
    await submitFinancingRequest(pool.id);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionSuccess(true);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white font-display flex items-center gap-2">
            <Layers className="w-6 h-6 text-blue-400" />
            {t('pool.title')}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {t('pool.subtitle')}
          </p>
        </div>

        <button
          onClick={() => setSelectedInvoiceIds(['inv-1001', 'inv-1002', 'inv-1003'])}
          className="px-3 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-400 text-xs font-semibold flex items-center gap-1.5 transition-all"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Select Demo Bundle (₹2.60L Pool)</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Available Invoices Selection */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              {t('pool.availableInvoices')} ({invoices.length})
            </h3>
            <span className="text-[11px] text-slate-400">
              Click cards to add/remove from pool
            </span>
          </div>

          <div className="space-y-2.5 max-h-[520px] overflow-y-auto pr-1">
            {invoices.map((inv) => {
              const isSelected = selectedInvoiceIds.includes(inv.id);
              return (
                <motion.div
                  key={inv.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => toggleSelect(inv.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-blue-950/40 border-blue-500/60 shadow-md shadow-blue-500/10'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-lg flex items-center justify-center border transition-colors ${
                        isSelected
                          ? 'bg-blue-600 border-blue-500 text-white'
                          : 'border-slate-700 bg-slate-800 text-transparent'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white font-mono text-xs">
                          {inv.invoiceNumber}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                          Score: {inv.riskScore}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400 block">
                        {inv.buyerName} • Due: {inv.dueDate}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-bold text-white font-display">
                      ₹{inv.invoiceAmount.toLocaleString('en-IN')}
                    </span>
                    <span className="block text-[10px] text-cyan-400">
                      Eligible: ₹{inv.eligibleFinancing.toLocaleString('en-IN')}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Visual Collateral Pool Tray */}
        <div className="lg:col-span-6">
          <div className="glass-card p-6 rounded-2xl border border-blue-500/30 sticky top-24 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white font-display">
                    {t('pool.selectedPool')} (POOL-1001)
                  </h3>
                  <span className="text-xs text-slate-400">
                    {selectedInvoices.length} Invoices Bundled
                  </span>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold">
                {riskLevel} RISK POOL
              </span>
            </div>

            {/* Pooled Invoices Pill Tray */}
            <div className="space-y-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Collateral Bundle Contents
              </span>
              <div className="min-h-[100px] p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-wrap gap-2 items-center">
                <AnimatePresence>
                  {selectedInvoices.length === 0 ? (
                    <span className="text-xs text-slate-500 italic mx-auto">
                      {t('pool.noInvoicesSelected')}
                    </span>
                  ) : (
                    selectedInvoices.map((inv) => (
                      <motion.span
                        key={inv.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-900/40 border border-blue-500/40 text-xs text-slate-200"
                      >
                        <span className="font-mono font-bold text-white">{inv.invoiceNumber}</span>
                        <span className="text-cyan-300 font-semibold">₹{inv.invoiceAmount.toLocaleString('en-IN')}</span>
                        <button
                          onClick={() => toggleSelect(inv.id)}
                          className="hover:text-rose-400 transition-colors ml-1"
                        >
                          <Trash2 className="w-3 h-3 text-slate-400 hover:text-rose-400" />
                        </button>
                      </motion.span>
                    ))
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Live Financial Metrics */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] uppercase font-semibold text-slate-400 block">
                  {t('pool.totalValue')}
                </span>
                <span className="text-xl font-bold text-white font-display">
                  ₹{totalValue.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] uppercase font-semibold text-slate-400 block">
                  {t('pool.weightedScore')}
                </span>
                <span className="text-xl font-bold text-emerald-400 font-display">
                  {weightedRiskScore} <span className="text-xs text-slate-400 font-normal">/100</span>
                </span>
              </div>
            </div>

            {/* Financing Advance Highlight */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-blue-900/50 to-cyan-900/50 border border-blue-500/40 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium">{t('pool.eligibleFinancing')} (80% Advance)</span>
                <span className="text-emerald-400 font-bold">Approved Baseline</span>
              </div>
              <div className="text-2xl font-black text-white font-display">
                ₹{eligibleFinancing.toLocaleString('en-IN')}
              </div>
              <p className="text-[11px] text-slate-300">
                Institutional lenders disburse within 24 hours of digital verification.
              </p>
            </div>

            {/* Submit CTA */}
            {submissionSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-2"
              >
                <div className="flex items-center justify-center gap-2 text-emerald-400 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Financing Request Submitted Successfully!</span>
                </div>
                <p className="text-xs text-slate-300">
                  Pool POOL-1001 is now under review by institutional lenders.
                </p>
                <button
                  onClick={() => navigate('/msme/financing')}
                  className="w-full mt-2 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition-all"
                >
                  Track Financing Status Timeline
                </button>
              </motion.div>
            ) : (
              <button
                onClick={handleCreateAndSubmit}
                disabled={selectedInvoiceIds.length === 0 || isSubmitting}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:opacity-50 text-white font-bold text-xs shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all"
              >
                {isSubmitting ? (
                  <span>Submitting Collateral Pool to Lenders...</span>
                ) : (
                  <>
                    <span>{t('pool.submitFinancingBtn')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
