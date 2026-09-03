import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { useDemoData } from '../../context/DemoDataContext';
import { CircularRiskScore } from '../../components/animations/CircularRiskScore';
import { triggerProfessionalConfetti } from '../../components/animations/ConfettiSuccess';
import { 
  ShieldCheck, 
  Building2, 
  Layers, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  ArrowLeft, 
  Zap, 
  X, 
  FileText,
  Clock,
  Sparkles,
  Check
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const LenderReviewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { financingRequests, pools, invoices, approveFinancingRequest, rejectFinancingRequest } = useDemoData();
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Find request or fallback to initial demo request
  const request = financingRequests.find((r) => r.id === id) || financingRequests[0];
  const pool = pools.find((p) => p.id === request.poolId) || pools[0];
  const poolInvoices = invoices.filter((i) => pool.invoiceIds?.includes(i.id));

  const [approvalModalOpen, setApprovalModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('Collateral risk threshold exceeded');
  const [approvalStep, setApprovalStep] = useState<number>(0); 
  // 0: confirm, 1: processing, 2: validating, 3: approved success

  const handleApprove = async () => {
    setApprovalStep(1); // Processing

    setTimeout(() => {
      setApprovalStep(2); // Validating
    }, 800);

    setTimeout(async () => {
      await approveFinancingRequest(request.id);
      setApprovalStep(3); // Approved
      triggerProfessionalConfetti();
    }, 1800);
  };

  const handleReject = async () => {
    await rejectFinancingRequest(request.id, rejectReason);
    setRejectModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <button
          onClick={() => navigate('/lender/dashboard')}
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Lender Dashboard</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setRejectModalOpen(true)}
            disabled={request.status === 'APPROVED'}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-rose-950/40 text-slate-300 hover:text-rose-400 border border-slate-700 hover:border-rose-500/40 text-xs font-bold transition-all disabled:opacity-40"
          >
            {t('lender.rejectBtn')}
          </button>

          <button
            onClick={() => {
              setApprovalStep(0);
              setApprovalModalOpen(true);
            }}
            disabled={request.status === 'APPROVED'}
            className="px-6 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-500/25 flex items-center gap-2 transition-all hover:scale-105 disabled:opacity-50"
          >
            <Check className="w-4 h-4" />
            <span>{request.status === 'APPROVED' ? 'FINANCING APPROVED' : t('lender.approveBtn')}</span>
          </button>
        </div>
      </div>

      {/* Main Underwriting Dossier Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: MSME Profile & Invoice Pool Breakdown */}
        <div className="lg:col-span-7 space-y-6">
          {/* MSME Profile Card */}
          <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-blue-400" />
                {t('lender.msmeProfile')}
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                GST Compliant & Active
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Business Entity</span>
                <span className="text-base font-bold text-white font-display">{request.msmeName}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Industry & Cluster</span>
                <span className="text-xs font-medium text-slate-200">{request.industry} • {request.location}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Operational Track Record</span>
                <span className="text-xs font-medium text-slate-200">7+ Years in Textile Manufacturing</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Underwriting SLA</span>
                <span className="text-xs font-medium text-cyan-300">Fast-Track 24hr Window</span>
              </div>
            </div>
          </div>

          {/* Invoice Pool Details Card */}
          <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-cyan-400" />
                {t('lender.invoicePoolDetails')} ({request.poolNumber})
              </span>
              <span className="text-xs text-slate-300 font-mono">
                {poolInvoices.length || 3} Verified Invoices
              </span>
            </div>

            <div className="space-y-2">
              {(poolInvoices.length > 0 ? poolInvoices : invoices.slice(0, 3)).map((inv) => (
                <div
                  key={inv.id}
                  className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-600/10 text-blue-400 border border-blue-500/20">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-mono font-bold text-white">{inv.invoiceNumber}</div>
                      <span className="text-[10px] text-slate-400">{inv.buyerName} • Due: {inv.dueDate}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-bold text-white font-display">₹{inv.invoiceAmount.toLocaleString('en-IN')}</span>
                    <span className="block text-[10px] text-emerald-400">Score: {inv.riskScore}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Total Collateral Pool Valuation:</span>
              <span className="text-lg font-bold text-white font-display">
                ₹{request.invoiceValue.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Risk Analysis & Financing Recommendation */}
        <div className="lg:col-span-5 space-y-6">
          {/* Risk Analysis Card */}
          <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                {t('lender.riskAnalysis')}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                {request.riskLevel} RISK
              </span>
            </div>

            <div className="flex flex-col items-center">
              <CircularRiskScore score={request.riskScore} riskLevel={request.riskLevel} size={150} />
            </div>

            <div className="space-y-3 pt-2 text-xs">
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold uppercase text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Underwriting Merits (Positive Factors)
                </span>
                <ul className="space-y-1 text-slate-300 pl-4 list-disc text-[11px]">
                  {request.positiveDrivers.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-800">
                <span className="text-[11px] font-bold uppercase text-amber-400 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Identified Risk Drivers
                </span>
                <ul className="space-y-1 text-slate-300 pl-4 list-disc text-[11px]">
                  {request.riskDrivers.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Financing Recommendation Action Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-teal-950/40 to-slate-900/90 border border-emerald-500/40 space-y-4">
            <div>
              <span className="text-[10px] text-emerald-400 uppercase font-semibold block">
                {t('lender.financingRecommendation')}
              </span>
              <div className="text-3xl font-extrabold text-white font-display mt-0.5">
                ₹{request.recommendedAmount.toLocaleString('en-IN')}
              </div>
              <span className="text-xs text-slate-300">
                80% Advance against ₹{request.invoiceValue.toLocaleString('en-IN')} pool
              </span>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setApprovalStep(0);
                  setApprovalModalOpen(true);
                }}
                disabled={request.status === 'APPROVED'}
                className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
              >
                <Check className="w-4 h-4" />
                <span>{request.status === 'APPROVED' ? 'FINANCING ALREADY APPROVED' : 'APPROVE & INITIATE DISBURSEMENT'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* APPROVAL MODAL WITH MULTI-STAGE ANIMATION */}
      <AnimatePresence>
        {approvalModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md p-6 rounded-3xl glass-card border border-emerald-500/40 shadow-2xl relative space-y-6"
            >
              {approvalStep === 0 && (
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div className="text-center space-y-1">
                    <h3 className="text-lg font-bold text-white font-display">
                      {t('lender.approveModalTitle')}
                    </h3>
                    <p className="text-xs text-slate-300">
                      {t('lender.confirmApproveDesc')}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Applicant:</span>
                      <span className="font-bold text-white">{request.msmeName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Invoice Pool:</span>
                      <span className="font-mono text-cyan-300">{request.poolNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Disbursement Amount:</span>
                      <span className="font-bold text-emerald-400 font-display">₹{request.recommendedAmount.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={() => setApprovalModalOpen(false)}
                      className="flex-1 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleApprove}
                      className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-500/30"
                    >
                      Confirm Approval
                    </button>
                  </div>
                </div>
              )}

              {approvalStep > 0 && approvalStep < 3 && (
                <div className="py-8 text-center space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-cyan-400 p-0.5 mx-auto animate-spin">
                    <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                      <Zap className="w-6 h-6 text-emerald-400 animate-pulse" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white font-display">
                      {approvalStep === 1 ? t('lender.processingDecision') : t('lender.validatingRequest')}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Generating immutable cryptographic disbursement mandate
                    </p>
                  </div>
                </div>
              )}

              {approvalStep === 3 && (
                <div className="text-center space-y-4 py-2">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto scale-110 transition-transform">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white font-display">
                      ✓ {t('lender.decisionApproved')}
                    </h3>
                    <div className="text-2xl font-black text-emerald-400 font-display mt-1">
                      ₹{request.recommendedAmount.toLocaleString('en-IN')}
                    </div>
                    <p className="text-xs text-emerald-300 font-medium mt-1">
                      STATUS: DISBURSEMENT INITIATED
                    </p>
                  </div>

                  <p className="text-xs text-slate-400">
                    Disbursement notification dispatched to Sri Lakshmi Knits.
                  </p>

                  <div className="flex flex-col gap-2 pt-2">
                    <button
                      onClick={() => {
                        setApprovalModalOpen(false);
                        navigate('/msme/financing');
                      }}
                      className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg transition-all"
                    >
                      Switch to MSME View (See Updated Status)
                    </button>
                    <button
                      onClick={() => setApprovalModalOpen(false)}
                      className="w-full py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* REJECT MODAL */}
      <AnimatePresence>
        {rejectModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md p-6 rounded-3xl glass-card border border-rose-500/40 shadow-2xl relative space-y-4"
            >
              <div className="text-center space-y-1">
                <h3 className="text-base font-bold text-white font-display">
                  {t('lender.rejectModalTitle')}
                </h3>
                <p className="text-xs text-slate-400">
                  Select or specify feedback reason for applicant
                </p>
              </div>

              <div className="space-y-2">
                {[
                  'Collateral risk threshold exceeded',
                  'Buyer payment delay exceeds institutional limits',
                  'Additional GST invoice verification required',
                  'High concentration in single buyer',
                ].map((reason, idx) => (
                  <button
                    key={idx}
                    onClick={() => setRejectReason(reason)}
                    className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all ${
                      rejectReason === reason
                        ? 'bg-rose-500/20 border-rose-500/40 text-rose-300 font-semibold'
                        : 'bg-slate-900 border-slate-800 text-slate-300'
                    }`}
                  >
                    {reason}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setRejectModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReject}
                  className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold"
                >
                  Confirm Rejection
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
