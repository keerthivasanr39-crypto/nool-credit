import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useTranslation } from 'react-i18next';

const monthlyVolumeData = [
  { month: 'Apr', total: 1.8, financed: 1.4 },
  { month: 'May', total: 2.6, financed: 2.1 },
  { month: 'Jun', total: 3.2, financed: 2.7 },
  { month: 'Jul', total: 4.1, financed: 3.4 },
  { month: 'Aug', total: 4.8, financed: 3.9 },
  { month: 'Sep (Proj)', total: 5.5, financed: 4.5 },
];

const riskDistributionData = [
  { name: 'Low Risk (80-100)', value: 68, color: '#10B981' },
  { name: 'Medium Risk (60-79)', value: 24, color: '#F59E0B' },
  { name: 'High Risk (0-59)', value: 8, color: '#F43F5E' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 border border-slate-700 p-3 rounded-xl shadow-2xl text-xs">
        <p className="font-semibold text-white mb-1.5">{label}</p>
        {payload.map((item: any, idx: number) => (
          <div key={idx} className="flex items-center gap-2 text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="capitalize">{item.name}:</span>
            <span className="font-bold text-white">₹{item.value} Lakhs</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const FinancialCharts: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-6">
      {/* Area Chart: Volume Trend */}
      <div className="lg:col-span-2 glass-card p-5 rounded-2xl border border-slate-800/80">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-white font-display">
              {t('dashboard.invoiceValueTrend')}
            </h3>
            <p className="text-xs text-slate-400">
              Total pending invoices vs. accelerated working capital advances
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-blue-400">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              Total Invoiced
            </span>
            <span className="flex items-center gap-1.5 text-cyan-400">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              Financed
            </span>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyVolumeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="totalColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="financedColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
              <XAxis dataKey="month" stroke="#64748B" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748B" fontSize={11} tickLine={false} unit="L" />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="total"
                stroke="#3B82F6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#totalColor)"
                name="Total Value"
              />
              <Area
                type="monotone"
                dataKey="financed"
                stroke="#06B6D4"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#financedColor)"
                name="Financed Value"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Donut Chart: Risk Distribution */}
      <div className="glass-card p-5 rounded-2xl border border-slate-800/80 flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-bold text-white font-display mb-1">
            {t('dashboard.riskDistribution')}
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            Underwritten portfolio distribution
          </p>
        </div>

        <div className="h-44 w-full relative flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={riskDistributionData}
                innerRadius={50}
                outerRadius={70}
                paddingAngle={5}
                dataKey="value"
              >
                {riskDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xl font-bold text-white font-display">86</span>
            <span className="text-[10px] text-emerald-400 font-semibold uppercase">Avg Score</span>
          </div>
        </div>

        <div className="space-y-2 mt-2 pt-2 border-t border-slate-800/80">
          {riskDistributionData.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                {item.name}
              </span>
              <span className="font-bold text-white">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
