import React from 'react';
import { motion } from 'framer-motion';
import { FinancingRequest } from '../../types';
import { 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Zap, 
  Building2, 
  FileCheck,
  CreditCard,
  AlertCircle
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface FinancingStatusTimelineProps {
  request: FinancingRequest;
}

export const FinancingStatusTimeline: React.FC<FinancingStatusTimelineProps> = ({ request }) => {
  const { t } = useTranslation();

  const isApproved = request.status === 'APPROVED' || request.lenderDecision === 'APPROVED';
  const isRejected = request.status === 'REJECTED' || request.lenderDecision === 'REJECTED';

  const steps = [
    {
      id: 1,
      title: t('financing.requestSubmitted'),
      desc: 'Pool POOL-1001 packaged & cryptographic hash signed',
      status: 'completed',
      date: new Date(request.submittedAt).toLocaleDateString('en-IN'),
    },
    {
      id: 2,
      title: t('financing.underReview'),
      desc: 'Institutional partner risk algorithm clearance',
      status: isApproved || isRejected ? 'completed' : 'active',
      date: 'Same Day',
    },
    {
      id: 3,
      title: isRejected ? 'Financing Rejected' : t('financing.approved'),
      desc: isRejected
        ? `Lender reason: ${request.rejectionReason || 'Collateral threshold'}`
        : 'Approved advance issued at 80% collateral valuation',
      status: isApproved ? 'completed' : isRejected ? 'rejected' : 'pending',
      date: isApproved || isRejected ? 'Completed' : 'Pending',
    },
    {
      id: 4,
      title: t('financing.disbursementInitiated'),
      desc: isApproved
        ? `Direct RTGS/IMPS transfer ref: ${request.disbursementReference || 'DISB-TXN-884920'}`
        : 'Funds routed to linked current account upon sign-off',
      status: isApproved ? 'completed' : 'pending',
      date: isApproved ? 'Funds Dispatched' : 'Awaiting Approval',
    },
  ];

  return (
    <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-6">
      {/* Applicant & Pool Metadata Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white font-display">
                {request.msmeName}
              </h3>
              <span className="text-xs px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium">
                {request.industry}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Request ID: <span className="font-mono text-slate-200">{request.requestNumber}</span> • Location: {request.location}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Total Collateral Value</span>
            <div className="text-lg font-bold text-white font-display">
              ₹{request.invoiceValue.toLocaleString('en-IN')}
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Financing Advance</span>
            <div className="text-lg font-bold text-emerald-400 font-display">
              ₹{request.recommendedAmount.toLocaleString('en-IN')}
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Step Timeline */}
      <div className="space-y-4 pt-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
          Disbursement Execution Lifecycle
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          {steps.map((step, idx) => {
            const isDone = step.status === 'completed';
            const isActive = step.status === 'active';
            const isFail = step.status === 'rejected';

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15 }}
                className={`p-4 rounded-2xl border transition-all ${
                  isDone
                    ? 'bg-emerald-950/20 border-emerald-500/40 shadow-lg shadow-emerald-500/5'
                    : isActive
                    ? 'bg-blue-950/30 border-blue-500/50 shadow-lg shadow-blue-500/10'
                    : isFail
                    ? 'bg-rose-950/20 border-rose-500/40'
                    : 'bg-slate-900/40 border-slate-800 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold ${
                      isDone
                        ? 'bg-emerald-500 text-slate-950'
                        : isActive
                        ? 'bg-blue-500 text-white animate-pulse'
                        : isFail
                        ? 'bg-rose-500 text-white'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {isDone ? <CheckCircle2 className="w-4 h-4" /> : isFail ? <AlertCircle className="w-4 h-4" /> : step.id}
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">
                    {step.date}
                  </span>
                </div>

                <h5 className="text-xs font-bold text-white mb-1">
                  {step.title}
                </h5>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Success Callout if Approved */}
      {isApproved && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/50 via-teal-950/50 to-slate-900/80 border border-emerald-500/40 flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                {t('financing.disbursementStatus')}
              </span>
              <p className="text-xs text-slate-200">
                {t('financing.successMessage')}
              </p>
            </div>
          </div>

          <div className="text-right hidden sm:block">
            <span className="text-[10px] text-slate-400 font-mono block">Txn Reference</span>
            <span className="text-xs font-mono font-bold text-cyan-300">
              {request.disbursementReference || 'DISB-TXN-884920'}
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
};
