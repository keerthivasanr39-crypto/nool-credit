import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ShieldCheck, TrendingUp, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const NoolBusinessScoreCard: React.FC = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith('ta') ? 'ta' : i18n.language?.startsWith('hi') ? 'hi' : 'en';

  const score = 84;

  const TRANSLATIONS = {
    en: {
      title: 'NOOL BUSINESS SCORE',
      subtitle: 'Comprehensive MSME Financial & Operational Health Engine',
      health: 'EXCELLENT HEALTH',
      lowRisk: 'Low Risk',
      higherThan: 'Higher than 82% of regional textile MSMEs',
      actionableTitle: 'Actionable Ways to Reach 90+ Score:',
      categories: [
        { name: 'Profile Completeness', score: 18, max: 20, pct: 90, color: 'bg-emerald-500' },
        { name: 'Document Verification', score: 20, max: 20, pct: 100, color: 'bg-emerald-600' },
        { name: 'Invoice Reliability', score: 18, max: 20, pct: 90, color: 'bg-brand-600' },
        { name: 'Payment History', score: 15, max: 20, pct: 75, color: 'bg-amber-500' },
        { name: 'Business Activity', score: 13, max: 20, pct: 65, color: 'bg-indigo-500' },
      ],
      recommendations: [
        'Upload latest Q2 audited bank statement (+3 pts)',
        'Add 2 more verified buyer purchase orders (+5 pts)',
        'Maintain 100% on-time settlement record with ABC Garments',
      ]
    },
    ta: {
      title: 'நூல் பிசினஸ் ஸ்கோர்',
      subtitle: 'முழுமையான MSME நிதி மற்றும் செயல்பாட்டு ஆரோக்கிய மதிப்பீடு',
      health: 'சிறந்த நிதி ஆரோக்கியம்',
      lowRisk: 'குறைந்த இடர்',
      higherThan: 'பிராந்திய ஜவுளி MSME-களில் 82%-ஐ விட உயர்ந்தது',
      actionableTitle: '90+ மதிப்பெண்ணை எட்டுவதற்கான நடைமுறை வழிகள்:',
      categories: [
        { name: 'சுயவிவர முழுமை', score: 18, max: 20, pct: 90, color: 'bg-emerald-500' },
        { name: 'ஆவண சரிபார்ப்பு', score: 20, max: 20, pct: 100, color: 'bg-emerald-600' },
        { name: 'இன்வாய்ஸ் நம்பகத்தன்மை', score: 18, max: 20, pct: 90, color: 'bg-brand-600' },
        { name: 'கட்டண வரலாறு', score: 15, max: 20, pct: 75, color: 'bg-amber-500' },
        { name: 'வணிக நடவடிக்கை', score: 13, max: 20, pct: 65, color: 'bg-indigo-500' },
      ],
      recommendations: [
        'சமீபத்திய வங்கி கணக்கு அறிக்கையை பதிவேற்றவும் (+3 புள்ளிகள்)',
        'மேலும் 2 சரிபார்க்கப்பட்ட வாங்குபவர் ஆர்டர்களைச் சேர்க்கவும் (+5 புள்ளிகள்)',
        'ABC Garments-உடன் 100% சரியான நேரக் கொடுப்பனவைப் பராமரிக்கவும்',
      ]
    },
    hi: {
      title: 'नूल बिज़नेस स्कोर',
      subtitle: 'व्यापक MSME वित्तीय और परिचालन स्वास्थ्य इंजन',
      health: 'उत्कृष्ट वित्तीय स्थिति',
      lowRisk: 'कम जोखिम',
      higherThan: 'क्षेत्रीय कपड़ा MSME के 82% से अधिक',
      actionableTitle: '90+ स्कोर तक पहुँचने के व्यावहारिक तरीके:',
      categories: [
        { name: 'प्रोफ़ाइल पूर्णता', score: 18, max: 20, pct: 90, color: 'bg-emerald-500' },
        { name: 'दस्तावेज़ सत्यापन', score: 20, max: 20, pct: 100, color: 'bg-emerald-600' },
        { name: 'इनवॉइस विश्वसनीयता', score: 18, max: 20, pct: 90, color: 'bg-brand-600' },
        { name: 'भुगतान इतिहास', score: 15, max: 20, pct: 75, color: 'bg-amber-500' },
        { name: 'व्यावसायिक गतिविधि', score: 13, max: 20, pct: 65, color: 'bg-indigo-500' },
      ],
      recommendations: [
        'नवीनतम Q2 ऑडिट किया गया बैंक विवरण अपलोड करें (+3 अंक)',
        '2 और सत्यापित खरीदार खरीद आदेश जोड़ें (+5 अंक)',
        'ABC Garments के साथ 100% समय पर निपटान रिकॉर्ड बनाए रखें',
      ]
    }
  };

  const text = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const categories = text.categories;
  const recommendations = text.recommendations;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-700 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-brand-700/20">
            <Sparkles className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-900">
              {text.title}
            </h3>
            <p className="text-xs text-slate-400">
              {text.subtitle}
            </p>
          </div>
        </div>

        <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
          {text.health}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left: Circular Gauge Score */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center p-4 bg-slate-50/80 rounded-2xl border border-slate-100 text-center">
          <div className="relative w-36 h-36 flex items-center justify-center">
            {/* SVG Circular Progress Ring */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                className="text-slate-200"
                strokeWidth="9"
                stroke="currentColor"
                fill="transparent"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="40"
                className="text-brand-600"
                strokeWidth="9"
                strokeDasharray={2 * Math.PI * 40}
                initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                animate={{ strokeDashoffset: (2 * Math.PI * 40) * (1 - score / 100) }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-3xl font-extrabold text-slate-900 leading-none"
              >
                {score}
              </motion.span>
              <span className="text-[11px] text-slate-400 font-semibold mt-0.5">/ 100</span>
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mt-1">
                {text.lowRisk}
              </span>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 font-medium">
            {text.higherThan}
          </p>
        </div>

        {/* Right: 5 Category Breakdown Bars */}
        <div className="lg:col-span-8 space-y-3">
          {categories.map((cat, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-700">{cat.name}</span>
                <span className="text-slate-900 font-bold">
                  {cat.score} <span className="text-slate-400 font-normal">/ {cat.max}</span>
                </span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${cat.pct}%` }}
                  transition={{ duration: 1, delay: idx * 0.1 }}
                  className={`h-full rounded-full ${cat.color}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations Checklist */}
      <div className="p-4 bg-brand-50/60 rounded-2xl border border-brand-100 space-y-2">
        <div className="text-xs font-bold text-brand-900 flex items-center gap-1.5">
          <TrendingUp className="w-4 h-4 text-brand-600" />
          <span>{text.actionableTitle}</span>
        </div>
        <div className="space-y-1.5 text-xs text-brand-800">
          {recommendations.map((rec, i) => (
            <div key={i} className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>{rec}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
