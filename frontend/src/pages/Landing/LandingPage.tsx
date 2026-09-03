import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  ArrowRight, 
  ShieldCheck, 
  Layers, 
  FileCheck2, 
  Cpu, 
  TrendingUp, 
  Sparkles, 
  CheckCircle2, 
  Building2,
  Lock,
  Zap,
  Globe2,
  FolderLock,
  Bot
} from 'lucide-react';
import { TimelineFlow } from '../../components/animations/TimelineFlow';
import { CircularRiskScore } from '../../components/animations/CircularRiskScore';
import { NoolGuideModal } from '../../components/ai/NoolGuideModal';
import { useAuth } from '../../context/AuthContext';

export const LandingPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { switchRole } = useAuth();
  const [guideModalOpen, setGuideModalOpen] = useState(false);

  const handleStartDemo = (role: 'MSME' | 'LENDER') => {
    switchRole(role);
    if (role === 'MSME') {
      navigate('/msme/dashboard');
    } else {
      navigate('/lender/dashboard');
    }
  };

  return (
    <div className="min-h-screen space-y-24 pb-16">
      {/* HERO SECTION */}
      <section className="relative pt-12 lg:pt-20 px-4 max-w-7xl mx-auto overflow-hidden">
        {/* Glowing backdrop orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Pill Badge with Readiness preview */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-semibold text-blue-400">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>{t('hero.readinessBadge')}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-display leading-[1.15]">
              {t('hero.headline')}
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              {t('hero.subheadline')}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => handleStartDemo('MSME')}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-sm font-bold shadow-xl shadow-blue-500/25 flex items-center gap-2 transition-all hover:scale-[1.02]"
              >
                <span>{t('hero.getStarted')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleStartDemo('MSME')}
                className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-200 text-sm font-semibold flex items-center gap-2 transition-all hover:scale-[1.02]"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>{t('hero.checkReadiness')}</span>
              </button>

              <button
                onClick={() => setGuideModalOpen(true)}
                className="px-5 py-3.5 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-500/30 text-cyan-300 text-sm font-semibold flex items-center gap-2 transition-all"
              >
                <Bot className="w-4 h-4 text-cyan-400" />
                <span>Ask Nool Guide AI</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Tiruppur & Manufacturing MSMEs</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>6 Indian Languages (EN/தமிழ்/हिंदी/తెలుగు/ಕನ್ನಡ/മലയാളം)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>One-Time Document Vault</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Animated Fintech Visual Flow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-5 relative flex justify-center"
          >
            {/* Glowing animated visual card stack */}
            <div className="w-full max-w-sm relative space-y-4">
              {/* Card 1: INVOICE */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
                className="glass-card p-4 rounded-2xl border border-blue-500/30 glow-blue flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
                    <FileCheck2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">INVOICE</span>
                    <span className="text-base font-bold text-white font-mono">INV-1001</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black text-white font-display">₹1,00,000</span>
                  <span className="text-[10px] text-emerald-400 block font-medium">Verified 95%</span>
                </div>
              </motion.div>

              {/* Animated Connector Arrow 1 */}
              <div className="flex justify-center -my-2 relative z-20">
                <div className="w-7 h-7 rounded-full bg-slate-900 border border-blue-500/40 flex items-center justify-center text-blue-400 shadow-md">
                  <ArrowRight className="w-3.5 h-3.5 rotate-90" />
                </div>
              </div>

              {/* Card 2: RISK SCORE */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut' }}
                className="glass-card p-4 rounded-2xl border border-emerald-500/30 glow-emerald flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">RISK SCORE</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-white font-display">86</span>
                      <span className="text-xs text-slate-400 font-normal">/100</span>
                    </div>
                  </div>
                </div>
                <div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                    LOW RISK
                  </span>
                </div>
              </motion.div>

              {/* Animated Connector Arrow 2 */}
              <div className="flex justify-center -my-2 relative z-20">
                <div className="w-7 h-7 rounded-full bg-slate-900 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-md">
                  <ArrowRight className="w-3.5 h-3.5 rotate-90" />
                </div>
              </div>

              {/* Card 3: FINANCING */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                className="glass-card p-4 rounded-2xl border border-cyan-500/30 glow-cyan flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-cyan-600/20 text-cyan-400 border border-cyan-500/30">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">ESTIMATED FINANCING (85%)</span>
                    <span className="text-xl font-black text-cyan-400 font-display">₹85,000</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono font-semibold">
                    Instant 24hr
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="px-4 max-w-7xl mx-auto">
        <div className="text-center space-y-3 mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
            The MSME Working Capital Dilemma
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
            {t('problem.title')}
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto">
            {t('problem.subtitle')}
          </p>
        </div>

        <TimelineFlow />
      </section>

      {/* HOW IT WORKS: 6-STEP WORKFLOW */}
      <section className="px-4 max-w-7xl mx-auto">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            Intelligent 6-Step Digital Process
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
            {t('howItWorks.title')}
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto">
            {t('howItWorks.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            {
              step: '01',
              title: t('howItWorks.step1Title'),
              desc: t('howItWorks.step1Desc'),
              icon: FileCheck2,
              color: 'text-blue-400',
              border: 'border-blue-500/30',
            },
            {
              step: '02',
              title: t('howItWorks.step2Title'),
              desc: t('howItWorks.step2Desc'),
              icon: ShieldCheck,
              color: 'text-cyan-400',
              border: 'border-cyan-500/30',
            },
            {
              step: '03',
              title: t('howItWorks.step3Title'),
              desc: t('howItWorks.step3Desc'),
              icon: Cpu,
              color: 'text-emerald-400',
              border: 'border-emerald-500/30',
            },
            {
              step: '04',
              title: t('howItWorks.step4Title'),
              desc: t('howItWorks.step4Desc'),
              icon: Layers,
              color: 'text-purple-400',
              border: 'border-purple-500/30',
            },
            {
              step: '05',
              title: t('howItWorks.step5Title'),
              desc: t('howItWorks.step5Desc'),
              icon: Sparkles,
              color: 'text-indigo-400',
              border: 'border-indigo-500/30',
            },
            {
              step: '06',
              title: t('howItWorks.step6Title'),
              desc: t('howItWorks.step6Desc'),
              icon: TrendingUp,
              color: 'text-amber-400',
              border: 'border-amber-500/30',
            },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className={`glass-card p-4 rounded-2xl border ${item.border} hover:-translate-y-1 transition-all space-y-2 relative overflow-hidden`}
              >
                <span className="text-xl font-extrabold text-slate-800 font-display absolute top-2 right-3 select-none">
                  {item.step}
                </span>
                <div className={`w-9 h-9 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center ${item.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold text-white font-display">
                  {item.title}
                </h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Embedded Nool Guide Modal */}
      <NoolGuideModal isOpen={guideModalOpen} onClose={() => setGuideModalOpen(false)} />
    </div>
  );
};
