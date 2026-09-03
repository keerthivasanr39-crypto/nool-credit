import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { History, CheckCircle2, XCircle, Clock, Filter, AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/common/StatusBadge';
import { PrivacyMask } from '../components/common/PrivacyMask';

export const FinancingHistoryPage: React.FC = () => {
  const { t } = useTranslation();
  const { requests } = useApp();
  const [activeTab, setActiveTab] = useState<string>('ALL');
  const [selectedTimeFilter, setSelectedTimeFilter] = useState<string>('ALL');
  const [expandedRequestId, setExpandedRequestId] = useState<string | null>(null);

  const tabs = [
    { id: 'ALL', label: t('history.tabsAll') },
    { id: 'PENDING', label: t('history.tabsPending') },
    { id: 'UNDER_REVIEW', label: t('history.tabsUnderReview') },
    { id: 'APPROVED', label: t('history.tabsApproved') },
    { id: 'REJECTED', label: t('history.tabsRejected') },
    { id: 'DISBURSEMENT_INITIATED', label: t('history.tabsDisbursement') }
  ];

  const filteredRequests = requests.filter((req) => {
    if (activeTab === 'ALL') return true;
    return req.status === activeTab;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">{t('history.title')}</h1>
          <p className="text-xs text-slate-500 mt-1">{t('history.subtitle')}</p>
        </div>

        {/* Time Filters */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl self-start sm:self-auto text-xs">
          {['ALL', 'THIS_MONTH', '3_MONTHS', '6_MONTHS'].map((f) => (
            <button
              key={f}
              onClick={() => setSelectedTimeFilter(f)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                selectedTimeFilter === f
                  ? 'bg-white text-slate-900 font-bold shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {f === 'ALL'
                ? 'All Time'
                : f === 'THIS_MONTH'
                ? t('history.filterMonth')
                : f === '3_MONTHS'
                ? t('history.filter3Months')
                : t('history.filter6Months')}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredRequests.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-white rounded-3xl border border-slate-200/80 p-8">
            <Clock className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h4 className="text-sm font-bold text-slate-700">No financing requests in this filter</h4>
            <p className="text-xs text-slate-400 mt-1">Explore invoice pooling to create new requests.</p>
          </div>
        ) : (
          filteredRequests.map((req) => {
            const isApproved = req.status === 'APPROVED' || req.status === 'DISBURSEMENT_INITIATED';
            const isRejected = req.status === 'REJECTED';
            const isExpanded = expandedRequestId === req.id;

            return (
              <motion.div
                key={req.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                    <div>
                      <span className="text-xs font-extrabold text-slate-900">{req.requestNumber}</span>
                      <span className="text-[10px] text-slate-400 block">{req.poolNumber}</span>
                    </div>
                    <StatusBadge status={req.status} />
                  </div>

                  <div className="space-y-2.5 text-xs mb-4">
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Applicant MSME</span>
                      <span className="font-bold text-slate-800">{req.msmeName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Requested Capital</span>
                      <span className="font-extrabold text-slate-900">
                        <PrivacyMask value={req.requestedAmount || req.recommendedAmount} type="currency" />
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Pool Risk Rating</span>
                      <span className="font-bold text-brand-700">{req.riskScore} / 100 ({req.riskLevel})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Submitted Date</span>
                      <span className="text-slate-600 font-medium">
                        {new Date(req.createdAt).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Rejection notice and suggestions */}
                  {isRejected && req.rejectionReason && (
                    <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-800 space-y-1.5 my-3">
                      <div className="font-bold flex items-center gap-1 text-[11px]">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                        <span>{t('history.reasonLabel')}</span>
                      </div>
                      <p className="text-[11px] leading-relaxed text-rose-700">
                        {req.rejectionReason}
                      </p>
                    </div>
                  )}

                  {/* Disbursement badge for approved */}
                  {isApproved && (
                    <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2 my-3 font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="text-[11px]">Disbursement Initiated to HDFC Bank Account</span>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <button
                    onClick={() => setExpandedRequestId(isExpanded ? null : req.id)}
                    className="w-full py-2 text-xs font-bold text-brand-700 hover:text-brand-800 bg-brand-50 hover:bg-brand-100/70 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>{isExpanded ? 'Hide Full Breakdown' : t('common.viewDetails')}</span>
                    <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                  </button>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
};
