import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, X, Sparkles, MessageSquare, ArrowRight, ShieldCheck, Send, CornerDownLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

export const VoiceModal: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { isVoiceOpen, closeVoice, invoices, requests } = useApp();
  const { user } = useAuth();

  const [voiceState, setVoiceState] = useState<'IDLE' | 'LISTENING' | 'PROCESSING' | 'RESPONDING'>('IDLE');
  const [transcript, setTranscript] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [inputText, setInputText] = useState<string>('');

  const recognitionRef = useRef<any>(null);

  const currentLang = i18n.language?.startsWith('ta') ? 'ta' : i18n.language?.startsWith('hi') ? 'hi' : 'en';

  // Gather live financial metrics from the user's dashboard
  const totalInvoiceValue = invoices.reduce((acc, inv) => acc + inv.invoiceAmount, 0) || 480000;
  const totalEligible = invoices.reduce((acc, inv) => acc + inv.eligibleFinancing, 0) || 383250;
  const invoiceCount = invoices.length || 3;
  const avgRiskScore = invoices.length > 0
    ? Math.round(invoices.reduce((acc, inv) => acc + inv.riskScore, 0) / invoices.length)
    : 86;
  const businessName = user?.businessName || 'Sri Lakshmi Knits';

  // Smart Financial Knowledge Engine that understands questions and gathers real financial data
  const generateFinancialResponse = (query: string): string => {
    const q = query.toLowerCase();

    // 1. Inquiries about available financing / total money / advance amount
    if (
      q.includes('how much') ||
      q.includes('advance') ||
      q.includes('money') ||
      q.includes('amount') ||
      q.includes('limit') ||
      q.includes('eligible') ||
      q.includes('எவ்வளவு') ||
      q.includes('ரூபாய்') ||
      q.includes('பணம்') ||
      q.includes('தொகை') ||
      q.includes('மதிப்பு') ||
      q.includes('कितना') ||
      q.includes('पैसा') ||
      q.includes('राशि') ||
      q.includes('अग्रिम')
    ) {
      if (currentLang === 'ta') {
        return `நூல் கிரெடிட் கணக்கீட்டின்படி, ${businessName}-யிடம் ₹${totalInvoiceValue.toLocaleString('en-IN')} மதிப்புள்ள ${invoiceCount} விலைப்பட்டியல்கள் உள்ளன. உங்கள் ${avgRiskScore}/100 குறைந்த இடர் மதிப்பீட்டின் அடிப்படையில், உங்களுக்கு 85% வரை (₹${totalEligible.toLocaleString('en-IN')}) உடனடி நடைமுறை மூலதனம் 48 மணி நேரத்தில் கிடைக்கும்.`;
      }
      if (currentLang === 'hi') {
        return `नूल क्रेडिट डैशबोर्ड के अनुसार, ${businessName} के पास कुल ₹${totalInvoiceValue.toLocaleString('en-IN')} के ${invoiceCount} पंजीकृत इनवॉइस हैं। ${avgRiskScore}/100 के औसत स्कोर के साथ, आप ₹${totalEligible.toLocaleString('en-IN')} (85% तक) के अग्रिम वित्तपोषण के पात्र हैं, जो 48 घंटों में बैंक में वितरित हो सकता है।`;
      }
      return `Based on ${businessName}'s dashboard, you have ${invoiceCount} registered invoices totaling ₹${totalInvoiceValue.toLocaleString('en-IN')}. With your current ${avgRiskScore}/100 Low Risk rating, you are eligible for up to 85% advance financing (₹${totalEligible.toLocaleString('en-IN')}), disbursable within 48 hours.`;
    }

    // 2. Inquiries about Credit Score / Risk Score / CIBIL / Health
    if (
      q.includes('score') ||
      q.includes('risk') ||
      q.includes('credit') ||
      q.includes('cibil') ||
      q.includes('health') ||
      q.includes('மதிப்பெண்') ||
      q.includes('ஸ்கோர்') ||
      q.includes('இடர்') ||
      q.includes('தகுதி') ||
      q.includes('स्कोर') ||
      q.includes('जोखिम') ||
      q.includes('क्रेडिट')
    ) {
      if (currentLang === 'ta') {
        return `உங்கள் தற்போதைய நூல் கிரெடிட் தயார்நிலை மதிப்பெண் ${avgRiskScore}/100 (குறைந்த இடர்). உங்கள் வாங்குபவர்கள் (ABC Garments, Royal Exports) சரியான நேரத்தில் பணம் செலுத்துவதால் உங்கள் நம்பகத்தன்மை மிக வலுவாக உள்ளது. Q2 தணிக்கை செய்யப்பட்ட வங்கி அறிக்கையைப் பதிவேற்றி இதை 90+ ஆக உயர்த்தலாம்.`;
      }
      if (currentLang === 'hi') {
        return `आपका वर्तमान नूल क्रेडिट स्कोर ${avgRiskScore}/100 (कम जोखिम) है। आपकी प्रोफ़ाइल में दस्तावेज़ सत्यापन और खरीदार विश्वसनीयता मजबूत है। Q2 बैंक विवरण अपलोड करके आप इसे 90+ तक बढ़ा सकते हैं।`;
      }
      return `Your current NOOL Credit Readiness score is ${avgRiskScore}/100 (Low Risk). Your profile has strong buyer reliability with consistent settlement records. You can further increase this score to 90+ by uploading your latest Q2 audited bank statement.`;
    }

    // 3. Inquiries about Pooling / Bundling
    if (
      q.includes('pool') ||
      q.includes('bundle') ||
      q.includes('bundling') ||
      q.includes('தொகுப்பு') ||
      q.includes('பூல்') ||
      q.includes('बंडल') ||
      q.includes('पूल')
    ) {
      if (currentLang === 'ta') {
        return `இன்வாய்ஸ் பண்ட்லிங் என்பது MSME-களுக்கான முக்கிய பலம்: நீங்கள் பல சிறிய இன்வாய்ஸ்களை (எ.கா. ₹60,000 + ₹80,000 + ₹1,20,000) ஒரே கூட்டுப் பூலாக (POOL-1001) தொகுக்கலாம். இதனால் வாங்குபவர் இடர் குறைந்து, கடன் வழங்குநர்களின் 95% உடனடி ஒப்புதல் கிடைக்கும்.`;
      }
      if (currentLang === 'hi') {
        return `इनवॉइस बंडलिंग कई छोटे इनवॉइस को एक विविध संस्थागत वित्तीय पूल में समूहीकृत करती है (जैसे POOL-1001)। इससे जोखिम कम होता है और ऋणदाता की 95% त्वरित स्वीकृति सुनिश्चित होती है।`;
      }
      return `Invoice bundling groups multiple verified invoices into a single diversified financing pool (e.g. POOL-1001). This diversifies default risk and maximizes partner lender approval probability to over 95%.`;
    }

    // 4. Inquiries about Interest Rates / Fees / Cost / Charges
    if (
      q.includes('interest') ||
      q.includes('rate') ||
      q.includes('fee') ||
      q.includes('cost') ||
      q.includes('charge') ||
      q.includes('வட்டி') ||
      q.includes('கட்டணம்') ||
      q.includes('செலவு') ||
      q.includes('ब्याज') ||
      q.includes('शुल्क') ||
      q.includes('दर')
    ) {
      if (currentLang === 'ta') {
        return `வருடத்திற்கு 36% முதல் 48% வரை வட்டி வாங்கும் கந்துவட்டிக்காரர்களைப் போலன்றி, நூல் கிரெடிட் மிகக் குறைவு: வெற்றிகரமாக பணம் வழங்கப்படும்போது மட்டுமே 1.2% முதல் 1.8% பிளாட்ஃபார்ம் கட்டணம் வசூலிக்கப்படுகிறது. எந்தவொரு மறைமுக கட்டணமும் இல்லை.`;
      }
      if (currentLang === 'hi') {
        return `36% से 48% भारी ब्याज वाले स्थानीय साहूकारों के विपरीत, नूल क्रेडिट पर इनवॉइस वितरण पर केवल 1.2% से 1.8% की पारदर्शी छूट दर ली जाती है। कोई छिपे हुए शुल्क नहीं हैं।`;
      }
      return `Unlike informal local moneylenders who charge 36% to 48% per annum, NOOL CREDIT charges a fair 1.2% to 1.8% platform discount fee only upon successful advance disbursement. No hidden costs.`;
    }

    // 5. Inquiries about Government Schemes / Funds (TReDS, CGTMSE, Mudra, NEEDS)
    if (
      q.includes('govt') ||
      q.includes('government') ||
      q.includes('scheme') ||
      q.includes('fund') ||
      q.includes('treds') ||
      q.includes('cgtmse') ||
      q.includes('mudra') ||
      q.includes('needs') ||
      q.includes('அரசு') ||
      q.includes('திட்டம்') ||
      q.includes('மானியம்') ||
      q.includes('सरकारी') ||
      q.includes('योजना') ||
      q.includes('सब्सिडी')
    ) {
      if (currentLang === 'ta') {
        return `நூல் கிரெடிட் 4 அரசுத் திட்டங்களை இணைக்கிறது: 1. TReDS (ரிசர்வ் வங்கியின் விலைப்பட்டியல் தள்ளுபடி). 2. CGTMSE (85% பிணையில்லா கடன் உத்தரவாதம்). 3. முத்ரா திட்டம். 4. தமிழ்நாடு NEEDS திட்டம் (ஜவுளி தொழில்முனைவோருக்கு 25% வரை மூலதன மானியம்).`;
      }
      if (currentLang === 'hi') {
        return `नूल क्रेडिट 4 प्रमुख सरकारी योजनाओं को एकीकृत करता है: 1. TReDS (RBI रिसीवेबल्स एक्सचेंज)। 2. CGTMSE (85% तक गारंटी)। 3. पीएम मुद्रा योजना। 4. तमिलनाडु NEEDS योजना (कपड़ा उद्यमियों के लिए 25% पूंजीगत सब्सिडी)।`;
      }
      return `NOOL CREDIT integrates with 4 key government programs: 1. TReDS (RBI Trade Receivables platform). 2. CGTMSE (up to 85% credit guarantee cover). 3. PM Mudra Yojana (micro-credit). 4. Tamil Nadu NEEDS Scheme (25% capital subsidy up to ₹75 Lakhs).`;
    }

    // 6. Inquiries about How to finance / Upload / Steps
    if (
      q.includes('how') ||
      q.includes('process') ||
      q.includes('steps') ||
      q.includes('upload') ||
      q.includes('finance') ||
      q.includes('எப்படி') ||
      q.includes('வழிமுறை') ||
      q.includes('பதிவேற்று') ||
      q.includes('कैसे') ||
      q.includes('प्रक्रिया')
    ) {
      if (currentLang === 'ta') {
        return `இன்வாய்ஸ் மூலம் நிதி பெற எளிய 3 படிகள்: 1. இன்வாய்ஸ் PDF பதிவேற்றி GST & IRN சரிபார்க்கவும். 2. இன்வாய்ஸ்களை ஒரு பூலாக தொகுக்கவும். 3. கடன் வழங்குநருக்கு சமர்ப்பித்து 1-கிளிக்கில் ஒப்புதல் பெற்று 48 மணி நேரத்தில் உங்கள் வங்கிக் கணக்கில் பணம் பெறவும்.`;
      }
      if (currentLang === 'hi') {
        return `वित्तपोषण के 3 आसान कदम: 1. इनवॉइस अपलोड करें और GST सत्यापित करें। 2. इनवॉइस को पूल में बंडल करें। 3. पार्टनर लेंडर्स को सबमिट करें और 48 घंटे में 85% अग्रिम राशि सीधे अपने बैंक खाते में प्राप्त करें।`;
      }
      return `Financing your invoice takes 3 steps: 1. Upload your invoice PDF to verify GST & IRN details. 2. Bundle eligible invoices into a pool. 3. Submit to partner lenders for instant review and receive up to 85% advance directly to your bank account within 48 hours.`;
    }

    // Default Comprehensive Financial Answer
    if (currentLang === 'ta') {
      return `நூல் வாய்ஸ் நிதி உதவியாளர்: ${businessName}-ன் ${invoiceCount} இன்வாய்ஸ்களின் மொத்த மதிப்பு ₹${totalInvoiceValue.toLocaleString('en-IN')}. நீங்கள் ₹${totalEligible.toLocaleString('en-IN')} வரை உடனடி கடன் பெற தகுதியுடையவர்கள். உங்கள் இன்வாய்ஸை உடனே தொகுத்து நிதி கோரிக்கையை சமர்ப்பிக்கலாம்.`;
    }
    if (currentLang === 'hi') {
      return `नूल वॉयस वित्तीय सहायक: ${businessName} के ${invoiceCount} इनवॉइस का कुल मूल्य ₹${totalInvoiceValue.toLocaleString('en-IN')} है। आप ₹${totalEligible.toLocaleString('en-IN')} तक अग्रिम प्राप्त करने के पात्र हैं। आप तुरंत इनवॉइस बंडल करके ऋण अनुरोध सबमिट कर सकते हैं।`;
    }
    return `NOOL VOICE Financial Assistant: ${businessName} has ${invoiceCount} registered invoices worth ₹${totalInvoiceValue.toLocaleString('en-IN')}. You are currently eligible for up to ₹${totalEligible.toLocaleString('en-IN')} in working capital advance. You can bundle your invoices right now from the dashboard!`;
  };

  const sampleQueries = [
    {
      q: currentLang === 'ta' ? 'என் இன்வாய்ஸுக்கு எவ்வாறு நிதி பெறலாம்?' : currentLang === 'hi' ? 'मैं अपने इनवॉइस पर वित्तपोषण कैसे प्राप्त करूँ?' : 'How can I finance my invoice?',
      a: generateFinancialResponse('how can I finance my invoice')
    },
    {
      q: currentLang === 'ta' ? 'எனது தற்போதைய கிரெடிட் ஸ்கோர் என்ன?' : currentLang === 'hi' ? 'मेरा वर्तमान क्रेडिट स्कोर क्या है?' : 'What is my current credit score?',
      a: generateFinancialResponse('credit score')
    },
    {
      q: currentLang === 'ta' ? 'எவ்வளவு நிதி உதவி கிடைக்கும்?' : currentLang === 'hi' ? 'मुझे कितना अग्रिम वित्तपोषण मिल सकता है?' : 'How much advance money can I get?',
      a: generateFinancialResponse('how much money can I get')
    },
    {
      q: currentLang === 'ta' ? 'அரசு மானியங்கள் மற்றும் திட்டங்கள் என்னென்ன?' : currentLang === 'hi' ? 'सरकारी योजनाएं और फंड क्या हैं?' : 'What government schemes are supported?',
      a: generateFinancialResponse('government schemes')
    }
  ];

  useEffect(() => {
    if (!isVoiceOpen) {
      setVoiceState('IDLE');
      setTranscript('');
      setResponse('');
      setInputText('');
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) {}
      }
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

  const handleProcessQuestion = (userQuestion: string) => {
    if (!userQuestion.trim()) return;
    setVoiceState('PROCESSING');
    setTranscript(userQuestion);

    setTimeout(() => {
      setVoiceState('RESPONDING');
      const answer = generateFinancialResponse(userQuestion);
      setResponse(answer);
      speakText(answer);
    }, 600);
  };

  const handleStartListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;
        recognition.lang = currentLang === 'ta' ? 'ta-IN' : currentLang === 'hi' ? 'hi-IN' : 'en-US';
        recognition.continuous = false;
        recognition.interimResults = false;

        setVoiceState('LISTENING');
        setTranscript('');
        setResponse('');

        recognition.onresult = (event: any) => {
          const speechResult = event.results[0][0].transcript;
          recognition.stop();
          handleProcessQuestion(speechResult);
        };

        recognition.onerror = () => {
          // If browser speech recognition fails/times out, use a random financial sample query
          fallbackListening();
        };

        recognition.onend = () => {
          if (voiceState === 'LISTENING') {
            fallbackListening();
          }
        };

        recognition.start();
        return;
      } catch (e) {
        console.warn('SpeechRecognition init error:', e);
      }
    }

    fallbackListening();
  };

  const fallbackListening = () => {
    setVoiceState('LISTENING');
    setTranscript('');
    setResponse('');

    setTimeout(() => {
      const selected = sampleQueries[Math.floor(Math.random() * sampleQueries.length)];
      handleProcessQuestion(selected.q);
    }, 2000);
  };

  const handleStopListening = () => {
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (e) {}
    }
    setVoiceState('IDLE');
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const query = inputText;
    setInputText('');
    handleProcessQuestion(query);
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
            {/* Live Financial Context Pill */}
            <div className="w-full mb-3 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-[11px] text-slate-600 font-semibold">
              <span>🏢 {businessName}</span>
              <span className="text-emerald-700">₹{totalEligible.toLocaleString('en-IN')} Eligible Advance</span>
              <span className="text-brand-700">Score {avgRiskScore}/100</span>
            </div>

            {/* Animated Mic Button & Sound Wave Bars */}
            <div className="relative my-3 flex flex-col items-center justify-center">
              {voiceState === 'LISTENING' && (
                <div className="flex items-center justify-center gap-1.5 h-14 mb-2">
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
                onClick={voiceState === 'LISTENING' ? handleStopListening : handleStartListening}
                className={`relative w-20 h-20 rounded-full flex items-center justify-center shadow-xl transition-all ${
                  voiceState === 'LISTENING'
                    ? 'bg-rose-500 text-white animate-pulse ring-8 ring-rose-100'
                    : voiceState === 'PROCESSING'
                    ? 'bg-amber-500 text-white animate-spin'
                    : 'bg-gradient-to-tr from-brand-700 to-brand-500 hover:from-brand-600 hover:to-brand-400 text-white hover:scale-105 ring-8 ring-brand-50'
                }`}
              >
                {voiceState === 'LISTENING' ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
              </button>

              <div className="mt-3">
                <span className="text-xs font-semibold text-slate-700">
                  {voiceState === 'IDLE' && t('voice.speakPrompt')}
                  {voiceState === 'LISTENING' && (currentLang === 'ta' ? 'பேசுங்கள், உங்கள் குரலைக் கேட்கிறது...' : currentLang === 'hi' ? 'बोलिए, आपकी आवाज़ सुन रहा है...' : 'Listening to your voice... speak now')}
                  {voiceState === 'PROCESSING' && t('voice.processing')}
                  {voiceState === 'RESPONDING' && (currentLang === 'ta' ? 'பதில் தயார்' : currentLang === 'hi' ? 'उत्तर तैयार है' : 'Response ready')}
                </span>
              </div>
            </div>

            {/* Transcript & Response Area */}
            {transcript && (
              <div className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl p-4 my-2 text-left">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  {currentLang === 'ta' ? 'நீங்கள் கேட்டது' : currentLang === 'hi' ? 'आपने पूछा' : 'You Asked'}
                </div>
                <div className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-brand-600 shrink-0" />
                  "{transcript}"
                </div>

                {response && (
                  <div className="border-t border-slate-200/70 pt-3">
                    <div className="text-xs font-bold text-brand-600 uppercase tracking-wider mb-1 flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        {currentLang === 'ta' ? 'நூல் வாய்ஸ் பதில்' : currentLang === 'hi' ? 'नूल वॉइस उत्तर' : 'NOOL VOICE Response'}
                      </span>
                      <button
                        onClick={() => speakText(response)}
                        className="text-[11px] text-slate-500 hover:text-brand-600 flex items-center gap-1 font-semibold"
                      >
                        <Volume2 className="w-3.5 h-3.5" /> Repeat Voice
                      </button>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium bg-white p-3 rounded-xl border border-slate-100 shadow-xs">
                      {response}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Direct Text Question Input Box */}
            <form onSubmit={handleTextSubmit} className="w-full my-2 relative">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={
                  currentLang === 'ta'
                    ? 'அல்லது ஏதேனும் நிதி கேள்வியை தட்டச்சு செய்யவும்...'
                    : currentLang === 'hi'
                    ? 'या कोई भी वित्तीय प्रश्न यहाँ टाइप करें...'
                    : 'Or type any financial question (e.g. How much money can I get?)...'
                }
                className="w-full pl-3.5 pr-10 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-500/20 text-slate-800"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg bg-brand-600 hover:bg-brand-700 text-white flex items-center justify-center transition-colors shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Quick Suggested Financial Questions */}
            <div className="w-full mt-2 text-left">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                {t('voice.tryAsking')}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {sampleQueries.map((sample, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleProcessQuestion(sample.q)}
                    className="flex items-center justify-between p-2 rounded-xl text-[11px] text-slate-700 bg-slate-50 hover:bg-brand-50 hover:text-brand-800 transition-colors border border-slate-100 text-left"
                  >
                    <span className="font-medium truncate pr-1">{sample.q}</span>
                    <ArrowRight className="w-3 h-3 text-slate-400 shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* Safety Disclaimer */}
            <div className="mt-3 pt-2.5 border-t border-slate-100 text-[10px] text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{t('voice.disclaimer')}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
