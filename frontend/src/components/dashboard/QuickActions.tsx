import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  UploadCloud,
  FileSpreadsheet,
  ShieldCheck,
  Activity,
  Boxes,
  Coins,
  FolderLock,
  BarChart3,
  Mic,
  Target,
  Briefcase,
  User,
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const QuickActions: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { openVoice } = useApp();
  const [clickedActionId, setClickedActionId] = useState<string | null>(null);

  const currentLang = i18n.language?.startsWith('ta') ? 'ta' : i18n.language?.startsWith('hi') ? 'hi' : 'en';

  const ACTION_TRANSLATIONS: Record<string, Record<string, { label: string; short: string; desc: string }>> = {
    upload: {
      en: { label: 'Upload Invoice', short: 'Upload', desc: 'Instant OCR & extraction' },
      ta: { label: 'இன்வாய்ஸ் பதிவேற்று', short: 'பதிவேற்று', desc: 'உடனடி OCR & சரிபார்ப்பு' },
      hi: { label: 'इनवॉइस अपलोड', short: 'अपलोड', desc: 'त्वरित OCR और निष्कर्षण' }
    },
    invoices: {
      en: { label: 'My Invoices', short: 'Invoices', desc: 'Manage pending & verified' },
      ta: { label: 'என் இன்வாய்ஸ்கள்', short: 'இன்வாய்ஸ்கள்', desc: 'நிலுவை & சரிபார்க்கப்பட்டவை' },
      hi: { label: 'मेरे इनवॉइस', short: 'इनवॉइस', desc: 'लंबित और सत्यापित प्रबंधित करें' }
    },
    eligibility: {
      en: { label: 'Check Eligibility', short: 'Eligibility', desc: 'Instant assessment calculator' },
      ta: { label: 'தகுதி சரிபார்ப்பு', short: 'தகுதி', desc: 'உடனடி நிதி தகுதி கணக்கீடு' },
      hi: { label: 'पात्रता जांचें', short: 'पात्रता', desc: 'त्वरित मूल्यांकन कैलकुलेटर' }
    },
    risk: {
      en: { label: 'Risk Score', short: 'Risk Score', desc: 'Explainable credit engine' },
      ta: { label: 'இடர் மதிப்பீடு', short: 'இடர் ஸ்கோர்', desc: 'வெளிப்படையான கிரெடிட் பொறி' },
      hi: { label: 'जोखिम स्कोर', short: 'जोखिम स्कोर', desc: 'स्पष्टीकरणीय क्रेडिट इंजन' }
    },
    bundle: {
      en: { label: 'Bundle Invoices', short: 'Bundle', desc: 'Pool invoices into capital' },
      ta: { label: 'இன்வாய்ஸ் தொகுப்பு', short: 'தொகுப்பு', desc: 'இன்வாய்ஸ்களை மூலதனமாக மாற்று' },
      hi: { label: 'इनवॉइस बंडलिंग', short: 'बंडल', desc: 'इनवॉइस को पूंजी में पूल करें' }
    },
    financing: {
      en: { label: 'Financing', short: 'Financing', desc: 'Track requests & payouts' },
      ta: { label: 'நிதி கோரிக்கைகள்', short: 'நிதி', desc: 'கோரிக்கைகள் & வழங்கல் கண்காணிப்பு' },
      hi: { label: 'वित्तपोषण', short: 'वित्तपोषण', desc: 'अनुरोध और भुगतान ट्रैक करें' }
    },
    documents: {
      en: { label: 'Documents', short: 'Documents', desc: 'Central MSME vault' },
      ta: { label: 'ஆவணங்கள்', short: 'ஆவணங்கள்', desc: 'மையப்படுத்தப்பட்ட MSME பெட்டகம்' },
      hi: { label: 'दस्तावेज़', short: 'दस्तावेज़', desc: 'केंद्रीय MSME वॉल्ट' }
    },
    analytics: {
      en: { label: 'Analytics', short: 'Analytics', desc: 'Growth & cash flow trends' },
      ta: { label: 'பகுப்பாய்வு', short: 'பகுப்பாய்வு', desc: 'வளர்ச்சி & பணப்புழக்கப் போக்கு' },
      hi: { label: 'विश्लेषण', short: 'विश्लेषण', desc: 'वृद्धि और नकदी प्रवाह रुझान' }
    },
    voice: {
      en: { label: 'Voice Assistant', short: 'Voice Guide', desc: 'Speech-to-text queries' },
      ta: { label: 'குரல் உதவியாளர்', short: 'குரல் உதவி', desc: 'பேசி கேள்விகளைக் கேளுங்கள்' },
      hi: { label: 'वॉयस असिस्टेंट', short: 'वॉयस गाइड', desc: 'बोलकर प्रश्न पूछें' }
    },
    goals: {
      en: { label: 'Financial Goals', short: 'Goals', desc: 'Machinery & capital milestones' },
      ta: { label: 'நிதி இலக்குகள்', short: 'இலக்குகள்', desc: 'இயந்திரங்கள் & மூலதன மைல்கற்கள்' },
      hi: { label: 'वित्तीय लक्ष्य', short: 'लक्ष्य', desc: 'मशीनरी और पूंजी मील के पत्थर' }
    },
    lender: {
      en: { label: 'Lender Requests', short: 'Lender Portal', desc: 'Review & approve pools' },
      ta: { label: 'கடன் கோரிக்கைகள்', short: 'கடன் தளம்', desc: 'தொகுப்புகளை மதிப்பாய்வு செய்' },
      hi: { label: 'ऋणदाता अनुरोध', short: 'ऋणदाता पोर्टल', desc: 'पूल की समीक्षा और अनुमोदन' }
    },
    profile: {
      en: { label: 'Profile', short: 'Profile', desc: 'MSME business info' },
      ta: { label: 'சுயவிவரம்', short: 'சுயவிவரம்', desc: 'MSME நிறுவன விவரங்கள்' },
      hi: { label: 'प्रोफ़ाइल', short: 'प्रोफ़ाइल', desc: 'MSME व्यावसायिक जानकारी' }
    }
  };

  const getActionText = (id: string, field: 'label' | 'short' | 'desc', defaultVal: string) => {
    return ACTION_TRANSLATIONS[id]?.[currentLang]?.[field] || defaultVal;
  };

  const actions = [
    {
      id: 'upload',
      label: getActionText('upload', 'label', 'Upload Invoice'),
      short: getActionText('upload', 'short', 'Upload'),
      desc: getActionText('upload', 'desc', 'Instant OCR & extraction'),
      icon: UploadCloud,
      color: 'bg-blue-50 text-blue-700 border-blue-200 group-hover:bg-blue-600 group-hover:text-white',
      badge: 'Fast',
      action: () => navigate('/invoices?action=upload')
    },
    {
      id: 'invoices',
      label: getActionText('invoices', 'label', 'My Invoices'),
      short: getActionText('invoices', 'short', 'Invoices'),
      desc: getActionText('invoices', 'desc', 'Manage pending & verified'),
      icon: FileSpreadsheet,
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200 group-hover:bg-indigo-600 group-hover:text-white',
      badge: 'Portfolio',
      action: () => navigate('/invoices')
    },
    {
      id: 'eligibility',
      label: getActionText('eligibility', 'label', 'Check Eligibility'),
      short: getActionText('eligibility', 'short', 'Eligibility'),
      desc: getActionText('eligibility', 'desc', 'Instant assessment calculator'),
      icon: ShieldCheck,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200 group-hover:bg-emerald-600 group-hover:text-white',
      badge: 'AI Score',
      action: () => navigate('/eligibility')
    },
    {
      id: 'risk',
      label: getActionText('risk', 'label', 'Risk Score'),
      short: getActionText('risk', 'short', 'Risk Score'),
      desc: getActionText('risk', 'desc', 'Explainable credit engine'),
      icon: Activity,
      color: 'bg-amber-50 text-amber-700 border-amber-200 group-hover:bg-amber-600 group-hover:text-white',
      badge: '86/100',
      action: () => navigate('/risk')
    },
    {
      id: 'bundle',
      label: getActionText('bundle', 'label', 'Bundle Invoices'),
      short: getActionText('bundle', 'short', 'Bundle'),
      desc: getActionText('bundle', 'desc', 'Pool invoices into capital'),
      icon: Boxes,
      color: 'bg-purple-50 text-purple-700 border-purple-200 group-hover:bg-purple-600 group-hover:text-white',
      badge: 'Core USP',
      action: () => navigate('/pool')
    },
    {
      id: 'financing',
      label: getActionText('financing', 'label', 'Financing'),
      short: getActionText('financing', 'short', 'Financing'),
      desc: getActionText('financing', 'desc', 'Track requests & payouts'),
      icon: Coins,
      color: 'bg-teal-50 text-teal-700 border-teal-200 group-hover:bg-teal-600 group-hover:text-white',
      badge: 'Active',
      action: () => navigate('/history')
    },
    {
      id: 'documents',
      label: getActionText('documents', 'label', 'Documents'),
      short: getActionText('documents', 'short', 'Documents'),
      desc: getActionText('documents', 'desc', 'Central MSME vault'),
      icon: FolderLock,
      color: 'bg-cyan-50 text-cyan-700 border-cyan-200 group-hover:bg-cyan-600 group-hover:text-white',
      badge: '80% Done',
      action: () => navigate('/documents')
    },
    {
      id: 'analytics',
      label: getActionText('analytics', 'label', 'Analytics'),
      short: getActionText('analytics', 'short', 'Analytics'),
      desc: getActionText('analytics', 'desc', 'Growth & cash flow trends'),
      icon: BarChart3,
      color: 'bg-rose-50 text-rose-700 border-rose-200 group-hover:bg-rose-600 group-hover:text-white',
      badge: 'Charts',
      action: () => navigate('/analytics')
    },
    {
      id: 'voice',
      label: getActionText('voice', 'label', 'Voice Assistant'),
      short: getActionText('voice', 'short', 'Voice Guide'),
      desc: getActionText('voice', 'desc', 'Speech-to-text queries'),
      icon: Mic,
      color: 'bg-brand-50 text-brand-700 border-brand-200 group-hover:bg-brand-600 group-hover:text-white',
      badge: 'Interactive',
      action: () => openVoice()
    },
    {
      id: 'goals',
      label: getActionText('goals', 'label', 'Financial Goals'),
      short: getActionText('goals', 'short', 'Goals'),
      desc: getActionText('goals', 'desc', 'Machinery & capital milestones'),
      icon: Target,
      color: 'bg-orange-50 text-orange-700 border-orange-200 group-hover:bg-orange-600 group-hover:text-white',
      badge: 'Targets',
      action: () => navigate('/goals')
    },
    {
      id: 'lender',
      label: getActionText('lender', 'label', 'Lender Requests'),
      short: getActionText('lender', 'short', 'Lender Portal'),
      desc: getActionText('lender', 'desc', 'Review & approve pools'),
      icon: Briefcase,
      color: 'bg-slate-100 text-slate-800 border-slate-300 group-hover:bg-slate-800 group-hover:text-white',
      badge: 'Demo NBFC',
      action: () => navigate('/lender')
    },
    {
      id: 'profile',
      label: getActionText('profile', 'label', 'Profile'),
      short: getActionText('profile', 'short', 'Profile'),
      desc: getActionText('profile', 'desc', 'MSME business info'),
      icon: User,
      color: 'bg-sky-50 text-sky-700 border-sky-200 group-hover:bg-sky-600 group-hover:text-white',
      badge: 'Verified',
      action: () => navigate('/profile')
    }
  ];

  const handleClick = (action: typeof actions[0]) => {
    setClickedActionId(action.id);
    setTimeout(() => {
      setClickedActionId(null);
      action.action();
    }, 200);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <span>⚡</span> {currentLang === 'ta' ? 'விரைவு நிதிச் செயல்கள்' : currentLang === 'hi' ? 'त्वरित वित्तीय कार्य' : 'Quick Financial Actions'}
          </h2>
          <p className="text-xs text-slate-500">
            {currentLang === 'ta' ? 'நூல் கிரெடிட்டின் ஒவ்வொரு சேவைக்கும் ஒரே தொடுதல் அணுகல்' : currentLang === 'hi' ? 'नूल क्रेडिट के प्रत्येक वर्कफ़्लो के लिए त्वरित पहुँच' : 'One-tap quick access to every workflow on Nool Credit'}
          </p>
        </div>

        <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-brand-50 text-brand-700 text-[11px] font-bold rounded-full border border-brand-200/80">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          Google Pay Style Quick Access
        </span>
      </div>

      {/* Grid of 12 Google Pay / PhonePe inspired circular & rounded action buttons */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 sm:gap-4">
        {actions.map((action) => {
          const Icon = action.icon;
          const isClicked = clickedActionId === action.id;

          return (
            <motion.button
              key={action.id}
              onClick={() => handleClick(action)}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center justify-center p-3 rounded-2xl border border-slate-100 bg-slate-50/70 hover:bg-white hover:border-brand-300 hover:shadow-md transition-all text-center group relative overflow-hidden"
            >
              {/* Circular Icon Container */}
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-xs transition-all duration-200 ${action.color}`}>
                {isClicked ? (
                  <div className="w-5 h-5 rounded-full border-2 border-brand-600 border-t-transparent animate-spin" />
                ) : (
                  <Icon className="w-6 h-6 transition-transform group-hover:scale-110" />
                )}
              </div>

              {/* Label */}
              <span className="text-xs font-bold text-slate-800 group-hover:text-brand-700 transition-colors mt-2 leading-tight line-clamp-1">
                {action.label}
              </span>

              {/* Mini tag / subtext */}
              <span className="text-[10px] text-slate-400 font-medium group-hover:text-slate-600 mt-0.5 line-clamp-1">
                {action.short}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
