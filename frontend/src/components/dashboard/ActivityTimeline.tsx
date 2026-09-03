import React from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, Clock, ArrowUpRight, FileCheck, Layers } from 'lucide-react';
import { PrivacyMask } from '../common/PrivacyMask';

export const ActivityTimeline: React.FC = () => {
  const { t } = useTranslation();

  const activities = [
    {
      id: 1,
      title: 'Financing Approved & Disbursed',
      desc: 'REQ-1001 for POOL-1001 approved by Apex FinCorp Capital.',
      amount: 208000,
      time: 'Today, 11:30 AM',
      icon: CheckCircle2,
      iconColor: 'text-emerald-600 bg-emerald-50'
    },
    {
      id: 2,
      title: 'Invoice Pool Created',
      desc: 'Pooled 3 verified invoices (INV-1001, INV-1002, INV-1003).',
      amount: 260000,
      time: 'Yesterday, 4:15 PM',
      icon: Layers,
      iconColor: 'text-brand-600 bg-brand-50'
    },
    {
      id: 3,
      title: 'Invoice Verified Successfully',
      desc: 'INV-1004 GST verified with 96% confidence score.',
      amount: 95000,
      time: '28 Aug 2026',
      icon: FileCheck,
      iconColor: 'text-teal-600 bg-teal-50'
    },
    {
      id: 4,
      title: 'Digital KYC Verified',
      desc: 'Aadhaar, PAN and Bank account sandbox checks completed.',
      amount: null,
      time: '25 Aug 2026',
      icon: CheckCircle2,
      iconColor: 'text-indigo-600 bg-indigo-50'
    }
  ];

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-800">{t('dashboard.activityTimeline')}</h3>
          <p className="text-xs text-slate-400">Live logs of financing lifecycle milestones</p>
        </div>
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded">
          Real-time
        </span>
      </div>

      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
        {activities.map((act) => {
          const Icon = act.icon;
          return (
            <div key={act.id} className="relative group">
              <div className={`absolute -left-6 top-0 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-xs ${act.iconColor}`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <h4 className="text-xs font-bold text-slate-800 group-hover:text-brand-600 transition-colors">
                    {act.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                    {act.desc}
                  </p>
                </div>
                <div className="flex items-center sm:flex-col sm:items-end justify-between shrink-0">
                  {act.amount && (
                    <span className="text-xs font-bold text-slate-900">
                      <PrivacyMask value={act.amount} type="currency" />
                    </span>
                  )}
                  <span className="text-[10px] text-slate-400 font-medium">
                    {act.time}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
