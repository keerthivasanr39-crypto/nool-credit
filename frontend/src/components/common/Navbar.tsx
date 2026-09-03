import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Layers,
  LayoutDashboard,
  FileText,
  Boxes,
  Send,
  ShieldCheck,
  Calculator,
  History,
  Mic,
  LogOut,
  User,
  Menu,
  X,
  Bot,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { LanguageSelector } from './LanguageSelector';
import { NotificationCenter } from './NotificationCenter';
import { PrivacyToggleBtn } from './PrivacyMask';

export const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith('ta') ? 'ta' : i18n.language?.startsWith('hi') ? 'hi' : 'en';
  const { user, role, logout } = useAuth();
  const { openVoice } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const isMSME = role === 'MSME';

  const aiLabel = currentLang === 'ta' ? 'AI சாட்' : currentLang === 'hi' ? 'AI चैट' : 'AI Chat';

  const msmeNavLinks = [
    { name: t('nav.dashboard'), path: '/dashboard', icon: LayoutDashboard },
    { name: t('nav.invoices'), path: '/invoices', icon: FileText },
    { name: t('nav.invoicePool'), path: '/pool', icon: Boxes },
    { name: t('nav.eligibility'), path: '/eligibility', icon: ShieldCheck },
    { name: t('nav.calculator'), path: '/calculator', icon: Calculator },
    { name: aiLabel, path: '/ai-assistant', icon: Bot },
    { name: t('nav.history'), path: '/history', icon: History },
  ];

  const lenderNavLinks = [
    { name: 'Lender Overview', path: '/lender', icon: LayoutDashboard },
    { name: 'Review Applications', path: '/lender/review', icon: Send },
    { name: t('nav.history'), path: '/history', icon: History },
  ];

  const navLinks = isMSME ? msmeNavLinks : lenderNavLinks;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-6">
            <Link to={user ? (role === 'MSME' ? '/dashboard' : '/lender') : '/landing'} className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-900 via-brand-800 to-brand-600 flex items-center justify-center text-white shadow-md shadow-brand-900/20 group-hover:scale-105 transition-transform">
                <Layers className="w-5 h-5 text-amber-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-extrabold tracking-tight text-slate-900 flex items-center gap-1">
                  NOOL <span className="text-brand-600">CREDIT</span>
                </span>
                <span className="text-[9px] uppercase tracking-wider font-semibold text-slate-400 -mt-1">
                  FinTech Invoice Capital
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 pl-4 border-l border-slate-200">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-brand-50 text-brand-700 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-brand-600' : 'text-slate-400'}`} />
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2.5">
            {/* Ask NOOL Voice Quick Action */}
            <button
              onClick={openVoice}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-brand-50 to-blue-50 text-brand-700 border border-brand-200/80 hover:bg-brand-100/60 shadow-xs transition-all animate-pulse-subtle"
              title="Voice Assistant"
            >
              <Mic className="w-3.5 h-3.5 text-brand-600 animate-pulse" />
              <span className="hidden sm:inline">NOOL VOICE</span>
            </button>

            {/* Privacy Hide/Show Balance Toggle */}
            <PrivacyToggleBtn />

            {/* Language Selector */}
            <LanguageSelector compact />

            {/* Notification Center */}
            <NotificationCenter />

            {/* User Profile Pill / Logout */}
            <div className="hidden sm:flex items-center gap-2.5 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-700 to-blue-600 text-white font-extrabold text-xs flex items-center justify-center shadow-xs uppercase">
                {(user?.name || 'K').charAt(0)}
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-extrabold text-slate-900 leading-tight">
                  {user?.name || 'Karthik Subramanian'}
                </span>
                <span className="text-[10px] text-slate-500 font-semibold truncate max-w-[140px]">
                  {user?.businessName || 'Sri Lakshmi Knits'}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 ml-1 text-rose-600 hover:text-white hover:bg-rose-600 rounded-lg transition-colors font-bold text-xs border border-rose-200 bg-rose-50/60 shadow-xs"
                title={t('nav.logout')}
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-slate-100 space-y-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium ${
                    isActive ? 'bg-brand-50 text-brand-700 font-semibold' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4 h-4 text-brand-600" />
                  {link.name}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};
