import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, ArrowRightLeft, RotateCcw, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const DemoBanner: React.FC = () => {
  const { t } = useTranslation();
  const { role, switchRole } = useAuth();
  const { resetAllDemoData } = useApp();
  const navigate = useNavigate();

  const handleToggleRole = () => {
    if (role === 'MSME') {
      switchRole('LENDER');
      navigate('/lender');
    } else {
      switchRole('MSME');
      navigate('/dashboard');
    }
  };

  const handleReset = async () => {
    if (window.confirm('Reset all demo invoices, pools, and requests to initial state?')) {
      await resetAllDemoData();
    }
  };

  return (
    <div className="bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 text-white text-xs py-1.5 px-4 border-b border-brand-800/40 shadow-sm relative z-40">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 bg-brand-600/80 text-brand-100 font-bold px-2 py-0.5 rounded text-[10px] tracking-wider uppercase shadow-sm">
            <Sparkles className="w-3 h-3 text-amber-300" />
            {t('common.demoMode')}
          </span>
          <span className="text-slate-300 hidden sm:inline">
            {t('common.prototypeNotice')}
          </span>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <div className="flex items-center bg-slate-800/80 rounded-lg p-0.5 border border-slate-700">
            <button
              onClick={() => {
                if (role !== 'MSME') {
                  switchRole('MSME');
                  navigate('/dashboard');
                }
              }}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                role === 'MSME'
                  ? 'bg-brand-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              MSME Portal
            </button>
            <button
              onClick={() => {
                if (role !== 'LENDER') {
                  switchRole('LENDER');
                  navigate('/lender');
                }
              }}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                role === 'LENDER'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Lender Portal
            </button>
          </div>

          <button
            onClick={handleToggleRole}
            className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded-lg border border-slate-700 text-xs transition-colors"
            title="Switch User Role"
          >
            <ArrowRightLeft className="w-3 h-3 text-brand-400" />
            <span className="hidden md:inline">{t('common.switchRole')}</span>
          </button>

          <button
            onClick={() => {
              if(window.confirm('Start 3-minute Hackathon Guided Tour? This will guide you from Landing Page through the MSME and Lender workflow.')) {
                switchRole('MSME');
                navigate('/dashboard');
              }
            }}
            className="flex items-center gap-1 bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold px-3 py-1 rounded-lg shadow-sm shadow-amber-500/20 text-xs transition-colors"
            title="Start Hackathon Demo Tour"
          >
            <Sparkles className="w-3 h-3" />
            <span className="hidden md:inline">Launch Guided Tour</span>
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-1 bg-slate-800/60 hover:bg-red-950/60 text-slate-300 hover:text-red-300 px-2 py-1 rounded-lg border border-slate-700/60 text-xs transition-colors"
            title="Reset Demo Data"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden lg:inline">Reset Demo</span>
          </button>
        </div>
      </div>
    </div>
  );
};
