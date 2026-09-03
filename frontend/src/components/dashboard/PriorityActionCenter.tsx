import React from 'react';
import { motion } from 'framer-motion';
import { 
  AlertOctagon, 
  Layers, 
  Sparkles, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle,
  FileText
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const PriorityActionCenter: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const priorities = [
    {
      id: 'p1',
      level: 1,
      tag: 'Priority 1: Urgent Action',
      title: 'Audited Financial Statement Pending',
      desc: 'Upload 1 pending financial document to boost your Nool Credit Readiness Score to 87.',
      icon: AlertTriangle,
      badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
      actionText: 'Upload Document',
      actionUrl: '/msme/documents',
      borderColor: 'border-rose-500/30 hover:border-rose-500/50',
    },
    {
      id: 'p2',
      level: 2,
      tag: 'Priority 2: Financing Opportunity',
      title: '3 Invoices Ready for Bundling',
      desc: 'INV-1001, 1002, and 1003 are verified and eligible for an 80% working capital advance (₹2,08,000).',
      icon: Layers,
      badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
      actionText: 'Bundle into Pool',
      actionUrl: '/msme/pool',
      borderColor: 'border-blue-500/30 hover:border-blue-500/50',
    },
    {
      id: 'p3',
      level: 3,
      tag: 'Priority 3: Profile Improvement',
      title: 'Confirm Linked Bank & UPI Details',
      desc: 'Ensure automated RTGS/IMPS disbursement routes directly to your current account.',
      icon: Sparkles,
      badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
      actionText: 'Review Profile',
      actionUrl: '/msme/profile',
      borderColor: 'border-cyan-500/30 hover:border-cyan-500/50',
    },
    {
      id: 'p4',
      level: 4,
      tag: 'Priority 4: Financial Insights',
      title: 'Buyer Clearance Baseline Steady',
      desc: 'ABC Garments maintained a 98% settlement clearance rate with an average 6-day cycle variance.',
      icon: TrendingUp,
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      actionText: 'View Invoices',
      actionUrl: '/msme/invoices',
      borderColor: 'border-emerald-500/30 hover:border-emerald-500/50',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white font-display">
            {t('priority.title')}
          </h3>
          <p className="text-xs text-slate-400">
            {t('priority.subtitle')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {priorities.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`p-5 rounded-2xl glass-card border transition-all ${item.borderColor} flex flex-col justify-between space-y-3 group`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${item.badgeColor}`}>
                    {item.tag}
                  </span>
                  <Icon className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                </div>

                <h4 className="text-sm font-bold text-white font-display">
                  {item.title}
                </h4>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => navigate(item.actionUrl)}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-xs font-semibold text-slate-200 group-hover:text-white flex items-center gap-1.5 transition-all"
                >
                  <span>{item.actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
