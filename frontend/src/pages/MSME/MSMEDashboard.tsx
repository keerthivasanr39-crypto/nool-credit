import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDemoData } from '../../context/DemoDataContext';
import { useAuth } from '../../context/AuthContext';
import { StatCard } from '../../components/dashboard/StatCard';
import { ReadinessScoreCard } from '../../components/dashboard/ReadinessScoreCard';
import { PriorityActionCenter } from '../../components/dashboard/PriorityActionCenter';
import { FinancialCharts } from '../../components/dashboard/FinancialCharts';
import { InvoiceTable } from '../../components/invoice/InvoiceTable';
import { ExplainableRiskCard } from '../../components/risk/ExplainableRiskCard';
import { Invoice } from '../../types';
import { 
  FileText, 
  Layers, 
  TrendingUp, 
  ShieldCheck, 
  Plus, 
  ArrowRight, 
  Zap,
  Building2,
  FolderLock,
  X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const MSMEDashboard: React.FC = () => {
  const { invoices, pools, financingRequests } = useDemoData();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [selectedRiskInvoice, setSelectedRiskInvoice] = useState<Invoice | null>(null);

  // Aggregate stats
  const totalInvoiceValue = invoices.reduce((sum, i) => sum + i.invoiceAmount, 0);
  const eligibleFinancingTotal = invoices.reduce((sum, i) => sum + i.eligibleFinancing, 0);
  const avgRiskScore = Math.round(
    invoices.reduce((sum, i) => sum + i.riskScore, 0) / (invoices.length || 1)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      {/* MSME Welcome Header & Quick Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold uppercase">
              {user?.industry || 'Textile Job Work'}
            </span>
            <span className="text-xs text-slate-400">Tirupur Cluster</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-1">
            {user?.businessName || 'Sri Lakshmi Knits'}
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Personal MSME invoice intelligence & working capital assistant
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => navigate('/msme/documents')}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-all"
          >
            <FolderLock className="w-3.5 h-3.5 text-cyan-400" />
            <span>Vault</span>
          </button>

          <button
            onClick={() => navigate('/msme/invoices')}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-all"
          >
            <Plus className="w-3.5 h-3.5 text-blue-400" />
            <span>{t('dashboard.uploadNewInvoice')}</span>
          </button>

          <button
            onClick={() => navigate('/msme/pool')}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-bold shadow-lg shadow-blue-500/20 flex items-center gap-2 transition-all hover:scale-105"
          >
            <Layers className="w-4 h-4" />
            <span>{t('dashboard.createPool')}</span>
          </button>
        </div>
      </div>

      {/* Nool Credit Readiness Score Pillar */}
      <ReadinessScoreCard score={82} />

      {/* Smart Priority Action Center */}
      <PriorityActionCenter />

      {/* 4 Animated Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title={t('dashboard.totalInvoiceValue')}
          value={totalInvoiceValue}
          isCurrency={true}
          icon={FileText}
          colorScheme="blue"
          trend={{ value: '+14% vs last mo', isPositive: true }}
          subtitle={`${invoices.length} active pending invoices`}
        />

        <StatCard
          title={t('dashboard.financingEligible')}
          value={eligibleFinancingTotal}
          isCurrency={true}
          icon={TrendingUp}
          colorScheme="cyan"
          trend={{ value: '85% Advance', isPositive: true }}
          subtitle="Instant 24hr liquidity potential"
        />

        <StatCard
          title={t('dashboard.avgRiskScore')}
          value={avgRiskScore}
          suffix="/100"
          icon={ShieldCheck}
          colorScheme="emerald"
          trend={{ value: 'Low Default Risk', isPositive: true }}
          subtitle="Explainable algorithmic score"
        />

        <StatCard
          title={t('dashboard.activeRequests')}
          value={financingRequests.length}
          icon={Zap}
          colorScheme="purple"
          trend={{ value: 'Under Review', isPositive: true }}
          subtitle="Collateral pool submissions"
        />
      </div>

      {/* Charts Section */}
      <FinancialCharts />

      {/* Recent Invoices Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white font-display">
              {t('dashboard.recentInvoices')}
            </h2>
            <p className="text-xs text-slate-400">
              Verified job-work invoices eligible for bundling & partner financing
            </p>
          </div>

          <button
            onClick={() => navigate('/msme/invoices')}
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <InvoiceTable
          invoices={invoices}
          selectable={false}
          onViewRisk={(inv) => setSelectedRiskInvoice(inv)}
        />
      </div>

      {/* Explainable Risk Modal */}
      <AnimatePresence>
        {selectedRiskInvoice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-4xl max-h-[90vh] overflow-y-auto relative"
            >
              <button
                onClick={() => setSelectedRiskInvoice(null)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <ExplainableRiskCard
                invoice={selectedRiskInvoice}
                onBundleClick={() => {
                  setSelectedRiskInvoice(null);
                  navigate('/msme/pool');
                }}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
