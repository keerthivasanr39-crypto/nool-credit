import React from 'react';
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
  ResponsiveContainer
} from 'recharts';
import { useTranslation } from 'react-i18next';
import { PrivacyMask } from '../common/PrivacyMask';

const monthlyData = [
  { month: 'Apr', invoiceValue: 180000, financed: 153000 },
  { month: 'May', invoiceValue: 240000, financed: 204000 },
  { month: 'Jun', invoiceValue: 310000, financed: 260000 },
  { month: 'Jul', invoiceValue: 290000, financed: 245000 },
  { month: 'Aug', invoiceValue: 380000, financed: 320000 },
  { month: 'Sep', invoiceValue: 480000, financed: 408000 }
];

const riskDistributionData = [
  { name: 'Low Risk (80-100)', count: 4, value: 355000, color: '#10B981' },
  { name: 'Medium Risk (60-79)', count: 2, value: 245000, color: '#F59E0B' },
  { name: 'High Risk (<60)', count: 0, value: 0, color: '#EF4444' }
];

export const InvoiceTrendChart: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-800">{t('dashboard.invoiceTrend')}</h3>
          <p className="text-xs text-slate-400">Total volume vs. unlocked working capital (6 Months)</p>
        </div>
        <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
          +26% MoM Growth
        </span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorInvoice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0F4C81" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#0F4C81" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorFinanced" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
            <YAxis
              tick={{ fontSize: 11, fill: '#64748B' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `₹${v / 1000}k`}
            />
            <Tooltip
              formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN')}`, '']}
              contentStyle={{
                backgroundColor: '#0F172A',
                border: 'none',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '12px'
              }}
            />
            <Area
              type="monotone"
              dataKey="invoiceValue"
              name="Invoices"
              stroke="#0F4C81"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorInvoice)"
            />
            <Area
              type="monotone"
              dataKey="financed"
              name="Disbursed"
              stroke="#10B981"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorFinanced)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center gap-6 mt-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-brand-700" />
          <span className="text-slate-600 font-medium">Invoiced Volume</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-500" />
          <span className="text-slate-600 font-medium">Working Capital Disbursed</span>
        </div>
      </div>
    </div>
  );
};

export const RiskDistributionChart: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-bold text-slate-800">{t('dashboard.riskDistribution')}</h3>
          <span className="text-xs font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full">
            Avg Score: 86
          </span>
        </div>
        <p className="text-xs text-slate-400 mb-4">Portfolio breakdown across risk rating tiers</p>
      </div>

      <div className="h-48 w-full relative flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={riskDistributionData}
              innerRadius={55}
              outerRadius={75}
              paddingAngle={5}
              dataKey="value"
            >
              {riskDistributionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Value']}
              contentStyle={{
                backgroundColor: '#0F172A',
                border: 'none',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '12px'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xl font-extrabold text-slate-800">86%</span>
          <span className="text-[10px] text-emerald-600 font-bold uppercase">Low Risk</span>
        </div>
      </div>

      <div className="space-y-2 mt-4 pt-4 border-t border-slate-100">
        {riskDistributionData.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-slate-600 font-medium">{item.name}</span>
            </div>
            <span className="font-bold text-slate-800">
              <PrivacyMask value={item.value} type="currency" />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
