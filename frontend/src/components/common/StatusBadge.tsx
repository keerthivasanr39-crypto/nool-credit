import React from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, Clock, AlertTriangle, XCircle, ArrowUpRight, ShieldAlert, Sparkles } from 'lucide-react';
import { RiskLevel, VerificationStatus, FinancingStatus } from '../../types';

interface StatusBadgeProps {
  status: string;
  variant?: 'risk' | 'verification' | 'financing' | 'auto';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, variant = 'auto', className = '' }) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith('ta') ? 'ta' : i18n.language?.startsWith('hi') ? 'hi' : 'en';

  const norm = status.toUpperCase().replace(/\s+/g, '_');

  const BADGE_TRANSLATIONS: Record<string, Record<string, string>> = {
    LOW_RISK: { en: 'LOW RISK', ta: 'குறைந்த இடர்', hi: 'कम जोखिम' },
    VERIFIED: { en: 'VERIFIED ✓', ta: 'சரிபார்க்கப்பட்டது ✓', hi: 'सत्यापित ✓' },
    APPROVED: { en: 'APPROVED ✓', ta: 'ஒப்புதல் ✓', hi: 'स्वीकृत ✓' },
    DISBURSEMENT_INITIATED: { en: 'DISBURSED', ta: 'வழங்கப்பட்டது', hi: 'वितरित' },
    COMPLETED: { en: 'COMPLETED', ta: 'நிறைவுற்றது', hi: 'पूर्ण' },
    MEDIUM_RISK: { en: 'MEDIUM RISK', ta: 'நடுத்தர இடர்', hi: 'मध्यम जोखिम' },
    PENDING: { en: 'PENDING', ta: 'நிலுவையில்', hi: 'लंबित' },
    UNDER_REVIEW: { en: 'UNDER REVIEW', ta: 'மதிப்பாய்வில்', hi: 'समीक्षाधीन' },
    REQUIRES_REVIEW: { en: 'REQUIRES REVIEW ⚠', ta: 'மறுஆய்வு தேவை ⚠', hi: 'समीक्षा आवश्यक ⚠' },
    VERIFYING: { en: 'VERIFYING...', ta: 'சரிபார்க்கப்படுகிறது...', hi: 'सत्यापित हो रहा है...' },
    HIGH_RISK: { en: 'HIGH RISK', ta: 'அதிக இடர்', hi: 'उच्च जोखिम' },
    REJECTED: { en: 'REJECTED', ta: 'நிராகரிக்கப்பட்டது', hi: 'अस्वीकृत' },
    FAILED: { en: 'FAILED', ta: 'தோல்வி', hi: 'विफल' }
  };

  const getBadgeLabel = (key: string, defaultText: string) => {
    return BADGE_TRANSLATIONS[key]?.[currentLang] || defaultText;
  };

  // Low Risk / Verified / Approved / Disbursement
  if (['LOW', 'LOW_RISK', 'VERIFIED', 'APPROVED', 'DISBURSEMENT_INITIATED', 'COMPLETED'].includes(norm)) {
    let labelKey = norm;
    if (norm === 'LOW') labelKey = 'LOW_RISK';
    const label = getBadgeLabel(labelKey, status);

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
    let labelKey = norm;
    if (norm === 'MEDIUM') labelKey = 'MEDIUM_RISK';
    const label = getBadgeLabel(labelKey, status);

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
    let labelKey = norm;
    if (norm === 'HIGH') labelKey = 'HIGH_RISK';
    const label = getBadgeLabel(labelKey, status);

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
