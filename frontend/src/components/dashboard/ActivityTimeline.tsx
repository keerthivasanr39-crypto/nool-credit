import React from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, Clock, ArrowUpRight, FileCheck, Layers } from 'lucide-react';
import { PrivacyMask } from '../common/PrivacyMask';

export const ActivityTimeline: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith('ta') ? 'ta' : i18n.language?.startsWith('hi') ? 'hi' : 'en';

  const TIMELINE_DATA = {
    en: {
      subtitle: 'Live logs of financing lifecycle milestones',
      realtime: 'Real-time',
      activities: [
        {
          id: 1,
          title: 'Financing Approved & Disbursed',
          desc: 'REQ-1001 for POOL-1001 approved by Apex FinCorp Capital.',
          amount: 208000,
          time: 'Today, 11:30 AM',
          icon: CheckCircle2,
          iconColor: 'text-emerald-600 bg-emerald-50'
        },
        {
          id: 2,
          title: 'Invoice Pool Created',
          desc: 'Pooled 3 verified invoices (INV-1001, INV-1002, INV-1003).',
          amount: 260000,
          time: 'Yesterday, 4:15 PM',
          icon: Layers,
          iconColor: 'text-brand-600 bg-brand-50'
        },
        {
          id: 3,
          title: 'Invoice Verified Successfully',
          desc: 'INV-1004 GST verified with 96% confidence score.',
          amount: 95000,
          time: '28 Aug 2026',
          icon: FileCheck,
          iconColor: 'text-teal-600 bg-teal-50'
        },
        {
          id: 4,
          title: 'Digital KYC Verified',
          desc: 'Aadhaar, PAN and Bank account sandbox checks completed.',
          amount: null,
          time: '25 Aug 2026',
          icon: CheckCircle2,
          iconColor: 'text-indigo-600 bg-indigo-50'
        }
      ]
    },
    ta: {
      subtitle: 'நிதி வழங்கல் மைல்கற்களின் நேரடி பதிவுகள்',
      realtime: 'நிகழ்நேரம்',
      activities: [
        {
          id: 1,
          title: 'நிதி அங்கீகரிக்கப்பட்டு வழங்கப்பட்டது',
          desc: 'POOL-1001-க்கான REQ-1001 Apex FinCorp Capital-ஆல் அங்கீகரிக்கப்பட்டது.',
          amount: 208000,
          time: 'இன்று, 11:30 மு.ப',
          icon: CheckCircle2,
          iconColor: 'text-emerald-600 bg-emerald-50'
        },
        {
          id: 2,
          title: 'இன்வாய்ஸ் பூல் உருவாக்கப்பட்டது',
          desc: '3 சரிபார்க்கப்பட்ட இன்வாய்ஸ்கள் (INV-1001, 1002, 1003) தொகுக்கப்பட்டன.',
          amount: 260000,
          time: 'நேற்று, 4:15 பி.ப',
          icon: Layers,
          iconColor: 'text-brand-600 bg-brand-50'
        },
        {
          id: 3,
          title: 'இன்வாய்ஸ் வெற்றிகரமாக சரிபார்க்கப்பட்டது',
          desc: 'INV-1004 ஜிஎஸ்டி 96% நம்பிக்கை மதிப்பெண்ணுடன் சரிபார்க்கப்பட்டது.',
          amount: 95000,
          time: '28 ஆகஸ்ட் 2026',
          icon: FileCheck,
          iconColor: 'text-teal-600 bg-teal-50'
        },
        {
          id: 4,
          title: 'டிஜிட்டல் KYC சரிபார்க்கப்பட்டது',
          desc: 'ஆதார், பான் மற்றும் வங்கி கணக்கு சாண்ட்பாக்ஸ் சோதனைகள் முடிவடைந்தன.',
          amount: null,
          time: '25 ஆகஸ்ட் 2026',
          icon: CheckCircle2,
          iconColor: 'text-indigo-600 bg-indigo-50'
        }
      ]
    },
    hi: {
      subtitle: 'वित्तपोषण जीवनचक्र मील के पत्थर के लाइव लॉग',
      realtime: 'रीयल-टाइम',
      activities: [
        {
          id: 1,
          title: 'वित्तपोषण स्वीकृत और वितरित',
          desc: 'POOL-1001 के लिए REQ-1001 को Apex FinCorp द्वारा स्वीकृत किया गया।',
          amount: 208000,
          time: 'आज, 11:30 पूर्वाह्न',
          icon: CheckCircle2,
          iconColor: 'text-emerald-600 bg-emerald-50'
        },
        {
          id: 2,
          title: 'इनवॉइस पूल बनाया गया',
          desc: '3 सत्यापित इनवॉइस (INV-1001, 1002, 1003) को पूल किया गया।',
          amount: 260000,
          time: 'कल, 4:15 अपराह्न',
          icon: Layers,
          iconColor: 'text-brand-600 bg-brand-50'
        },
        {
          id: 3,
          title: 'इनवॉइस सफलतापूर्वक सत्यापित',
          desc: 'INV-1004 96% विश्वास स्कोर के साथ जीएसटी सत्यापित हुआ।',
          amount: 95000,
          time: '28 अगस्त 2026',
          icon: FileCheck,
          iconColor: 'text-teal-600 bg-teal-50'
        },
        {
          id: 4,
          title: 'डिजिटल केवाईसी सत्यापित',
          desc: 'आधार, पैन और बैंक खाता सैंडबॉक्स सत्यापन पूरा हुआ।',
          amount: null,
          time: '25 अगस्त 2026',
          icon: CheckCircle2,
          iconColor: 'text-indigo-600 bg-indigo-50'
        }
      ]
    }
  };

  const currentData = TIMELINE_DATA[currentLang] || TIMELINE_DATA.en;
  const activities = currentData.activities;

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-800">{t('dashboard.activityTimeline')}</h3>
          <p className="text-xs text-slate-400">{currentData.subtitle}</p>
        </div>
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded">
          {currentData.realtime}
        </span>
      </div>

      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
        {activities.map((act) => {
          const Icon = act.icon;
          return (
            <div key={act.id} className="relative group">
              <div className={`absolute -left-6 top-0 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-xs ${act.iconColor}`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <h4 className="text-xs font-bold text-slate-800 group-hover:text-brand-600 transition-colors">
                    {act.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                    {act.desc}
                  </p>
                </div>
                <div className="flex items-center sm:flex-col sm:items-end justify-between shrink-0">
                  {act.amount && (
                    <span className="text-xs font-bold text-slate-900">
                      <PrivacyMask value={act.amount} type="currency" />
                    </span>
                  )}
                  <span className="text-[10px] text-slate-400 font-medium">
                    {act.time}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
