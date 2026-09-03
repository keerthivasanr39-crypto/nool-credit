import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  X,
  Send,
  Mic,
  MicOff,
  Sparkles,
  Bot,
  User,
  Volume2,
  Minimize2,
  Maximize2,
  ChevronDown,
  ShieldCheck,
  Building2,
  Coins
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

export const AIChatbot: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { invoices, requests } = useApp();
  const { user } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const currentLang = i18n.language?.startsWith('ta') ? 'ta' : i18n.language?.startsWith('hi') ? 'hi' : 'en';

  const totalInvoiceValue = invoices.reduce((acc, inv) => acc + inv.invoiceAmount, 0) || 480000;
  const totalEligible = invoices.reduce((acc, inv) => acc + inv.eligibleFinancing, 0) || 383250;
  const invoiceCount = invoices.length || 3;
  const avgRiskScore = invoices.length > 0
    ? Math.round(invoices.reduce((acc, inv) => acc + inv.riskScore, 0) / invoices.length)
    : 86;
  const userName = user?.name || 'Entrepreneur';
  const businessName = user?.businessName || 'Sri Lakshmi Knits';

  // Initialize initial welcome message
  useEffect(() => {
    const welcomeText =
      currentLang === 'ta'
        ? `வணக்கம் ${userName}! நான் நூல் AI நிதியியல் வழிகாட்டி 🤖. ${businessName}-ன் ₹${totalInvoiceValue.toLocaleString('en-IN')} மதிப்புள்ள இன்வாய்ஸ்களுக்கு எவ்வாறு நிதி பெறுவது, இடர் மதிப்பீடு, மற்றும் அரசு மானியங்கள் பற்றி எதையும் கேளுங்கள்!`
        : currentLang === 'hi'
        ? `नमस्ते ${userName}! मैं नूल AI वित्तीय सह-पायलट 🤖 हूँ। ${businessName} के ₹${totalInvoiceValue.toLocaleString('en-IN')} मूल्य के इनवॉइस वित्तपोषण, जोखिम स्कोर और सरकारी सब्सिडी के बारे में कुछ भी पूछें!`
        : `Hello ${userName}! I am NOOL AI, your FinTech co-pilot 🤖. Ask me anything about financing ${businessName}'s ₹${totalInvoiceValue.toLocaleString('en-IN')} invoices, your 86/100 risk score, or eligible government subsidies!`;

    setMessages([
      {
        id: 'welcome-1',
        sender: 'bot',
        text: welcomeText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [currentLang, userName, businessName, totalInvoiceValue]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // AI Knowledge Answer Engine
  const generateBotReply = (query: string): string => {
    const q = query.toLowerCase();

    // 1. Advance / Money / Limit
    if (
      q.includes('how much') ||
      q.includes('money') ||
      q.includes('advance') ||
      q.includes('limit') ||
      q.includes('eligible') ||
      q.includes('எவ்வளவு') ||
      q.includes('பணம்') ||
      q.includes('ரூபாய்') ||
      q.includes('தொகை') ||
      q.includes('कितना') ||
      q.includes('पैसा') ||
      q.includes('अग्रिम')
    ) {
      if (currentLang === 'ta') {
        return `நூல் கிரெடிட்டில் உள்ள உங்கள் கணக்குப்படி, ${businessName}-யிடம் ₹${totalInvoiceValue.toLocaleString('en-IN')} மதிப்புள்ள ${invoiceCount} இன்வாய்ஸ்கள் உள்ளன. உங்கள் 86/100 குறைந்த இடர் மதிப்பீட்டின் அடிப்படையில், உங்களுக்கு 85% வரை (₹${totalEligible.toLocaleString('en-IN')}) உடனடி மூலதனம் 48 மணி நேரத்தில் வங்கி கணக்கிற்கு வந்து சேரும்!`;
      }
      if (currentLang === 'hi') {
        return `नूल क्रेडिट के अनुसार, ${businessName} के पास कुल ₹${totalInvoiceValue.toLocaleString('en-IN')} के ${invoiceCount} इनवॉइस हैं। 86/100 स्कोर के साथ, आप 85% तक (₹${totalEligible.toLocaleString('en-IN')}) तत्काल अग्रिम राशि 48 घंटों में बैंक में प्राप्त कर सकते हैं!`;
      }
      return `Based on ${businessName}'s registered portfolio, you have ${invoiceCount} invoices worth ₹${totalInvoiceValue.toLocaleString('en-IN')}. With your 86/100 Low Risk rating, you are eligible for up to 85% advance (₹${totalEligible.toLocaleString('en-IN')}) within 48 hours!`;
    }

    // 2. Risk score / Credit health
    if (
      q.includes('score') ||
      q.includes('risk') ||
      q.includes('cibil') ||
      q.includes('credit') ||
      q.includes('health') ||
      q.includes('இடர்') ||
      q.includes('மதிப்பெண்') ||
      q.includes('ஸ்கோர்') ||
      q.includes('जोखिम') ||
      q.includes('स्कोर')
    ) {
      if (currentLang === 'ta') {
        return `உங்கள் தற்போதைய நூல் பிசினஸ் ஸ்கோர் 86/100 (குறைந்த இடர் / Low Risk). ஆவண சரிபார்ப்பில் 18/20 புள்ளிகளும், ABC Garments உடனான வணிகத்தில் வலுவான நம்பகத்தன்மையும் உள்ளது. Q2 தணிக்கை செய்யப்பட்ட வங்கி அறிக்கையை Document Center-ல் பதிவேற்றி இதை 90+ ஆக உயர்த்தலாம்.`;
      }
      if (currentLang === 'hi') {
        return `आपका वर्तमान नूल बिज़नेस स्कोर 86/100 (कम जोखिम / Low Risk) है। दस्तावेज़ सत्यापन और खरीदार विश्वसनीयता बहुत मजबूत है। नवीनतम Q2 बैंक स्टेटमेंट अपलोड करके आप स्कोर को 90+ तक बढ़ा सकते हैं।`;
      }
      return `Your current NOOL Business Score is 86/100 (Low Risk). Your profile has strong buyer reliability with ABC Garments. You can boost this to 90+ by uploading your latest Q2 audited bank statement.`;
    }

    // 3. Bundling / Pooling
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
        return `இன்வாய்ஸ் பண்ட்லிங் என்பது நமது முக்கிய அம்சம்: நீங்கள் 3 சிறிய இன்வாய்ஸ்களை (₹60k + ₹80k + ₹1.2L = ₹2.6L) ஒன்றாக சேர்த்து POOL-1001 ஆக மாற்றலாம். இது வாங்குபவர் இடரைக் குறைத்து கடன் வழங்குநர்களின் 95% உடனடி ஒப்புதலைப் பெற உதவுகிறது.`;
      }
      if (currentLang === 'hi') {
        return `इनवॉइस बंडलिंग हमारे प्लेटफ़ॉर्म की मुख्य ताकत है: आप 3 छोटे इनवॉइस (₹60k + ₹80k + ₹1.2L = ₹2.6L) को एक साथ बंडल करके POOL-1001 बना सकते हैं। इससे 95% त्वरित ऋण स्वीकृति मिलती है।`;
      }
      return `Invoice bundling groups multiple smaller invoices (e.g. ₹60k + ₹80k + ₹1.2L = ₹2.6 Lakhs) into a unified institutional pool (POOL-1001). This diversifies default risk and guarantees 95%+ lender approval probability!`;
    }

    // 4. Government Schemes / Subsidies / TReDS / CGTMSE
    if (
      q.includes('govt') ||
      q.includes('government') ||
      q.includes('scheme') ||
      q.includes('treds') ||
      q.includes('cgtmse') ||
      q.includes('mudra') ||
      q.includes('needs') ||
      q.includes('அரசு') ||
      q.includes('திட்டம்') ||
      q.includes('மானியம்') ||
      q.includes('सरकारी') ||
      q.includes('योजना')
    ) {
      if (currentLang === 'ta') {
        return `நூல் கிரெடிட்டில் 4 முக்கிய அரசுத் திட்டங்கள் உள்ளன: 1. TReDS (ரிசர்வ் வங்கி முறை). 2. CGTMSE (85% பிணையில்லா கடன் உத்தரவாதம்). 3. முத்ரா திட்டம். 4. தமிழ்நாடு NEEDS திட்டம் (முதல் தலைமுறை ஜவுளி தொழில்முனைவோருக்கு 25% மூலதன மானியம்).`;
      }
      if (currentLang === 'hi') {
        return `नूल क्रेडिट 4 प्रमुख सरकारी योजनाओं को जोड़ता है: 1. TReDS (RBI रिसीवेबल्स एक्सचेंज)। 2. CGTMSE (85% गारंटी कवर)। 3. पीएम मुद्रा योजना। 4. तमिलनाडु NEEDS योजना (कपड़ा उद्यमियों के लिए 25% सब्सिडी)।`;
      }
      return `NOOL CREDIT integrates 4 major government programs: 1. TReDS (RBI Trade Receivables platform). 2. CGTMSE (up to 85% credit guarantee cover). 3. PM Mudra Yojana (micro-refinancing). 4. Tamil Nadu NEEDS Scheme (25% capital subsidy up to ₹75 Lakhs for textile units).`;
    }

    // 5. Interest Rates & Cost
    if (
      q.includes('interest') ||
      q.includes('rate') ||
      q.includes('fee') ||
      q.includes('cost') ||
      q.includes('வட்டி') ||
      q.includes('கட்டணம்') ||
      q.includes('ब्याज') ||
      q.includes('शुल्क')
    ) {
      if (currentLang === 'ta') {
        return `வருடத்திற்கு 36% - 48% வரை வட்டி வாங்கும் கந்துவட்டிக்காரர்களை விட நூல் கிரெடிட் மிகக் குறைவு: வெற்றிகரமாக பணம் வழங்கப்படும்போது மட்டுமே 1.2% முதல் 1.8% வரை பிளாட்ஃபார்ம் கட்டணம் வசூலிக்கப்படுகிறது. எந்தவொரு மறைமுக கட்டணமும் இல்லை.`;
      }
      if (currentLang === 'hi') {
        return `36% से 48% भारी ब्याज वाले स्थानीय साहूकारों की तुलना में नूल क्रेडिट बहुत सस्ता है: वितरण पर केवल 1.2% से 1.8% का पारदर्शी शुल्क लिया जाता है। कोई छिपे हुए शुल्क नहीं हैं।`;
      }
      return `Unlike local moneylenders charging 36% to 48% p.a., NOOL CREDIT charges only a 1.2% to 1.8% platform discount fee upon successful advance disbursement. No hidden costs.`;
    }

    // Default Fallback
    if (currentLang === 'ta') {
      return `நூல் AI: ${businessName}-ன் ₹${totalInvoiceValue.toLocaleString('en-IN')} மதிப்புள்ள இன்வாய்ஸ்களுக்கு 85% வரை உடனடி நிதி பெறலாம். டாஷ்போர்டில் உள்ள "இன்வாய்ஸ் தொகுப்பு" அல்லது "விலைப்பட்டியல் பதிவேற்று" பொத்தானைப் பயன்படுத்தி உடனே தொடங்கலாம்!`;
    }
    if (currentLang === 'hi') {
      return `नूल AI: ${businessName} के ₹${totalInvoiceValue.toLocaleString('en-IN')} के इनवॉइस पर 85% तक तत्काल अग्रिम प्राप्त करें। शुरू करने के लिए डैशबोर्ड पर "इनवॉइस बंडल" पर क्लिक करें!`;
    }
    return `NOOL AI: You can unlock up to 85% advance (₹${totalEligible.toLocaleString('en-IN')}) for ${businessName}. Feel free to ask about your credit score, bundling invoices, or government schemes!`;
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = generateBotReply(query);
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 700);
  };

  const speakMessage = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.lang = currentLang === 'ta' ? 'ta-IN' : currentLang === 'hi' ? 'hi-IN' : 'en-IN';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;
        recognition.lang = currentLang === 'ta' ? 'ta-IN' : currentLang === 'hi' ? 'hi-IN' : 'en-US';
        recognition.continuous = false;
        recognition.interimResults = false;

        setIsListening(true);

        recognition.onresult = (e: any) => {
          const spoken = e.results[0][0].transcript;
          recognition.stop();
          setIsListening(false);
          handleSend(spoken);
        };

        recognition.onerror = () => setIsListening(false);
        recognition.onend = () => setIsListening(false);

        recognition.start();
        return;
      } catch (err) {}
    }

    // Fallback if mic not available
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      handleSend(
        currentLang === 'ta'
          ? 'எவ்வளவு நிதி உதவி கிடைக்கும்?'
          : currentLang === 'hi'
          ? 'मुझे कितना अग्रिम मिल सकता है?'
          : 'How much advance money can I get?'
      );
    }, 1500);
  };

  const QUICK_PROMPTS = [
    {
      label: currentLang === 'ta' ? '💰 நிதி தகுதி' : currentLang === 'hi' ? '💰 अग्रिम राशि' : '💰 Advance Limit',
      q: currentLang === 'ta' ? 'எவ்வளவு நிதி உதவி கிடைக்கும்?' : currentLang === 'hi' ? 'मुझे कितना अग्रिम मिल सकता है?' : 'How much advance money can I get?'
    },
    {
      label: currentLang === 'ta' ? '📊 இடர் ஸ்கோர்' : currentLang === 'hi' ? '📊 जोखिम स्कोर' : '📊 Risk Score',
      q: currentLang === 'ta' ? 'எனது கிரெடிட் ஸ்கோர் என்ன?' : currentLang === 'hi' ? 'मेरा क्रेडिट स्कोर क्या है?' : 'What is my current credit score?'
    },
    {
      label: currentLang === 'ta' ? '⚡ இன்வாய்ஸ் பூல்' : currentLang === 'hi' ? '⚡ बंडलिंग कैसे करें' : '⚡ How to Bundle',
      q: currentLang === 'ta' ? 'இன்வாய்ஸ் தொகுப்பது எப்படி?' : currentLang === 'hi' ? 'इनवॉइस बंडलिंग कैसे काम करती है?' : 'How does invoice bundling work?'
    },
    {
      label: currentLang === 'ta' ? '🏛️ அரசு மானியம்' : currentLang === 'hi' ? '🏛️ सरकारी योजनाएं' : '🏛️ Govt Schemes',
      q: currentLang === 'ta' ? 'அரசு மானியங்கள் மற்றும் திட்டங்கள் என்னென்ன?' : currentLang === 'hi' ? 'सरकारी योजनाएं और फंड क्या हैं?' : 'What government schemes are supported?'
    }
  ];

  return (
    <>
      {/* Floating Trigger Button in Bottom-Right */}
      <div className="fixed bottom-6 right-6 z-40">
        {!isOpen && (
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-2.5 px-4 py-3 bg-gradient-to-tr from-brand-900 via-brand-800 to-indigo-600 text-white rounded-full shadow-2xl shadow-brand-900/40 border border-brand-400/30 hover:border-brand-300"
          >
            {/* Animated ping dot */}
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>

            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
              <Bot className="w-4 h-4 text-amber-300 animate-pulse" />
            </div>

            <span className="text-xs font-extrabold tracking-wide pr-1">
              {currentLang === 'ta' ? 'நூல் AI சாட்' : currentLang === 'hi' ? 'नूल AI चैट' : 'Ask NOOL AI'}
            </span>
          </motion.button>
        )}
      </div>

      {/* Slide-Up Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[420px] h-[580px] bg-white rounded-3xl shadow-2xl border border-slate-200/80 flex flex-col overflow-hidden"
          >
            {/* Chatbot Header */}
            <div className="bg-gradient-to-r from-brand-900 via-brand-800 to-slate-900 text-white p-4 flex items-center justify-between shadow-md">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-brand-600/60 border border-brand-400/30 flex items-center justify-center text-amber-300 shadow-inner">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold leading-tight">NOOL AI Copilot</h3>
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  </div>
                  <p className="text-[10px] text-brand-200 flex items-center gap-1">
                    <span>{businessName}</span> • <span className="text-emerald-300">₹{totalEligible.toLocaleString('en-IN')} Limit</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Live Telemetry Strip */}
            <div className="bg-slate-50 px-3 py-1.5 border-b border-slate-100 flex items-center justify-between text-[10px] font-semibold text-slate-500">
              <span className="flex items-center gap-1">
                <Coins className="w-3 h-3 text-brand-600" /> ₹{totalInvoiceValue.toLocaleString('en-IN')} Total Value
              </span>
              <span className="text-emerald-700 font-bold">85% Advance Limit</span>
              <span className="text-brand-700 font-bold">Score {avgRiskScore}/100</span>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      msg.sender === 'user'
                        ? 'bg-brand-600 text-white'
                        : 'bg-brand-900 text-amber-300 shadow-xs'
                    }`}
                  >
                    {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                  </div>

                  <div className={`max-w-[80%] space-y-1 ${msg.sender === 'user' ? 'items-end' : ''}`}>
                    <div
                      className={`p-3 rounded-2xl text-xs leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-brand-600 text-white rounded-tr-xs shadow-xs'
                          : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-xs shadow-xs'
                      }`}
                    >
                      {msg.text}
                    </div>

                    <div className="flex items-center gap-2 px-1 text-[9px] text-slate-400">
                      <span>{msg.time}</span>
                      {msg.sender === 'bot' && (
                        <button
                          onClick={() => speakMessage(msg.text)}
                          className="text-slate-400 hover:text-brand-600 flex items-center gap-0.5"
                        >
                          <Volume2 className="w-2.5 h-2.5" /> Speak
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-slate-400 text-xs">
                  <div className="w-7 h-7 rounded-full bg-brand-900 text-amber-300 flex items-center justify-center">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="p-3 bg-white rounded-2xl border border-slate-200 rounded-tl-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-bounce"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Chips */}
            <div className="p-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {QUICK_PROMPTS.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(p.q)}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-brand-50 hover:text-brand-700 text-[11px] font-medium text-slate-600 whitespace-nowrap transition-colors shrink-0 border border-slate-200/60"
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
              <button
                type="button"
                onClick={handleVoiceInput}
                className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors shrink-0 ${
                  isListening
                    ? 'bg-rose-500 text-white animate-pulse ring-2 ring-rose-200'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
                title="Speak question"
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  currentLang === 'ta'
                    ? 'நிதி கேள்விகளைக் கேளுங்கள்...'
                    : currentLang === 'hi'
                    ? 'वित्तीय प्रश्न पूछें...'
                    : 'Ask any financial question...'
                }
                className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-500/20 text-slate-800"
              />

              <button
                type="submit"
                disabled={!input.trim()}
                className="w-8 h-8 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:bg-slate-200 text-white flex items-center justify-center transition-colors shrink-0 shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
