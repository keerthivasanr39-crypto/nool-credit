import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ShieldCheck, Clock, Layers, ArrowRight, Building, CreditCard, Landmark, FileSpreadsheet } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../../context/AppContext';
import { PrivacyMask } from '../common/PrivacyMask';

export const KYCJourneyTracker: React.FC = () => {
  const { t } = useTranslation();
  const { kycState, updateKYC } = useApp();
  const [verifyingStep, setVerifyingStep] = useState<string | null>(null);

  const steps = [
    {
      id: 'aadhaar',
      title: 'Aadhaar Verification',
      desc: 'Simulated UIDAI e-KYC Hash Match',
      maskedVal: kycState?.aadhaar?.number || 'XXXX XXXX 4521',
      icon: ShieldCheck,
      status: kycState?.aadhaar?.status || 'VERIFIED',
      verifiedAt: kycState?.aadhaar?.verifiedAt || '01 Aug 2026'
    },
    {
      id: 'pan',
      title: 'PAN Card Verification',
      desc: 'NSDL / ITD Entity Validation',
      maskedVal: kycState?.pan?.number || 'XXXXX1234X',
      icon: CreditCard,
      status: kycState?.pan?.status || 'VERIFIED',
      verifiedAt: kycState?.pan?.verifiedAt || '01 Aug 2026'
    },
    {
      id: 'bank',
      title: 'Bank Account & Penny Drop',
      desc: 'HDFC Bank Account Verification',
      maskedVal: kycState?.bank?.accountNumber || 'XXXX XXXX 8892',
      icon: Landmark,
      status: kycState?.bank?.status || 'VERIFIED',
      verifiedAt: kycState?.bank?.verifiedAt || '02 Aug 2026'
    },
    {
      id: 'business',
      title: 'Business Registration',
      desc: 'GSTIN & Udyam MSME Validation',
      maskedVal: kycState?.business?.gstNumber || '33AABCS1234F1Z0',
      icon: Building,
      status: kycState?.business?.status || 'VERIFIED',
      verifiedAt: kycState?.business?.verifiedAt || '02 Aug 2026'
    },
    {
      id: 'documents',
      title: 'Financial Documents',
      desc: 'Audited Statements & GST Returns',
      maskedVal: '3 Documents Verified',
      icon: FileSpreadsheet,
      status: kycState?.documents?.status || 'VERIFIED',
      verifiedAt: kycState?.documents?.verifiedAt || '03 Aug 2026'
    }
  ];

  const handleSimulateVerify = async (stepId: any) => {
    setVerifyingStep(stepId);
    setTimeout(async () => {
      await updateKYC(stepId, { status: 'VERIFIED' });
      setVerifyingStep(null);
    }, 1200);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {t('kyc.journeyTitle')}
          </span>
          <h3 className="text-base font-bold text-slate-900 mt-0.5">
            Institutional Digital Verification Pipeline
          </h3>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-full border border-emerald-200 shadow-xs">
          <CheckCircle2 className="w-3.5 h-3.5" />
          KYC COMPLETE ✓
        </span>
      </div>

      {/* Visual Journey Nodes */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          const isDone = s.status === 'VERIFIED';
          const isCurrent = verifyingStep === s.id;

          return (
            <div
              key={s.id}
              className={`p-4 rounded-2xl border transition-all text-left flex flex-col justify-between ${
                isDone
                  ? 'bg-emerald-50/40 border-emerald-200'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                      isDone ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {isCurrent ? (
                      <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    ) : (
                      <Icon className="w-4 h-4" />
                    )}
                  </div>
                  {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                </div>
                <h4 className="text-xs font-bold text-slate-800 leading-tight">{s.title}</h4>
                <p className="text-[10px] text-slate-500 mt-1">{s.desc}</p>
              </div>

              <div className="mt-4 pt-2 border-t border-slate-200/50">
                <div className="text-[11px] font-mono font-bold text-slate-700">{s.maskedVal}</div>
                <div className="text-[9px] text-slate-400 mt-0.5">Verified on {s.verifiedAt}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sandbox Verification Disclaimer */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-2.5 text-xs text-slate-500">
        <ShieldCheck className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-slate-700">Prototype Sandbox Verification: </span>
          {t('kyc.disclaimer')}
        </div>
      </div>
    </div>
  );
};
