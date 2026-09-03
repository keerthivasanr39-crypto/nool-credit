import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, X, Sparkles, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../../context/AppContext';

export const VoiceModal: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { isVoiceOpen, closeVoice } = useApp();
  const [voiceState, setVoiceState] = useState<'IDLE' | 'LISTENING' | 'PROCESSING' | 'RESPONDING'>('IDLE');
  const [transcript, setTranscript] = useState<string>('');
  const [response, setResponse] = useState<string>('');

  const currentLang = i18n.language?.startsWith('ta') ? 'ta' : i18n.language?.startsWith('hi') ? 'hi' : 'en';

  const MULTILINGUAL_QUERIES: Record<string, { q: string; a: string }[]> = {
    en: [
      {
        q: 'How can I finance my invoice?',
        a: 'Based on your prototype data, upload your invoice, verify GST details, bundle eligible invoices into a pool, and submit for instant lender review. You may be eligible for up to 85% advance.'
      },
      {
        q: 'What is my current credit score?',
        a: 'Your current NOOL Credit Readiness score is 86/100 (Low Risk). Your profile has strong buyer reliability (19/20) and consistent transaction track record.'
      },
      {
        q: 'How does invoice bundling work?',
        a: 'Invoice bundling groups multiple verified invoices into a single diversified financing pool (e.g. POOL-1001), helping lower risk and maximize lender approval probability.'
      }
    ],
    ta: [
      {
        q: 'என் இன்வாய்ஸுக்கு எவ்வாறு நிதி பெறலாம்?',
        a: 'உங்கள் விலைப்பட்டியலைப் பதிவேற்றி, GST விவரங்களை சரிபார்த்து, தகுதியான இன்வாய்ஸ்களை ஒரு தொகுப்பாக (Pool) மாற்றி கடன் வழங்குநரிடம் சமர்ப்பிக்கவும். உங்களுக்கு 85% வரை உடனடி நிதி கிடைக்கும்.'
      },
      {
        q: 'எனது தற்போதைய கிரெடிட் ஸ்கோர் என்ன?',
        a: 'உங்கள் தற்போதைய நூல் கிரெடிட் ஸ்கோர் 86/100 (குறைந்த இடர்). உங்கள் வாங்குபவர் நம்பகத்தன்மை மற்றும் கட்டண வரலாறு மிகச் சிறப்பாக உள்ளது.'
      },
      {
        q: 'இன்வாய்ஸ் தொகுப்பது (Bundling) எப்படி?',
        a: 'இன்வாய்ஸ் பண்ட்லிங் என்பது பல சிறிய இன்வாய்ஸ்களை ஒரே கூட்டுத் தொகுப்பாக மாற்றுவதாகும் (எ.கா. POOL-1001). இது இடரைக் குறைத்து விரைவான நிதி அனுமதியைப் பெற உதவுகிறது.'
      }
    ],
    hi: [
      {
        q: 'मैं अपने इनवॉइस पर वित्तपोषण कैसे प्राप्त करूँ?',
        a: 'अपना इनवॉइस अपलोड करें, जीएसटी विवरण सत्यापित करें, पात्र इनवॉइस को एक पूल में बंडल करें और तत्काल ऋणदाता समीक्षा के लिए सबमिट करें। आप 85% तक अग्रिम राशि के पात्र हो सकते हैं।'
      },
      {
        q: 'मेरा वर्तमान क्रेडिट स्कोर क्या है?',
        a: 'आपका वर्तमान नूल क्रेडिट स्कोर 86/100 (कम जोखिम) है। आपकी प्रोफ़ाइल में खरीदार विश्वसनीयता और भुगतान इतिहास बहुत मजबूत है।'
      },
      {
        q: 'इनवॉइस बंडलिंग कैसे काम करती है?',
        a: 'इनवॉइस बंडलिंग कई सत्यापित इनवॉइस को एक विविध वित्तीय पूल में समूहीकृत करती है (जैसे POOL-1001), जिससे जोखिम कम होता है और ऋणदाता स्वीकृति की संभावना बढ़ जाती है।'
      }
    ]
  };

  const sampleQueries = MULTILINGUAL_QUERIES[currentLang] || MULTILINGUAL_QUERIES.en;

  useEffect(() => {
    if (!isVoiceOpen) {
      setVoiceState('IDLE');
      setTranscript('');
      setResponse('');
    }
  }, [isVoiceOpen]);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.lang = currentLang === 'ta' ? 'ta-IN' : currentLang === 'hi' ? 'hi-IN' : 'en-IN';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleStartListening = () => {
    setVoiceState('LISTENING');
    setTranscript('');
    setResponse('');

    setTimeout(() => {
      setVoiceState('PROCESSING');
      const selected = sampleQueries[Math.floor(Math.random() * sampleQueries.length)];
      setTranscript(selected.q);

      setTimeout(() => {
        setVoiceState('RESPONDING');
        setResponse(selected.a);
        speakText(selected.a);
      }, 1200);
    }, 2400);
  };

  const handleSelectSample = (sample: { q: string; a: string }) => {
    setVoiceState('PROCESSING');
    setTranscript(sample.q);
    setTimeout(() => {
      setVoiceState('RESPONDING');
      setResponse(sample.a);
      speakText(sample.a);
    }, 800);
  };

  if (!isVoiceOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-brand-900 via-brand-800 to-slate-900 text-white p-6 pb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-brand-600/60 border border-brand-400/30 flex items-center justify-center shadow-inner">
                  <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-tight flex items-center gap-2">
                    {t('voice.title')}
                    <span className="bg-brand-500/40 text-brand-200 text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full">
                      AI FinTech
                    </span>
                  </h3>
                  <p className="text-xs text-brand-200">{t('voice.subtitle')}</p>
                </div>
              </div>
              <button
                onClick={closeVoice}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 -mt-4 bg-white rounded-t-3xl shadow-lg flex flex-col items-center text-center">
            {/* Animated Mic Button & Sound Wave Bars */}
            <div className="relative my-4 flex flex-col items-center justify-center">
              {voiceState === 'LISTENING' && (
                <div className="flex items-center justify-center gap-1.5 h-16 mb-3">
                  {[40, 75, 95, 60, 85, 100, 70, 90, 45].map((height, i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 bg-brand-500 rounded-full"
                      animate={{ height: [`${height * 0.3}%`, `${height}%`, `${height * 0.4}%`] }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        delay: i * 0.08,
                        ease: 'easeInOut'
                      }}
                    />
                  ))}
                </div>
              )}

              <button
                onClick={voiceState === 'LISTENING' ? undefined : handleStartListening}
                className={`relative w-20 h-20 rounded-full flex items-center justify-center shadow-xl transition-all ${
                  voiceState === 'LISTENING'
                    ? 'bg-rose-500 text-white animate-pulse ring-8 ring-rose-100'
                    : voiceState === 'PROCESSING'
                    ? 'bg-amber-500 text-white animate-spin'
                    : 'bg-gradient-to-tr from-brand-700 to-brand-500 hover:from-brand-600 hover:to-brand-400 text-white hover:scale-105 ring-8 ring-brand-50'
                }`}
              >
                <Mic className="w-8 h-8" />
              </button>

              <div className="mt-4">
                <span className="text-xs font-semibold text-slate-700">
                  {voiceState === 'IDLE' && t('voice.speakPrompt')}
                  {voiceState === 'LISTENING' && t('voice.listening')}
                  {voiceState === 'PROCESSING' && t('voice.processing')}
                  {voiceState === 'RESPONDING' && (currentLang === 'ta' ? 'பதில் தயார்' : currentLang === 'hi' ? 'उत्तर तैयार है' : 'Response ready')}
                </span>
              </div>
            </div>

            {/* Transcript & Response Area */}
            {transcript && (
              <div className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl p-4 my-3 text-left">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  {currentLang === 'ta' ? 'நீங்கள் கேட்டது' : currentLang === 'hi' ? 'आपने पूछा' : 'You Asked'}
                </div>
                <div className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-brand-600" />
                  "{transcript}"
                </div>

                {response && (
                  <div className="border-t border-slate-200/70 pt-3">
                    <div className="text-xs font-bold text-brand-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      {currentLang === 'ta' ? 'நூல் வாய்ஸ் பதில்' : currentLang === 'hi' ? 'नूल वॉइस उत्तर' : 'NOOL VOICE Response'}
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium bg-white p-3 rounded-xl border border-slate-100 shadow-xs">
                      {response}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Quick Sample Questions */}
            <div className="w-full mt-3 text-left">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                {t('voice.tryAsking')}
              </div>
              <div className="space-y-1.5">
                {sampleQueries.map((sample, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectSample(sample)}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl text-xs text-slate-700 bg-slate-50 hover:bg-brand-50 hover:text-brand-800 transition-colors border border-slate-100 text-left"
                  >
                    <span className="font-medium truncate pr-2">{sample.q}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* Safety Disclaimer */}
            <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{t('voice.disclaimer')}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
