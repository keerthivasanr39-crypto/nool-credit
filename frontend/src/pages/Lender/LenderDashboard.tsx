import React from 'react';
import { motion } from 'framer-motion';
import { useDemoData } from '../../context/DemoDataContext';
import { StatCard } from '../../components/dashboard/StatCard';
import { 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  AlertOctagon, 
  Building2, 
  Layers, 
  ArrowRight,
  TrendingUp,
  FileText
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const LenderDashboard: React.FC = () => {
  const { financingRequests } = useDemoData();
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      {/* Lender Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold uppercase">
              Institutional Underwriting Portal
            </span>
            <span className="text-xs text-slate-400">Apex Capital Partners</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-1">
            {t('dashboard.welcomeLender')}
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Credit risk evaluation and collateral invoice pool financing decision engine
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-800 text-xs text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Active Liquidity Line: <strong className="text-white">₹50.00 Lakhs</strong></span>
        </div>
      </div>

      {/* Lender Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title={t('dashboard.pendingRequests')}
          value={8}
          icon={Clock}
          colorScheme="blue"
          trend={{ value: '3 High Priority', isPositive: true }}
          subtitle="Awaiting credit underwriting"
        />

        <StatCard
          title={t('dashboard.underReview')}
          value={5}
          icon={Layers}
          colorScheme="cyan"
          trend={{ value: 'Avg 4hr SLA', isPositive: true }}
          subtitle="Risk models processing"
        />

        <StatCard
          title={t('dashboard.approvedToday')}
          value={640000}
          isCurrency={true}
          icon={TrendingUp}
          colorScheme="emerald"
          trend={{ value: '₹6.4L Today', isPositive: true }}
          subtitle="Disbursement mandates issued"
        />

        <StatCard
          title={t('dashboard.highRiskAlerts')}
          value={2}
          icon={AlertOctagon}
          colorScheme="purple"
          trend={{ value: 'Flagged for Review', isPositive: false }}
          subtitle="Requires collateral adjustment"
        />
      </div>

      {/* Actionable Financing Requests Queue */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white font-display">
              MSME Collateral Pools Requiring Decision
            </h2>
            <p className="text-xs text-slate-400">
              Verified bundled invoices pending institutional approval
            </p>
          </div>
        </div>

        <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/90 text-slate-400 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-4">Applicant MSME</th>
                  <th className="p-4">Pool & Invoices</th>
                  <th className="p-4">Total Invoice Value</th>
                  <th className="p-4">Risk Score</th>
                  <th className="p-4">Financing Advance</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right pr-6">Underwriting Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {financingRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-white text-sm">{req.msmeName}</div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                        <Building2 className="w-3 h-3 text-blue-400" />
                        <span>{req.industry}</span>
                        <span>•</span>
                        <span>{req.location}</span>
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="font-mono font-bold text-cyan-300">{req.poolNumber}</div>
                      <span className="text-[11px] text-slate-400">{req.invoiceCount} Invoices Bundled</span>
                    </td>

                    <td className="p-4">
                      <span className="text-sm font-bold text-white font-display">
                        ₹{req.invoiceValue.toLocaleString('en-IN')}
                      </span>
                    </td>

                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        {req.riskScore}/100 ({req.riskLevel})
                      </span>
                    </td>

                    <td className="p-4">
                      <span className="text-sm font-bold text-emerald-400 font-display">
                        ₹{req.recommendedAmount.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-slate-400 block">80% Collateral Advance</span>
                    </td>

                    <td className="p-4">
                      {req.status === 'APPROVED' ? (
                        <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-500/40">
                          ✓ APPROVED
                        </span>
                      ) : req.status === 'REJECTED' ? (
                        <span className="px-2.5 py-1 rounded-md bg-rose-500/20 text-rose-300 font-bold text-xs border border-rose-500/40">
                          REJECTED
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-md bg-blue-500/20 text-blue-300 font-bold text-xs border border-blue-500/40 animate-pulse">
                          UNDER REVIEW
                        </span>
                      )}
                    </td>

                    <td className="p-4 text-right pr-6">
                      <button
                        onClick={() => navigate(`/lender/review/${req.id}`)}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-500/20 inline-flex items-center gap-1.5 transition-all"
                      >
                        <span>Review Request</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
