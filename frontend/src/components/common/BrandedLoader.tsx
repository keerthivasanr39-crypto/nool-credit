import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Layers, ShieldCheck, FileSpreadsheet, CheckCircle2 } from 'lucide-react';

interface BrandedLoaderProps {
  stage?: 'PAGE' | 'INVOICE_UPLOAD' | 'RISK_ANALYSIS' | 'KYC' | 'FINANCING' | 'LENDER_REVIEW';
  message?: string;
}

export const BrandedLoader: React.FC<BrandedLoaderProps> = ({
  stage = 'PAGE',
  message = 'Processing secure request...'
}) => {
  const getStageContent = () => {
    switch (stage) {
      case 'INVOICE_UPLOAD':
        return {
          icon: FileSpreadsheet,
          title: 'Extracting & Validating Invoice',
          desc: 'Simulating OCR extraction, duplicate hash check & GST e-invoicing verification...'
        };
      case 'RISK_ANALYSIS':
        return {
          icon: ShieldCheck,
          title: 'Calculating Explainable Risk Score',
          desc: 'Evaluating buyer reliability, payment delay history & portfolio concentration...'
        };
      case 'KYC':
        return {
          icon: Layers,
          title: 'Verifying Digital Identity (Sandbox)',
          desc: 'Cross-checking Aadhaar, PAN & Bank Account validity...'
        };
      case 'FINANCING':
        return {
          icon: Sparkles,
          title: 'Structuring Financing Application',
          desc: 'Optimizing invoice pool bundle for immediate lender review...'
        };
      default:
        return {
          icon: Sparkles,
          title: 'NOOL CREDIT Financial Engine',
          desc: message
        };
    }
  };

  const info = getStageContent();
  const Icon = info.icon;

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center max-w-sm mx-auto">
      <div className="relative flex items-center justify-center w-24 h-24 mb-6">
        {/* Animated Outer Ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-dashed border-brand-400"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />
        
        {/* Pulsing Glow Ring */}
        <motion.div
          className="absolute inset-2 rounded-full bg-brand-50 border border-brand-200"
          animate={{ scale: [1, 1.06, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Small floating financial particles */}
        <motion.div
          className="absolute -top-1 right-2 w-2 h-2 rounded-full bg-emerald-500 shadow-sm"
          animate={{ y: [-4, 4, -4], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-1 left-2 w-2.5 h-2.5 rounded-full bg-brand-600 shadow-sm"
          animate={{ y: [4, -4, 4], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Center Logo/Icon */}
        <div className="relative z-10 w-12 h-12 rounded-xl bg-gradient-to-br from-brand-700 to-brand-900 text-white flex items-center justify-center shadow-lg shadow-brand-900/20">
          <Icon className="w-6 h-6 animate-pulse text-amber-300" />
        </div>
      </div>

      <h4 className="text-base font-bold text-slate-800 mb-1">{info.title}</h4>
      <p className="text-xs text-slate-500 max-w-xs leading-relaxed">{info.desc}</p>

      {/* Progress Bar Line */}
      <div className="w-48 h-1.5 bg-slate-100 rounded-full overflow-hidden mt-5">
        <motion.div
          className="h-full bg-gradient-to-r from-brand-500 via-emerald-500 to-brand-700"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </div>
  );
};
