import React from 'react';

export const KPISkeleton: React.FC = () => {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden">
      <div className="skeleton-shimmer absolute inset-0" />
      <div className="relative z-10 flex items-center justify-between mb-3">
        <div className="h-4 w-28 bg-slate-200 rounded" />
        <div className="w-9 h-9 bg-slate-200 rounded-xl" />
      </div>
      <div className="relative z-10">
        <div className="h-7 w-36 bg-slate-200 rounded mb-2" />
        <div className="h-3.5 w-24 bg-slate-200 rounded" />
      </div>
    </div>
  );
};

export const TableRowSkeleton: React.FC = () => {
  return (
    <div className="flex items-center justify-between py-4 px-4 border-b border-slate-100 relative overflow-hidden">
      <div className="skeleton-shimmer absolute inset-0 opacity-40" />
      <div className="flex items-center gap-3 relative z-10">
        <div className="w-8 h-8 rounded-lg bg-slate-200" />
        <div>
          <div className="h-4 w-24 bg-slate-200 rounded mb-1" />
          <div className="h-3 w-32 bg-slate-200 rounded" />
        </div>
      </div>
      <div className="h-4 w-20 bg-slate-200 rounded relative z-10" />
      <div className="h-6 w-16 bg-slate-200 rounded-full relative z-10" />
      <div className="h-4 w-12 bg-slate-200 rounded relative z-10" />
    </div>
  );
};

export const ChartSkeleton: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden h-72 flex flex-col justify-between">
      <div className="skeleton-shimmer absolute inset-0 opacity-50" />
      <div className="flex justify-between relative z-10">
        <div className="h-5 w-40 bg-slate-200 rounded" />
        <div className="h-4 w-20 bg-slate-200 rounded" />
      </div>
      <div className="flex items-end gap-3 h-40 pt-6 relative z-10">
        {[40, 65, 30, 85, 95, 50, 75].map((h, i) => (
          <div key={i} className="flex-1 bg-slate-200 rounded-t" style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
};
