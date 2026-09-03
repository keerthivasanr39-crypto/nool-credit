import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  TrendingUp,
  FileCheck,
  Boxes,
  Building,
  CheckCircle2,
  Mic,
  Clock,
  Award,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LanguageSelector } from '../components/common/LanguageSelector';
import { PrivacyMask } from '../components/common/PrivacyMask';

export const LandingPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { openVoice } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 overflow-hidden">
      {/* Top Floating Announcement */}
      <div className="bg-brand-950 text-white text-xs py-2 px-4 border-b border-brand-800 flex items-center justify-between">
        <div className="max-w-7xl mx-auto flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <span className="bg-brand-600 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded text-white tracking-wider">
              FinTech Prototype
            </span>
            <span className="text-slate-300 text-[11px] hidden sm:inline">
              Built for Indian Textile & Manufacturing MSMEs
            </span>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSelector compact />
            <Link
              to="/auth"
              className="text-amber-300 hover:text-amber-200 font-bold text-[11px] flex items-center gap-1"
            >
              Sign In <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & CTA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200/80 text-brand-700 text-xs font-bold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Digital Working Capital Facilitation</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
              {t('landing.heroTitle')}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {t('landing.heroSubtitle')}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/dashboard"
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-lg shadow-brand-600/25 hover:shadow-brand-600/40 transition-all hover:scale-[1.02]"
              >
                <span>{t('landing.getStartedBtn')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                onClick={openVoice}
                className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-brand-800 border border-slate-200 font-bold text-sm shadow-sm transition-all hover:scale-[1.02]"
              >
                <Mic className="w-4 h-4 text-brand-600 animate-pulse" />
                <span>{t('landing.askNoolVoice')}</span>
              </button>
            </div>

            {/* Micro Trust Badges */}
            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <div className="text-xl font-extrabold text-slate-900">₹4.8 Cr+</div>
                <div className="text-[11px] text-slate-500 font-medium">Invoices Assessed</div>
              </div>
              <div>
                <div className="text-xl font-extrabold text-emerald-600">85%</div>
                <div className="text-[11px] text-slate-500 font-medium">Advance Ratio</div>
              </div>
              <div>
                <div className="text-xl font-extrabold text-brand-700">48 Hours</div>
                <div className="text-[11px] text-slate-500 font-medium">Disbursement Target</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Animated Floating Financial Flow Graphics */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-sm sm:max-w-md space-y-4">
              {/* Floating Card 1: Invoice */}
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xl relative z-10"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-brand-700 flex items-center justify-center font-bold text-xs">
                      INV
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800">INV-1001</div>
                      <div className="text-[10px] text-slate-400">ABC Garments Ltd</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    VERIFIED ✓
                  </span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-slate-100">
                  <span className="text-xs text-slate-500">Invoice Value</span>
                  <span className="text-lg font-extrabold text-slate-900">₹1,00,000</span>
                </div>
              </motion.div>

              {/* Animated Connecting Node */}
              <div className="flex justify-center">
                <div className="w-0.5 h-6 bg-gradient-to-b from-brand-500 to-emerald-500" />
              </div>

              {/* Floating Card 2: Risk Score */}
              <motion.div
                animate={{ y: [4, -4, 4] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                className="bg-gradient-to-br from-brand-900 to-slate-900 text-white rounded-3xl p-5 shadow-xl relative z-20"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-brand-300 uppercase tracking-wider">
                    Explainable Risk Engine
                  </span>
                  <span className="text-[10px] font-extrabold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full">
                    LOW RISK
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-extrabold tracking-tight text-white">86 <span className="text-sm font-normal text-slate-400">/ 100</span></div>
                    <div className="text-[11px] text-slate-300">Strong buyer payment history</div>
                  </div>
                  <ShieldCheck className="w-10 h-10 text-emerald-400" />
                </div>
              </motion.div>

              {/* Animated Connecting Node */}
              <div className="flex justify-center">
                <div className="w-0.5 h-6 bg-gradient-to-b from-emerald-500 to-brand-500" />
              </div>

              {/* Floating Card 3: Financing */}
              <motion.div
                animate={{ y: [-3, 3, -3] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className="bg-white rounded-3xl p-5 border border-emerald-200 shadow-xl relative z-10"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-800">Financing Eligible</span>
                  <span className="text-[11px] font-bold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-full">
                    85% Advance
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-slate-500">Immediate Working Capital</span>
                  <span className="text-xl font-extrabold text-emerald-600">₹85,000</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem Timeline Section: You finished the work. Why wait for money? */}
      <section className="py-16 bg-white border-y border-slate-200/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-4 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
            The MSME Cash Flow Gap
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            {t('landing.problemTitle')}
          </h2>
          <p className="text-sm text-slate-500 max-w-2xl mx-auto">
            {t('landing.problemSubtitle')}
          </p>
        </div>

        {/* 4-Stage Problem Timeline */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              day: 'DAY 1',
              title: 'Work Completed & Delivered',
              desc: 'Textile goods manufactured and shipped to buyer.',
              icon: CheckCircle2,
              color: 'text-brand-600 bg-brand-50'
            },
            {
              day: 'DAY 30',
              title: 'Invoice Pending Clearance',
              desc: 'Invoice submitted but waiting in buyer ERP queue.',
              icon: Clock,
              color: 'text-amber-600 bg-amber-50'
            },
            {
              day: 'DAY 60',
              title: 'Severe Cash Flow Strain',
              desc: 'Worker wages and raw material procurement due.',
              icon: Clock,
              color: 'text-rose-600 bg-rose-50'
            },
            {
              day: 'DAY 90',
              title: 'Late Payment Received',
              desc: 'Payment arrives after 3 critical business months.',
              icon: CheckCircle2,
              color: 'text-slate-600 bg-slate-100'
            }
          ].map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50 p-5 rounded-3xl border border-slate-200/80 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-extrabold text-slate-900 tracking-wider">
                      {step.day}
                    </span>
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${step.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h4 className="text-xs font-bold text-slate-800 mb-1">{step.title}</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Solution Bridge Banner */}
        <div className="max-w-3xl mx-auto mt-10 p-6 rounded-3xl bg-gradient-to-r from-brand-900 to-brand-800 text-white text-center shadow-lg">
          <h3 className="text-lg font-bold">{t('landing.gapTitle')}</h3>
          <p className="text-xs text-brand-200 mt-1 max-w-xl mx-auto">
            Convert pending 60-90 day invoices into immediate capital within 48 hours.
          </p>
        </div>
      </section>

      {/* How It Works 5 Steps Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-3 py-1 rounded-full">
            Digital Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            {t('landing.howItWorksTitle')}
          </h2>
          <p className="text-sm text-slate-500 max-w-xl mx-auto">
            {t('landing.howItWorksSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            {
              num: '01',
              title: t('landing.step1Title'),
              desc: t('landing.step1Desc'),
              icon: FileCheck
            },
            {
              num: '02',
              title: t('landing.step2Title'),
              desc: t('landing.step2Desc'),
              icon: ShieldCheck
            },
            {
              num: '03',
              title: t('landing.step3Title'),
              desc: t('landing.step3Desc'),
              icon: Award
            },
            {
              num: '04',
              title: t('landing.step4Title'),
              desc: t('landing.step4Desc'),
              icon: Boxes
            },
            {
              num: '05',
              title: t('landing.step5Title'),
              desc: t('landing.step5Desc'),
              icon: Zap
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between text-left"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-brand-50 text-brand-700 flex items-center justify-center border border-brand-100 font-bold text-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-extrabold text-slate-300">{item.num}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-800 mb-1 leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="py-16 bg-slate-900 text-white px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {t('landing.ctaTitle')}
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
            {t('landing.ctaSubtitle')}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/dashboard"
              className="px-8 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-lg transition-all"
            >
              {t('landing.exploreDemoBtn')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
