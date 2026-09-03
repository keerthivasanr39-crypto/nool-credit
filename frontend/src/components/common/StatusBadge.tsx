import React from 'react';
import { CheckCircle2, Clock, AlertTriangle, XCircle, ArrowUpRight, ShieldAlert, Sparkles } from 'lucide-react';
import { RiskLevel, VerificationStatus, FinancingStatus } from '../../types';

interface StatusBadgeProps {
  status: string;
  variant?: 'risk' | 'verification' | 'financing' | 'auto';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, variant = 'auto', className = '' }) => {
  const norm = status.toUpperCase().replace(/\s+/g, '_');

  // Low Risk / Verified / Approved / Disbursement
  if (['LOW', 'LOW_RISK', 'VERIFIED', 'APPROVED', 'DISBURSEMENT_INITIATED', 'COMPLETED'].includes(norm)) {
    let label = status;
    if (norm === 'LOW' || norm === 'LOW_RISK') label = 'LOW RISK';
    if (norm === 'VERIFIED') label = 'VERIFIED ✓';
    if (norm === 'APPROVED') label = 'APPROVED ✓';
    if (norm === 'DISBURSEMENT_INITIATED') label = 'DISBURSEMENT INITIATED';

    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80 shadow-xs ${className}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
        {label}
      </span>
    );
  }

  // Medium Risk / Pending / Under Review / Requires Review
  if (['MEDIUM', 'MEDIUM_RISK', 'PENDING', 'UNDER_REVIEW', 'REQUIRES_REVIEW', 'EXTRACTING', 'VERIFYING'].includes(norm)) {
    let label = status;
    if (norm === 'MEDIUM' || norm === 'MEDIUM_RISK') label = 'MEDIUM RISK';
    if (norm === 'PENDING') label = 'PENDING';
    if (norm === 'UNDER_REVIEW') label = 'UNDER REVIEW';
    if (norm === 'REQUIRES_REVIEW') label = 'REQUIRES REVIEW ⚠';
    if (norm === 'VERIFYING') label = 'VERIFYING...';

    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200/80 shadow-xs ${className}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
        <Clock className="w-3.5 h-3.5 text-amber-600" />
        {label}
      </span>
    );
  }

  // High Risk / Rejected / Failed
  if (['HIGH', 'HIGH_RISK', 'REJECTED', 'FAILED'].includes(norm)) {
    let label = status;
    if (norm === 'HIGH' || norm === 'HIGH_RISK') label = 'HIGH RISK';
    if (norm === 'REJECTED') label = 'REJECTED';
    if (norm === 'FAILED') label = 'FAILED';

    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200/80 shadow-xs ${className}`}>
        <XCircle className="w-3.5 h-3.5 text-rose-600" />
        {label}
      </span>
    );
  }

  // Default neutral
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200 ${className}`}>
      {status}
    </span>
  );
};
