import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  UploadCloud,
  FileSpreadsheet,
  ShieldCheck,
  Activity,
  Boxes,
  Coins,
  FolderLock,
  BarChart3,
  Mic,
  Target,
  Briefcase,
  User,
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const QuickActions: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { openVoice } = useApp();
  const [clickedActionId, setClickedActionId] = useState<string | null>(null);

  const actions = [
    {
      id: 'upload',
      label: 'Upload Invoice',
      short: 'Upload',
      desc: 'Instant OCR & extraction',
      icon: UploadCloud,
      color: 'bg-blue-50 text-blue-700 border-blue-200 group-hover:bg-blue-600 group-hover:text-white',
      badge: 'Fast',
      action: () => navigate('/invoices?action=upload')
    },
    {
      id: 'invoices',
      label: 'My Invoices',
      short: 'Invoices',
      desc: 'Manage pending & verified',
      icon: FileSpreadsheet,
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200 group-hover:bg-indigo-600 group-hover:text-white',
      badge: 'Portfolio',
      action: () => navigate('/invoices')
    },
    {
      id: 'eligibility',
      label: 'Check Eligibility',
      short: 'Eligibility',
      desc: 'Instant assessment calculator',
      icon: ShieldCheck,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200 group-hover:bg-emerald-600 group-hover:text-white',
      badge: 'AI Score',
      action: () => navigate('/eligibility')
    },
    {
      id: 'risk',
      label: 'Risk Score',
      short: 'Risk Score',
      desc: 'Explainable credit engine',
      icon: Activity,
      color: 'bg-amber-50 text-amber-700 border-amber-200 group-hover:bg-amber-600 group-hover:text-white',
      badge: '86/100',
      action: () => navigate('/risk')
    },
    {
      id: 'bundle',
      label: 'Bundle Invoices',
      short: 'Bundle',
      desc: 'Pool invoices into capital',
      icon: Boxes,
      color: 'bg-purple-50 text-purple-700 border-purple-200 group-hover:bg-purple-600 group-hover:text-white',
      badge: 'Core USP',
      action: () => navigate('/pool')
    },
    {
      id: 'financing',
      label: 'Financing',
      short: 'Financing',
      desc: 'Track requests & payouts',
      icon: Coins,
      color: 'bg-teal-50 text-teal-700 border-teal-200 group-hover:bg-teal-600 group-hover:text-white',
      badge: 'Active',
      action: () => navigate('/history')
    },
    {
      id: 'documents',
      label: 'Documents',
      short: 'Documents',
      desc: 'Central MSME vault',
      icon: FolderLock,
      color: 'bg-cyan-50 text-cyan-700 border-cyan-200 group-hover:bg-cyan-600 group-hover:text-white',
      badge: '80% Done',
      action: () => navigate('/documents')
    },
    {
      id: 'analytics',
      label: 'Analytics',
      short: 'Analytics',
      desc: 'Growth & cash flow trends',
      icon: BarChart3,
      color: 'bg-rose-50 text-rose-700 border-rose-200 group-hover:bg-rose-600 group-hover:text-white',
      badge: 'Charts',
      action: () => navigate('/analytics')
    },
    {
      id: 'voice',
      label: 'Voice Assistant',
      short: 'Voice Guide',
      desc: 'Speech-to-text queries',
      icon: Mic,
      color: 'bg-brand-50 text-brand-700 border-brand-200 group-hover:bg-brand-600 group-hover:text-white',
      badge: 'Interactive',
      action: () => openVoice()
    },
    {
      id: 'goals',
      label: 'Financial Goals',
      short: 'Goals',
      desc: 'Machinery & capital milestones',
      icon: Target,
      color: 'bg-orange-50 text-orange-700 border-orange-200 group-hover:bg-orange-600 group-hover:text-white',
      badge: 'Targets',
      action: () => navigate('/goals')
    },
    {
      id: 'lender',
      label: 'Lender Requests',
      short: 'Lender Portal',
      desc: 'Review & approve pools',
      icon: Briefcase,
      color: 'bg-slate-100 text-slate-800 border-slate-300 group-hover:bg-slate-800 group-hover:text-white',
      badge: 'Demo NBFC',
      action: () => navigate('/lender')
    },
    {
      id: 'profile',
      label: 'Profile',
      short: 'Profile',
      desc: 'Sri Lakshmi Knits info',
      icon: User,
      color: 'bg-sky-50 text-sky-700 border-sky-200 group-hover:bg-sky-600 group-hover:text-white',
      badge: 'Verified',
      action: () => navigate('/profile')
    }
  ];

  const handleClick = (action: typeof actions[0]) => {
    setClickedActionId(action.id);
    setTimeout(() => {
      setClickedActionId(null);
      action.action();
    }, 200);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <span>⚡</span> Quick Financial Actions
          </h2>
          <p className="text-xs text-slate-500">
            One-tap quick access to every workflow on Nool Credit
          </p>
        </div>

        <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-brand-50 text-brand-700 text-[11px] font-bold rounded-full border border-brand-200/80">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          Google Pay Style Quick Access
        </span>
      </div>

      {/* Grid of 12 Google Pay / PhonePe inspired circular & rounded action buttons */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 sm:gap-4">
        {actions.map((action) => {
          const Icon = action.icon;
          const isClicked = clickedActionId === action.id;

          return (
            <motion.button
              key={action.id}
              onClick={() => handleClick(action)}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center justify-center p-3 rounded-2xl border border-slate-100 bg-slate-50/70 hover:bg-white hover:border-brand-300 hover:shadow-md transition-all text-center group relative overflow-hidden"
            >
              {/* Circular Icon Container */}
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-xs transition-all duration-200 ${action.color}`}>
                {isClicked ? (
                  <div className="w-5 h-5 rounded-full border-2 border-brand-600 border-t-transparent animate-spin" />
                ) : (
                  <Icon className="w-6 h-6 transition-transform group-hover:scale-110" />
                )}
              </div>

              {/* Label */}
              <span className="text-xs font-bold text-slate-800 group-hover:text-brand-700 transition-colors mt-2 leading-tight line-clamp-1">
                {action.label}
              </span>

              {/* Mini tag / subtext */}
              <span className="text-[10px] text-slate-400 font-medium group-hover:text-slate-600 mt-0.5 line-clamp-1">
                {action.short}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
