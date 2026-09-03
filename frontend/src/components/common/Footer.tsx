import React from 'react';
import { useTranslation } from 'react-i18next';
import { Layers, ShieldCheck, Award, Lock, ExternalLink } from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 mt-20 pb-20 lg:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-brand-700 flex items-center justify-center text-white shadow-md">
                <Layers className="w-5 h-5 text-amber-300" />
              </div>
              <span className="text-base font-extrabold text-white tracking-tight">
                NOOL <span className="text-brand-400">CREDIT</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Empowering Indian textile and manufacturing MSMEs to unlock working capital from pending invoices through transparent, explainable risk assessment and streamlined lender workflows.
            </p>
            <div className="flex items-center gap-3 text-slate-300">
              <span className="flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700 text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 256-bit Encryption
              </span>
              <span className="flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700 text-[11px]">
                <Lock className="w-3.5 h-3.5 text-brand-400" /> Data Privacy First
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-slate-200 font-bold text-xs uppercase tracking-wider mb-3">Product Workflows</h4>
            <ul className="space-y-2">
              <li><a href="/invoices" className="hover:text-white transition-colors">Invoice Upload</a></li>
              <li><a href="/pool" className="hover:text-white transition-colors">Invoice Pooling</a></li>
              <li><a href="/eligibility" className="hover:text-white transition-colors">NOOL Credit Score</a></li>
              <li><a href="/calculator" className="hover:text-white transition-colors">Financing Calculator</a></li>
              <li><a href="/government-schemes" className="hover:text-white transition-colors flex items-center gap-1 text-emerald-400">Govt Support <ExternalLink className="w-3 h-3" /></a></li>
            </ul>
          </div>

          {/* Project Docs */}
          <div>
            <h4 className="text-slate-200 font-bold text-xs uppercase tracking-wider mb-3">About & Ecosystem</h4>
            <ul className="space-y-2">
              <li><a href="/target-audience" className="hover:text-white transition-colors">Target Audience</a></li>
              <li><a href="/impact" className="hover:text-white transition-colors">Our Impact</a></li>
              <li><a href="/business-model" className="hover:text-white transition-colors">Business Model</a></li>
              <li><a href="/cost-model" className="hover:text-white transition-colors">Cost & Economics</a></li>
              <li><a href="/architecture" className="hover:text-white transition-colors">System Architecture</a></li>
            </ul>
          </div>

          {/* Regional & Disclaimers */}
          <div>
            <h4 className="text-slate-200 font-bold text-xs uppercase tracking-wider mb-3">Language & Region</h4>
            <p className="text-[11px] text-slate-400 mb-3 leading-normal">
              Designed for Indian MSME hubs in Tiruppur, Coimbatore, Surat, Ahmedabad, and Ludhiana.
            </p>
            <div className="mb-4">
              <LanguageSelector />
            </div>
          </div>
        </div>

        {/* Prototype Legal Disclaimer Notice */}
        <div className="mt-10 pt-6 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-[11px] text-slate-400">
          <div>
            <p className="font-semibold text-slate-300">
              ⚡ Prototype FinTech Demonstration — NOOL CREDIT
            </p>
            <p className="text-slate-400 mt-0.5 max-w-3xl">
              Nool Credit is a prototype platform designed to simplify MSME invoice-financing workflows. It does not itself guarantee financing or represent that it is a bank, NBFC, government authority, or regulated lender. Actual financing, government benefits, eligibility and approval depend on the relevant institution, applicable regulations and partner terms.
            </p>
          </div>
          <div className="shrink-0 text-slate-400 font-medium">
            © 2026 NOOL CREDIT Inc. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
