import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings,
  Globe,
  Bell,
  Sun,
  Moon,
  ShieldCheck,
  Lock,
  LogOut,
  CheckCircle2,
  Eye,
  EyeOff
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

export const SettingsPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { logout, role, user } = useAuth();
  const { hideFinancials, toggleHideFinancials } = useApp();
  const navigate = useNavigate();

  const [notificationEmail, setNotificationEmail] = useState(true);
  const [notificationSMS, setNotificationSMS] = useState(true);
  const [notificationDisbursement, setNotificationDisbursement] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const languages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
    { code: 'hi', name: 'Hindi', native: 'हिंदी' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు' },
    { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  ];

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem('i18nextLng', langCode);
  };

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-brand-900 via-brand-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-brand-700/80 border border-brand-500/40 flex items-center justify-center">
            <Settings className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold">Portal Settings</h1>
            <p className="text-xs text-brand-200">Language, notification preferences, privacy, and account settings</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-rose-600/80 hover:bg-rose-600 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

      <div className="space-y-6">
        {/* 1. Indian Languages Selection */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <Globe className="w-5 h-5 text-brand-600" />
              <h3 className="text-sm font-bold text-slate-900">Multilingual Support (6 Indian Languages)</h3>
            </div>
            <span className="text-[11px] font-bold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-full">
              Instant Switching
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {languages.map((lang) => {
              const isSelected = i18n.language === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-brand-50 border-brand-500 text-brand-900 font-bold shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs">{lang.name}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-brand-600" />}
                  </div>
                  <span className="text-sm font-extrabold mt-1">{lang.native}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Privacy & Financial Masking */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h3 className="text-sm font-bold text-slate-900">Privacy & Financial Masking</h3>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs">
            <div>
              <div className="font-bold text-slate-800">Mask Financial Balances (Public View)</div>
              <div className="text-slate-400 text-[11px] mt-0.5">
                Replaces live rupees with ••••• when presenting in demo/office mode
              </div>
            </div>
            <button
              onClick={toggleHideFinancials}
              className={`px-4 py-2 rounded-xl font-bold text-xs transition-colors flex items-center gap-1.5 ${
                hideFinancials
                  ? 'bg-brand-600 text-white'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              {hideFinancials ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{hideFinancials ? 'Masked' : 'Visible'}</span>
            </button>
          </div>
        </div>

        {/* 3. Notification Preferences */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <Bell className="w-5 h-5 text-amber-600" />
              <h3 className="text-sm font-bold text-slate-900">Notification Alerts</h3>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100 cursor-pointer">
              <span className="font-semibold text-slate-800">Email Alerts on Lender Approval Decision</span>
              <input
                type="checkbox"
                checked={notificationEmail}
                onChange={(e) => setNotificationEmail(e.target.checked)}
                className="w-4 h-4 text-brand-600 rounded"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100 cursor-pointer">
              <span className="font-semibold text-slate-800">Instant SMS on Bank IMPS Disbursement</span>
              <input
                type="checkbox"
                checked={notificationSMS}
                onChange={(e) => setNotificationSMS(e.target.checked)}
                className="w-4 h-4 text-brand-600 rounded"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100 cursor-pointer">
              <span className="font-semibold text-slate-800">Daily Working Capital & Risk Score Digest</span>
              <input
                type="checkbox"
                checked={notificationDisbursement}
                onChange={(e) => setNotificationDisbursement(e.target.checked)}
                className="w-4 h-4 text-brand-600 rounded"
              />
            </label>
          </div>
        </div>

        {/* 4. Theme & Appearance */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <Sun className="w-5 h-5 text-amber-500" />
              <h3 className="text-sm font-bold text-slate-900">Theme & UI Appearance</h3>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <button
              onClick={() => setIsDarkMode(false)}
              className={`p-4 rounded-2xl border text-left flex items-center justify-between ${
                !isDarkMode
                  ? 'bg-brand-50 border-brand-500 text-brand-900 font-bold'
                  : 'bg-slate-50 border-slate-200 text-slate-600'
              }`}
            >
              <div className="flex items-center gap-2">
                <Sun className="w-4 h-4 text-amber-500" />
                <span>Light Professional (Recommended)</span>
              </div>
              {!isDarkMode && <CheckCircle2 className="w-4 h-4 text-brand-600" />}
            </button>

            <button
              onClick={() => setIsDarkMode(true)}
              className={`p-4 rounded-2xl border text-left flex items-center justify-between ${
                isDarkMode
                  ? 'bg-slate-900 border-slate-700 text-white font-bold'
                  : 'bg-slate-50 border-slate-200 text-slate-600'
              }`}
            >
              <div className="flex items-center gap-2">
                <Moon className="w-4 h-4 text-slate-400" />
                <span>Dark Slate Mode</span>
              </div>
              {isDarkMode && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
            </button>
          </div>
        </div>

        {/* Save button feedback */}
        <div className="flex items-center justify-between pt-2">
          {saveSuccess ? (
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Preferences saved successfully!
            </span>
          ) : <div />}

          <button
            onClick={handleSave}
            className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
          >
            Save All Preferences
          </button>
        </div>
      </div>
    </div>
  );
};
