import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LayoutDashboard, FileText, Boxes, ShieldCheck, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const MobileNav: React.FC = () => {
  const { t } = useTranslation();
  const { role } = useAuth();

  const msmeTabs = [
    { name: 'Home', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Invoices', path: '/invoices', icon: FileText },
    { name: 'Pool', path: '/pool', icon: Boxes },
    { name: 'KYC', path: '/kyc', icon: ShieldCheck },
    { name: 'Eligibility', path: '/eligibility', icon: User },
  ];

  const lenderTabs = [
    { name: 'Overview', path: '/lender', icon: LayoutDashboard },
    { name: 'Review', path: '/lender/review', icon: Boxes },
    { name: 'History', path: '/history', icon: FileText },
  ];

  const tabs = role === 'MSME' ? msmeTabs : lenderTabs;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 py-1.5 px-2 shadow-lg">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-1 px-3 rounded-xl text-[10px] font-semibold transition-all ${
                  isActive
                    ? 'text-brand-600 bg-brand-50 font-bold scale-105'
                    : 'text-slate-500 hover:text-slate-800'
                }`
              }
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span>{tab.name}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};
