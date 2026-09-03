import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Boxes,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  FileText,
  TrendingUp,
  Layers,
  Building,
  Clock,
  Coins
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useTranslation } from 'react-i18next';
import { useApp } from '../../context/AppContext';
import { Invoice } from '../../types';
import { InvoiceTable } from '../invoice/InvoiceTable';
import { StatusBadge } from '../common/StatusBadge';
import { PrivacyMask } from '../common/PrivacyMask';

export const InvoicePoolBundler: React.FC = () => {
  const { t } = useTranslation();
  const { invoices, createPool, submitFinancingRequest } = useApp();
  
  // Default selected invoices: ₹60,000, ₹80,000, ₹1,20,000
  const [selectedIds, setSelectedIds] = useState<string[]>(['inv-1001', 'inv-1002', 'inv-1003']);
  const [isBundling, setIsBundling] = useState(false);
  const [animationStage, setAnimationStage] = useState<'IDLE' | 'CONVERGING' | 'POOL_CREATED' | 'SUBMITTED'>('IDLE');
  const [submittedRequest, setSubmittedRequest] = useState<any>(null);

  const availableInvoices = invoices.filter((inv) => inv.verificationStatus === 'VERIFIED');
  const selectedInvoices = availableInvoices.filter((inv) => selectedIds.includes(inv.id));

  const totalValue = selectedInvoices.reduce((acc, inv) => acc + inv.invoiceAmount, 0) || 260000;
  const weightedScore =
    selectedInvoices.length > 0
      ? Math.round(
          selectedInvoices.reduce((acc, inv) => acc + inv.riskScore * inv.invoiceAmount, 0) /
            (totalValue || 1)
        )
      : 82;
  const riskLevel = weightedScore >= 80 ? 'LOW' : weightedScore >= 60 ? 'MEDIUM' : 'HIGH';
  const eligibleAmount = Math.round(totalValue * 0.8); // 80% advance = ₹2,08,000

  const handleToggle = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (select: boolean) => {
    if (select) {
      setSelectedIds(availableInvoices.map((inv) => inv.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleCreateAndSubmitPool = async () => {
    if (selectedIds.length === 0) return;
    setIsBundling(true);
    setAnimationStage('CONVERGING');

    setTimeout(async () => {
      setAnimationStage('POOL_CREATED');
      try {
        const createdPool = await createPool(selectedIds);
        
        setTimeout(async () => {
          const req = await submitFinancingRequest(createdPool.id, eligibleAmount);
          setSubmittedRequest(req);
          setAnimationStage('SUBMITTED');
          setIsBundling(false);

          confetti({
            particleCount: 90,
            spread: 70,
            origin: { y: 0.6 }
          });
        }, 1200);
      } catch (e) {
        console.error(e);
        setIsBundling(false);
      }
    }, 1500);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Banner Overview */}
      <div className="bg-gradient-to-r from-brand-900 via-brand-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg relative overflow-hidden">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-brand-700/80 border border-brand-500/40 flex items-center justify-center">
            <Boxes className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">
              Nool Core Innovation • Smart Bundling
            </div>
            <h1 className="text-2xl font-extrabold">Invoice Bundling & Pool Structuring</h1>
            <p className="text-xs text-brand-200 mt-0.5">
              Combine smaller pending job-work invoices into a diversified, institution-grade financing pool.
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Selection Table vs Live Bundle Preview & WOW Convergence */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Available Invoices Selection */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <FileText className="w-4 h-4 text-brand-600" />
              Eligible Invoices for Pooling ({selectedInvoices.length} selected)
            </h3>
            <span className="text-xs text-brand-600 font-semibold">
              Select 2 or more to bundle
            </span>
          </div>

          <InvoiceTable
            invoices={availableInvoices}
            selectable
            selectedIds={selectedIds}
            onSelectToggle={handleToggle}
            onSelectAll={handleSelectAll}
          />
        </div>

        {/* Right: Live Pool Bundler Box & Convergence Animation */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-md space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">SELECTED INVOICE POOL</h3>
              <p className="text-[11px] text-slate-400">Structured Financing Package</p>
            </div>
            <StatusBadge status={riskLevel} />
          </div>

          {/* WOW ANIMATION ZONE: Invoices converging into pool */}
          <div className="p-5 rounded-3xl bg-slate-50 border border-slate-100 relative overflow-hidden min-h-[160px] flex flex-col justify-center">
            {animationStage === 'CONVERGING' ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-4 text-center space-y-3"
              >
                <div className="flex items-center justify-center gap-2">
                  <motion.div
                    animate={{ x: [0, 40, 0], scale: [1, 0.8, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="p-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
                  >
                    Inv A
                  </motion.div>
                  <span className="text-slate-400 font-bold">→</span>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="p-3 bg-brand-700 text-white rounded-2xl shadow-lg font-extrabold text-xs"
                  >
                    INVOICE POOL
                  </motion.div>
                  <span className="text-slate-400 font-bold">→</span>
                  <motion.div
                    animate={{ x: [0, -40, 0], scale: [1, 0.8, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="p-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
                  >
                    Inv B
                  </motion.div>
                </div>
                <div className="text-xs font-bold text-brand-800 animate-pulse">
                  ✨ Bundling Selected Invoices Into Structured Pool...
                </div>
              </motion.div>
            ) : (
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-medium">Bundled Invoices</span>
                  <span className="font-bold text-slate-800">{selectedInvoices.length} Invoices</span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-medium">Total Pool Value</span>
                  <span className="font-extrabold text-slate-900 text-sm">
                    <PrivacyMask value={totalValue} type="currency" />
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-medium">Pool Risk Score</span>
                  <span className="font-extrabold text-brand-700 text-sm">{weightedScore} / 100 ({riskLevel})</span>
                </div>

                <div className="pt-3 border-t border-slate-200 flex justify-between items-center text-xs">
                  <span className="text-slate-700 font-bold">ELIGIBLE FINANCING (80%)</span>
                  <span className="font-extrabold text-emerald-600 text-base">
                    <PrivacyMask value={eligibleAmount} type="currency" />
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Action Trigger Button */}
          {animationStage === 'SUBMITTED' ? (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm">✓ REQUEST SUCCESSFULLY SUBMITTED</h4>
                <p className="text-[11px] text-emerald-700 mt-0.5">
                  Your financing request <span className="font-bold">{submittedRequest?.requestNumber || 'REQ-2026-089'}</span> has been sent for lender review.
                </p>
              </div>

              {/* 5-Step Progress Tracker */}
              <div className="pt-2 border-t border-emerald-200/60 text-left space-y-1.5 text-[11px]">
                <div className="font-bold text-emerald-900 mb-1">Estimated Processing Stages:</div>
                <div className="flex items-center gap-2 text-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>1. Invoice Verification (Completed)</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>2. Risk Assessment (Completed - 82/100)</span>
                </div>
                <div className="flex items-center gap-2 text-amber-700 font-bold">
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-amber-600 border-t-transparent animate-spin" />
                  <span>3. Lender Review (In Progress with Apex Capital)</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <div className="w-3.5 h-3.5 rounded-full border border-slate-300" />
                  <span>4. Approval Decision</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <div className="w-3.5 h-3.5 rounded-full border border-slate-300" />
                  <span>5. Financing Status & Disbursement</span>
                </div>
              </div>
            </div>
          ) : (
            <button
              disabled={selectedInvoices.length === 0 || isBundling}
              onClick={handleCreateAndSubmitPool}
              className={`w-full py-3.5 px-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all ${
                selectedInvoices.length === 0 || isBundling
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-brand-600 hover:bg-brand-700 text-white hover:shadow-lg hover:scale-[1.01]'
              }`}
            >
              {isBundling ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  Generating Pool & Submitting Request...
                </span>
              ) : (
                <>
                  <span>CREATE FINANCING REQUEST (₹{eligibleAmount.toLocaleString('en-IN')})</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
