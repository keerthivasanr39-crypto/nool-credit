import React from 'react';
import { useDemoData } from '../../context/DemoDataContext';
import { FinancingStatusTimeline } from '../../components/financing/FinancingStatusTimeline';
import { CreditCard, Layers, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const FinancingPage: React.FC = () => {
  const { financingRequests } = useDemoData();
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold text-white font-display flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-blue-400" />
            {t('nav.financing')} Requests & Disbursement Tracker
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Monitor real-time institutional lender review status and direct bank transfer execution.
          </p>
        </div>

        <button
          onClick={() => navigate('/msme/pool')}
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-500/20 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Bundle New Collateral Pool</span>
        </button>
      </div>

      {financingRequests.length === 0 ? (
        <div className="glass-card p-12 text-center rounded-2xl border border-slate-800 space-y-4">
          <Layers className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No Active Financing Requests</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Select verified invoices to create your first bundled invoice pool and submit for institutional review.
          </p>
          <button
            onClick={() => navigate('/msme/pool')}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold"
          >
            Create Invoice Pool
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {financingRequests.map((req) => (
            <FinancingStatusTimeline key={req.id} request={req} />
          ))}
        </div>
      )}
    </div>
  );
};
