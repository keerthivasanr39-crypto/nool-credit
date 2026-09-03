import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Briefcase,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Building,
  Coins
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AnimatedKPI } from '../components/dashboard/AnimatedKPI';
import { StatusBadge } from '../components/common/StatusBadge';
import { PrivacyMask } from '../components/common/PrivacyMask';

export const LenderDashboard: React.FC = () => {
  const { t } = useTranslation();
  const { requests } = useApp();
  const navigate = useNavigate();

  const pendingCount = requests.filter((r) => r.status === 'PENDING' || r.status === 'UNDER_REVIEW').length;
  const approvedTotal = requests
    .filter((r) => r.status === 'APPROVED' || r.status === 'DISBURSEMENT_INITIATED')
    .reduce((acc, r) => acc + (r.requestedAmount || r.recommendedAmount), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Lender Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider bg-emerald-950/80 border border-emerald-800 px-2.5 py-0.5 rounded-full">
              Lender Partner • Apex FinCorp Capital
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {t('lender.title')}
          </h1>
          <p className="text-xs text-slate-300 max-w-xl">
            {t('lender.subtitle')}
          </p>
        </div>

        <Link
          to="/lender/review"
          className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition-all self-start md:self-auto"
        >
          <span>{t('lender.reviewRequest')}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Lender KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AnimatedKPI
          title={t('lender.pendingRequests')}
          value={8}
          icon={Clock}
          changeText="Requires Decision"
          colorScheme="blue"
          delay={0.1}
        />
        <AnimatedKPI
          title={t('lender.underReview')}
          value={5}
          icon={Briefcase}
          changeText="In Audit Pipeline"
          colorScheme="amber"
          delay={0.2}
        />
        <AnimatedKPI
          title={t('lender.approvedToday')}
          value={640000}
          isCurrency
          icon={Coins}
          changeText="Disbursed Capital"
          colorScheme="emerald"
          delay={0.3}
        />
        <AnimatedKPI
          title={t('lender.highRiskAlerts')}
          value={2}
          icon={AlertTriangle}
          changeText="Fraud Screen Flags"
          colorScheme="purple"
          delay={0.4}
        />
      </div>

      {/* Requests Queue */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">Active Financing Applications</h3>
            <p className="text-xs text-slate-400">Structured invoice pools awaiting institutional decision</p>
          </div>
          <Link
            to="/lender/review"
            className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
          >
            <span>Open Decision Portal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-slate-100">
          {requests.map((req) => (
            <div
              key={req.id}
              onClick={() => navigate(`/lender/review?id=${req.id}`)}
              className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 p-2 rounded-2xl transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center font-bold text-xs shrink-0">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{req.msmeName}</span>
                    <span className="text-[10px] text-slate-400 font-mono">({req.poolNumber})</span>
                  </div>
                  <div className="text-[11px] text-slate-500">{req.industry}</div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Requested</span>
                  <span className="font-extrabold text-slate-900">
                    <PrivacyMask value={req.requestedAmount || req.recommendedAmount} type="currency" />
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px]">Risk Score</span>
                  <span className="font-bold text-brand-700">{req.riskScore} / 100</span>
                </div>

                <StatusBadge status={req.status} />

                <button className="p-2 text-slate-400 hover:text-brand-600">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
