import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, UserCheck, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const DemoModeBanner: React.FC = () => {
  const { role, switchRole } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <aside aria-label="Demo mode switcher" className="bg-gradient-to-r from-blue-900/60 via-indigo-900/60 to-cyan-900/60 border-b border-blue-500/20 px-4 py-1.5 text-xs text-slate-300 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-white uppercase tracking-wider flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            {t('nav.demoMode')}:
          </span>
          <span className="text-slate-300 hidden sm:inline">
            Switch between MSME and Institutional Lender view instantly
          </span>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-900/80 p-0.5 rounded-lg border border-slate-700/60">
          <button
            onClick={() => {
              switchRole('MSME');
              navigate('/msme/dashboard');
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
              role === 'MSME'
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/50'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>MSME (Sri Lakshmi Knits)</span>
          </button>

          <button
            onClick={() => {
              switchRole('LENDER');
              navigate('/lender/dashboard');
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
              role === 'LENDER'
                ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-500/50'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Lender (Apex Capital)</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
