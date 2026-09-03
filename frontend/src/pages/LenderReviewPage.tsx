import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Building,
  Boxes,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText,
  DollarSign,
  ArrowRight,
  Sparkles,
  ChevronLeft
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/common/StatusBadge';
import { ExplainableRiskCard } from '../components/risk/ExplainableRiskCard';
import { BrandedLoader } from '../components/common/BrandedLoader';
import { PrivacyMask } from '../components/common/PrivacyMask';

export const LenderReviewPage: React.FC = () => {
  const { t } = useTranslation();
  const { requests, approveRequest, rejectRequest, initiateDisbursement } = useApp();
  const navigate = useNavigate();

  const [selectedRequest, setSelectedRequest] = useState(requests[0] || null);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('Additional documents required. Buyer payment history requires further review.');
  const [isProcessing, setIsProcessing] = useState(false);
  const [approvalStage, setApprovalStage] = useState<'IDLE' | 'PROCESSING' | 'VALIDATING' | 'APPROVED'>('IDLE');

  const handleApprove = async () => {
    setIsProcessing(true);
    setApprovalStage('PROCESSING');

    setTimeout(() => {
      setApprovalStage('VALIDATING');
      setTimeout(async () => {
        const approved = await approveRequest(selectedRequest.id);
        await initiateDisbursement(selectedRequest.id);
        setApprovalStage('APPROVED');
        setIsProcessing(false);

        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }, 1000);
    }, 1000);
  };

  const handleReject = async () => {
    if (!rejectionReason) return;
    await rejectRequest(selectedRequest.id, rejectionReason);
    setShowRejectModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            to="/lender"
            className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 shadow-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">{t('lender.reviewRequest')}</h1>
            <p className="text-xs text-slate-500">
              Institutional credit decisioning for structured MSME invoice pools
            </p>
          </div>
        </div>
      </div>

      {/* Main Review Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Applicant Profile & Pool Breakdown */}
        <div className="lg:col-span-7 space-y-6">
          {/* MSME Profile Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center font-bold">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{selectedRequest.msmeName}</h3>
                  <p className="text-[11px] text-slate-400">Tiruppur, Tamil Nadu • MSME Reg: UDYAM-TN-30-0012345</p>
                </div>
              </div>
              <StatusBadge status="VERIFIED" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Sector</span>
                <span className="font-bold text-slate-800">Textile Job Work</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">GST Compliance</span>
                <span className="font-bold text-emerald-600">100% On-time</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Platform Track Record</span>
                <span className="font-bold text-brand-700">12 Months (0 Defaults)</span>
              </div>
            </div>
          </div>

          {/* Invoice Pool Details */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
                  <Boxes className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{selectedRequest.poolNumber}</h3>
                  <p className="text-[11px] text-slate-400">3 Verified Institutional Invoices</p>
                </div>
              </div>
              <span className="text-xs font-bold text-slate-900">
                Total: <PrivacyMask value={selectedRequest.invoiceValue} type="currency" />
              </span>
            </div>

            <div className="space-y-2">
              {[
                { no: 'INV-1001', buyer: 'ABC Garments Ltd', val: 60000, score: 88 },
                { no: 'INV-1002', buyer: 'Royal Exports India', val: 80000, score: 82 },
                { no: 'INV-1003', buyer: 'Chennai Weaving Mills', val: 120000, score: 79 }
              ].map((inv, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-brand-600" />
                    <div>
                      <span className="font-bold text-slate-800">{inv.no}</span>
                      <span className="text-[10px] text-slate-400 ml-2">{inv.buyer}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-slate-900">₹{inv.val.toLocaleString('en-IN')}</span>
                    <span className="text-[10px] font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full">
                      Score: {inv.score}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Explainable Risk Details */}
          <ExplainableRiskCard
            positiveFactors={selectedRequest.positiveFactors}
            riskFactors={selectedRequest.riskFactors}
          />
        </div>

        {/* Right: Decision Panel & Action Buttons */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Lender Recommendation
              </span>
              <h3 className="text-base font-extrabold text-slate-900">Financing Approval Box</h3>
            </div>
            <StatusBadge status={selectedRequest.status} />
          </div>

          {/* Key Metrics summary */}
          <div className="p-5 rounded-3xl bg-slate-50 border border-slate-100 space-y-3 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Requested Capital</span>
              <span className="font-bold text-slate-900">
                <PrivacyMask value={selectedRequest.requestedAmount} type="currency" />
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Recommended Advance (80%)</span>
              <span className="font-extrabold text-emerald-600 text-sm">
                <PrivacyMask value={selectedRequest.recommendedAmount} type="currency" />
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Weighted Risk Rating</span>
              <span className="font-bold text-brand-700">{selectedRequest.riskScore} / 100 (LOW)</span>
            </div>
          </div>

          {/* Decision Trigger Buttons */}
          {selectedRequest.status === 'APPROVED' || selectedRequest.status === 'DISBURSEMENT_INITIATED' ? (
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-emerald-800 text-sm">Financing Approved & Disbursed</h4>
              <p className="text-xs text-emerald-700">
                Funds initiated to Sri Lakshmi Knits HDFC Bank account (Ref: TXN-9948210).
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <button
                onClick={() => setShowApproveModal(true)}
                className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{t('lender.approveBtn')} (₹2,08,000)</span>
              </button>

              <button
                onClick={() => setShowRejectModal(true)}
                className="w-full py-3 px-4 rounded-2xl bg-white hover:bg-rose-50 border border-rose-200 text-rose-700 font-bold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <XCircle className="w-4 h-4" />
                <span>{t('lender.rejectBtn')}</span>
              </button>
            </div>
          )}

          <div className="text-[10px] text-slate-400 leading-normal text-center">
            {t('common.prototypeNotice')}
          </div>
        </div>
      </div>

      {/* Approval Modal */}
      <AnimatePresence>
        {showApproveModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 shadow-2xl text-center space-y-4"
            >
              {approvalStage === 'IDLE' ? (
                <>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{t('lender.confirmApproval')}</h3>
                  <p className="text-xs text-slate-500">
                    Approve financing of <span className="font-bold text-slate-800">₹2,08,000</span> for Sri Lakshmi Knits (POOL-1001)?
                  </p>
                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      onClick={() => setShowApproveModal(false)}
                      className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                    >
                      {t('common.cancel')}
                    </button>
                    <button
                      onClick={handleApprove}
                      className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md"
                    >
                      Confirm & Disburse Capital
                    </button>
                  </div>
                </>
              ) : approvalStage !== 'APPROVED' ? (
                <BrandedLoader
                  stage="LENDER_REVIEW"
                  message="Validating institutional signature & initiating disbursement..."
                />
              ) : (
                <div className="py-4 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-emerald-800">{t('lender.approvalSuccess')}</h3>
                  <p className="text-xs text-slate-600">
                    Disbursement initiated to Sri Lakshmi Knits.
                  </p>
                  <button
                    onClick={() => setShowApproveModal(false)}
                    className="px-5 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl mt-2"
                  >
                    Done
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Reject Modal */}
      <AnimatePresence>
        {showRejectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 shadow-2xl space-y-4 text-left"
            >
              <h3 className="text-base font-bold text-slate-900">{t('lender.rejectBtn')}</h3>
              <p className="text-xs text-slate-500">
                {t('lender.rejectionReasonPrompt')}
              </p>

              <select
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50"
              >
                <option value="Additional documents required. Buyer payment history requires further review.">
                  Additional documents required / Buyer payment review
                </option>
                <option value="Invoice information could not be fully verified against GST portal.">
                  Invoice verification mismatch with GST
                </option>
                <option value="Concentration risk with single buyer exceeds threshold.">
                  Buyer concentration risk exceeds limit
                </option>
              </select>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowRejectModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  {t('common.cancel')}
                </button>
                <button
                  onClick={handleReject}
                  className="px-5 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-md"
                >
                  Submit Rejection Notice
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
