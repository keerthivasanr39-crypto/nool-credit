import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  FileSpreadsheet,
  Coins,
  ShieldCheck,
  Send,
  UploadCloud,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Boxes,
  Bell,
  Clock
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { AnimatedKPI } from '../components/dashboard/AnimatedKPI';
import { QuickActions } from '../components/dashboard/QuickActions';
import { NoolBusinessScoreCard } from '../components/dashboard/NoolBusinessScoreCard';
import { InvoiceTrendChart, RiskDistributionChart } from '../components/dashboard/Charts';
import { ActivityTimeline } from '../components/dashboard/ActivityTimeline';
import { InvoiceTable } from '../components/invoice/InvoiceTable';

export const MSMEDashboard: React.FC = () => {
  const { t } = useTranslation();
  const { invoices, requests, openVoice } = useApp();
  const { user } = useAuth();

  const totalInvoiceValue = invoices.reduce((acc, inv) => acc + inv.invoiceAmount, 0) || 480000;
  const totalEligible = invoices.reduce((acc, inv) => acc + inv.eligibleFinancing, 0) || 390000;
  const activeRequestsCount = requests.filter(r => ['PENDING', 'UNDER_REVIEW'].includes(r.status)).length || 3;

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Banner with Animation */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-brand-900 via-brand-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
      >
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider bg-brand-700/60 border border-brand-500/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              Verified MSME Portal
            </span>
            <span className="text-[11px] text-slate-300 font-medium">
              {user?.businessName || 'Sri Lakshmi Knits'} • Tirupur Cluster
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Good Morning, {user?.name || 'User'} 👋
          </h1>
          <p className="text-xs sm:text-sm text-brand-200 max-w-xl">
            Welcome back, <strong className="text-white font-semibold">{user?.name || 'User'}</strong>. Your business financial health is looking strong. 3 invoices are ready for working capital pooling.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap items-center gap-3">
          <Link
            to="/invoices?action=upload"
            className="flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-50 text-brand-900 font-bold text-xs rounded-xl shadow-sm transition-all hover:scale-105"
          >
            <UploadCloud className="w-4 h-4 text-brand-600" />
            <span>Upload Invoice</span>
          </Link>
          <button
            onClick={openVoice}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-brand-700/80 hover:bg-brand-600 border border-brand-500/40 text-white font-bold text-xs rounded-xl transition-all"
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>Voice Assistant</span>
          </button>
        </div>
      </motion.div>

      {/* 4 Animated Financial Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AnimatedKPI
          title="TOTAL INVOICE VALUE"
          value={totalInvoiceValue}
          isCurrency
          icon={FileSpreadsheet}
          changeText="+14% this month"
          colorScheme="blue"
          delay={0.1}
        />
        <AnimatedKPI
          title="FINANCING ELIGIBLE"
          value={totalEligible}
          isCurrency
          icon={Coins}
          changeText="85% Max Advance"
          colorScheme="emerald"
          delay={0.2}
        />
        <AnimatedKPI
          title="AVERAGE RISK SCORE"
          value={86}
          suffix="/100"
          icon={ShieldCheck}
          changeText="Low Risk Rating"
          colorScheme="amber"
          delay={0.3}
        />
        <AnimatedKPI
          title="ACTIVE REQUESTS"
          value={activeRequestsCount}
          icon={Send}
          changeText="Under Lender Review"
          colorScheme="purple"
          delay={0.4}
        />
      </div>

      {/* Google Pay Style 12 Quick Action Grid */}
      <QuickActions />

      {/* Business Financial Health Score (Nool Business Score 84/100) */}
      <NoolBusinessScoreCard />

      {/* Real-time Animated Financial Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <InvoiceTrendChart />
        </div>
        <div className="lg:col-span-4">
          <RiskDistributionChart />
        </div>
      </div>

      {/* Invoices List Table & Live Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Recent Registered Invoices</h3>
              <p className="text-xs text-slate-400">Manage and bundle pending receivables</p>
            </div>
            <Link
              to="/invoices"
              className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
            >
              <span>View All ({invoices.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <InvoiceTable invoices={invoices.slice(0, 5)} />
        </div>

        <div className="lg:col-span-4">
          <ActivityTimeline />
        </div>
      </div>
    </div>
  );
};
