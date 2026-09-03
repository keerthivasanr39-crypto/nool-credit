import React from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  Coins,
  ShieldCheck,
  Calendar,
  FileSpreadsheet,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { useTranslation } from 'react-i18next';

const monthlyGrowthData = [
  { month: 'Jan', amount: 80000 },
  { month: 'Feb', amount: 120000 },
  { month: 'Mar', amount: 95000 },
  { month: 'Apr', amount: 150000 },
  { month: 'May', amount: 240000 },
  { month: 'Jun', amount: 310000 },
  { month: 'Jul', amount: 290000 },
  { month: 'Aug', amount: 480000 },
];

const financingActivityData = [
  { stage: 'Requested', amount: 520000, count: 5, fill: '#3B82F6' },
  { stage: 'Approved', amount: 410000, count: 4, fill: '#10B981' },
  { stage: 'Pending', amount: 208000, count: 2, fill: '#F59E0B' },
  { stage: 'Rejected', amount: 60000, count: 1, fill: '#EF4444' },
];

const riskDistributionData = [
  { name: 'Low Risk (80-100)', value: 68, color: '#10B981' },
  { name: 'Medium Risk (60-79)', value: 24, color: '#F59E0B' },
  { name: 'High Risk (<60)', value: 8, color: '#EF4444' },
];

const cashFlowTrendData = [
  { week: 'W1', incoming: 45000, pending: 120000, financing: 95000 },
  { week: 'W2', incoming: 60000, pending: 140000, financing: 110000 },
  { week: 'W3', incoming: 80000, pending: 180000, financing: 150000 },
  { week: 'W4', incoming: 95000, pending: 260000, financing: 208000 },
];

export const AnalyticsPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-brand-900 via-brand-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg relative overflow-hidden">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-brand-700/80 border border-brand-500/40 flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">
              FinTech Analytics Center
            </div>
            <h1 className="text-2xl font-extrabold">Business Financial Analytics</h1>
            <p className="text-xs text-brand-200 mt-0.5">
              Comprehensive growth metrics, working capital velocity, and risk trends for Sri Lakshmi Knits.
            </p>
          </div>
        </div>
      </div>

      {/* 4 Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm">
          <div className="text-slate-400 text-xs font-semibold">Total Revenue Financed</div>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">₹4.8 Lakhs</div>
          <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold mt-2">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+28% MoM</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm">
          <div className="text-slate-400 text-xs font-semibold">Avg Approval Speed</div>
          <div className="text-2xl font-extrabold text-brand-700 mt-1">1.8 Days</div>
          <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold mt-2">
            <span>⚡ 6x Faster than Bank</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm">
          <div className="text-slate-400 text-xs font-semibold">Weighted Portfolio Risk</div>
          <div className="text-2xl font-extrabold text-emerald-600 mt-1">86 / 100</div>
          <div className="flex items-center gap-1 text-brand-600 text-xs font-bold mt-2">
            <span>Low Risk Tier</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm">
          <div className="text-slate-400 text-xs font-semibold">Working Capital Unlocked</div>
          <div className="text-2xl font-extrabold text-indigo-700 mt-1">85.4%</div>
          <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold mt-2">
            <span>Immediate Liquidity</span>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 1. Monthly Invoice Growth (Line Graph) */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">1. Monthly Invoice Growth</h3>
              <p className="text-xs text-slate-400">Total invoice generation trend across months</p>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
              Growth: +400%
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyGrowthData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0F4C81" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#0F4C81" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <YAxis
                  tick={{ fontSize: 11, fill: '#64748B' }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `₹${v / 1000}K`}
                />
                <Tooltip
                  formatter={(v: any) => [`₹${Number(v).toLocaleString('en-IN')}`, 'Invoice Volume']}
                  contentStyle={{ backgroundColor: '#0F172A', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#0F4C81"
                  strokeWidth={3}
                  fill="url(#colorGrowth)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2. Financing Activity (Bar Chart) */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">2. Financing Activity</h3>
              <p className="text-xs text-slate-400">Requested vs. Approved vs. Pending vs. Rejected</p>
            </div>
            <span className="text-xs font-bold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-full">
              4 Requests Approved
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={financingActivityData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="stage" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <YAxis
                  tick={{ fontSize: 11, fill: '#64748B' }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `₹${v / 1000}K`}
                />
                <Tooltip
                  formatter={(v: any) => [`₹${Number(v).toLocaleString('en-IN')}`, 'Amount']}
                  contentStyle={{ backgroundColor: '#0F172A', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
                  {financingActivityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 3. Invoice Risk Distribution (Donut Chart) */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">3. Invoice Risk Distribution</h3>
              <p className="text-xs text-slate-400">Low, Medium, and High risk composition</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
              68% Low Risk
            </span>
          </div>

          <div className="h-64 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskDistributionData}
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {riskDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(v: any) => [`${v}%`, 'Portfolio Share']}
                  contentStyle={{ backgroundColor: '#0F172A', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-extrabold text-slate-800">86</span>
              <span className="text-[10px] text-emerald-600 font-bold uppercase">Avg Score</span>
            </div>
          </div>
        </div>

        {/* 4. Cash Flow Trend (Line Graph) */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">4. Cash Flow Trend</h3>
              <p className="text-xs text-slate-400">Incoming payments vs. pending vs. unlocked capital</p>
            </div>
            <span className="text-xs font-bold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-full">
              Weekly Velocity
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cashFlowTrendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <YAxis
                  tick={{ fontSize: 11, fill: '#64748B' }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `₹${v / 1000}K`}
                />
                <Tooltip
                  formatter={(v: any) => [`₹${Number(v).toLocaleString('en-IN')}`, '']}
                  contentStyle={{ backgroundColor: '#0F172A', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                />
                <Line type="monotone" dataKey="incoming" name="Incoming" stroke="#10B981" strokeWidth={2.5} />
                <Line type="monotone" dataKey="pending" name="Pending Invoices" stroke="#F59E0B" strokeWidth={2.5} />
                <Line type="monotone" dataKey="financing" name="Financing Advance" stroke="#0F4C81" strokeWidth={2.5} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
