import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Send,
  Mic,
  ShieldCheck,
  Bot,
  User,
  HelpCircle,
  Lightbulb,
  ArrowRight,
  TrendingUp,
  FileCheck
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  suggestions?: string[];
}

export const AIAssistantPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const { invoices } = useApp();

  const currentLang = i18n.language?.startsWith('ta') ? 'ta' : i18n.language?.startsWith('hi') ? 'hi' : 'en';

  const totalInvoiceValue = invoices.reduce((acc, inv) => acc + inv.invoiceAmount, 0) || 480000;
  const totalEligible = invoices.reduce((acc, inv) => acc + inv.eligibleFinancing, 0) || 383250;
  const invoiceCount = invoices.length || 3;
  const userName = user?.name || 'Entrepreneur';
  const businessName = user?.businessName || 'Sri Lakshmi Knits';

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const welcome =
      currentLang === 'ta'
        ? `வணக்கம் ${userName}! நான் நூல் AI, உங்கள் நடைமுறை மூலதன நிதியியல் வழிகாட்டி 🤖. ${businessName}-ன் ₹${totalInvoiceValue.toLocaleString('en-IN')} மதிப்புள்ள இன்வாய்ஸ்களுக்கு எவ்வாறு நிதி பெறுவது, இடர் மதிப்பீடு பற்றி எதையும் கேளுங்கள்!`
        : currentLang === 'hi'
        ? `नमस्ते ${userName}! मैं नूल AI, आपका वित्तीय सह-पायलट 🤖 हूँ। ${businessName} के ₹${totalInvoiceValue.toLocaleString('en-IN')} मूल्य के इनवॉइस पर वित्तपोषण के बारे में कुछ भी पूछें!`
        : `Hello ${userName}! I am NOOL AI, your working capital financial guide 🤖. How can I help ${businessName} today?`;

    const initialSuggestions =
      currentLang === 'ta'
        ? [
            'எனது நிதி தகுதி என்ன?',
            'இடர் ஸ்கோர் 86/100 ஏன்?',
            'நிலுவையில் உள்ள இன்வாய்ஸ்களைக் காட்டு.',
            'அரசு மானியங்கள் என்னென்ன?'
          ]
        : currentLang === 'hi'
        ? [
            'मेरी वित्तपोषण पात्रता क्या है?',
            'मेरा जोखिम स्कोर 86/100 क्यों है?',
            'मेरे लंबित इनवॉइस दिखाएं।',
            'सरकारी योजनाएं कौन सी हैं?'
          ]
        : [
            'What is my financing eligibility?',
            'Why is my risk score 86/100?',
            'Show my pending invoices.',
            'What government schemes are supported?'
          ];

    setMessages([
      {
        id: 'msg-1',
        sender: 'ai',
        text: welcome,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: initialSuggestions
      }
    ]);
  }, [currentLang, userName, businessName, totalInvoiceValue]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleVoiceListen = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-IN';
      recognition.interimResults = false;

      setIsListening(true);
      recognition.start();

      recognition.onresult = (event: any) => {
        const spoken = event.results[0][0].transcript;
        setInputQuery(spoken);
        setIsListening(false);
        handleSend(spoken);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };
    } else {
      // Fallback
      setIsListening(true);
      setTimeout(() => {
        setIsListening(false);
        const sample = 'What is my financing eligibility?';
        setInputQuery(sample);
        handleSend(sample);
      }, 1500);
    }
  };

  const generateAIResponse = (query: string): string => {
    const q = query.toLowerCase();

    if (
      q.includes('eligibility') ||
      q.includes('eligible') ||
      q.includes('how much') ||
      q.includes('advance') ||
      q.includes('தகுதி') ||
      q.includes('எவ்வளவு') ||
      q.includes('पात्रता') ||
      q.includes('कितना')
    ) {
      if (currentLang === 'ta') {
        return `${businessName}-ன் நிதி தகுதி: ₹${totalInvoiceValue.toLocaleString('en-IN')} மதிப்புள்ள ${invoiceCount} விலைப்பட்டியல்களுக்கு 85% வரை உடனடி நடைமுறை மூலதனம் (₹${totalEligible.toLocaleString('en-IN')}) பெறலாம். 48 மணி நேரத்தில் வங்கி கணக்கில் வரவு வைக்கப்படும்.`;
      }
      if (currentLang === 'hi') {
        return `${businessName} की वित्तपोषण पात्रता: कुल ₹${totalInvoiceValue.toLocaleString('en-IN')} के ${invoiceCount} इनवॉइस पर 85% तक (₹${totalEligible.toLocaleString('en-IN')}) का अग्रिम प्राप्त हो सकता है, जो 48 घंटों में वितरित होगा।`;
      }
      return `Based on your profile with ${businessName}, your estimated financing eligibility is ₹${totalEligible.toLocaleString('en-IN')} across your ₹${totalInvoiceValue.toLocaleString('en-IN')} verified invoice portfolio (85% advance ratio). You have a High Confidence and Low Risk rating.`;
    }

    if (
      q.includes('risk score') ||
      q.includes('why') ||
      q.includes('86') ||
      q.includes('score') ||
      q.includes('இடர்') ||
      q.includes('ஸ்கோர்') ||
      q.includes('जोखिम') ||
      q.includes('स्कोर')
    ) {
      if (currentLang === 'ta') {
        return `உங்கள் தற்போதைய இடர் மதிப்பெண் 86/100 (குறைந்த இடர் / LOW RISK).

முக்கிய காரணிகள்:
✓ ABC Garments உடனான 38 வெற்றிகரமான முந்தைய கொடுப்பனவுகள்
✓ 100% சரியான நேர GST தாக்கல்
✓ திருப்பூர் ஜவுளி உற்பத்தி கிளஸ்டர் அங்கீகாரம்

மேம்படுத்த:
Q2 தணிக்கை செய்யப்பட்ட வங்கி அறிக்கையைப் பதிவேற்றி ஸ்கோரை 90+ ஆக உயர்த்தலாம்.`;
      }
      if (currentLang === 'hi') {
        return `आपका वर्तमान जोखिम स्कोर 86/100 (कम जोखिम / LOW RISK) है।

सकारात्मक कारक:
✓ ABC Garments के साथ 38 सफल निपटान
✓ 100% समय पर GST फाइलिंग
✓ तिरुपुर कपड़ा क्लस्टर में सक्रिय विनिर्माण इकाई`;
      }
      return `Your current risk score is 86/100 (LOW RISK). 

Key positive factors:
✓ 38 successful previous settlements with ABC Garments
✓ 100% GST on-time filing compliance
✓ Active manufacturing unit in Tirupur cluster

Minor factor:
⚠ Recent payment settlement cycle averages 66 days. Upload your latest Q2 audited bank statement to reach 90+.`;
    }

    if (
      q.includes('missing') ||
      q.includes('document') ||
      q.includes('kyc') ||
      q.includes('ஆவணம்') ||
      q.includes('दस्तावेज़')
    ) {
      if (currentLang === 'ta') {
        return `உங்கள் ஆவண பெட்டகம் 80% நிறைவடைந்துள்ளது!
✓ பான் கார்டு சரிபார்க்கப்பட்டது
✓ ஜிஎஸ்டி சான்றிதழ் சரிபார்க்கப்பட்டது
✓ ஆதார் இ-கேஒய்சி சரிபார்க்கப்பட்டது
✓ வங்கி அறிக்கை சரிபார்க்கப்பட்டது

நிலுவையில் உள்ளது: Q2 தணிக்கை செய்யப்பட்ட இருப்புநிலைக் குறிப்பை பதிவேற்றி +5 புள்ளிகளைப் பெறலாம்.`;
      }
      return `Your Document Vault is 80% complete! 
✓ PAN Card Verified
✓ GST Certificate Verified
✓ Aadhaar e-KYC Verified
✓ Bank Statement (6 Months) Verified

Pending: Upload your latest Q2 Audited Balance Sheet to boost your Nool Business Score by +5 points.`;
    }

    if (
      q.includes('pending') ||
      q.includes('invoice') ||
      q.includes('விலைப்பட்டியல்') ||
      q.includes('இன்வாய்ஸ்') ||
      q.includes('इनवॉइस')
    ) {
      if (currentLang === 'ta') {
        return `உங்களிடம் தொகுப்பதற்கு தயாராக உள்ள விலைப்பட்டியல்கள்:
1. INV-1001: ₹60,000 (ABC Garments)
2. INV-1002: ₹80,000 (Royal Exports)
3. INV-1003: ₹1,20,000 (Chennai Weaving Mills)

மொத்த மதிப்பு: ₹2,60,000. நீங்கள் ₹2,08,000-ஐ 48 மணி நேரத்தில் பெறலாம்.`;
      }
      return `You have 3 eligible verified invoices ready for pooling:
1. INV-1001: ₹60,000 (ABC Garments)
2. INV-1002: ₹80,000 (Royal Exports)
3. INV-1003: ₹1,20,000 (Chennai Weaving Mills)

Total bundle value: ₹2,60,000. You can unlock ₹2,08,000 in 48 hours.`;
    }
    return `Thank you for your question! For Sri Lakshmi Knits, our platform assesses GST invoices, transaction stability, and buyer payment track records. You can bundle your pending ₹2.6L invoices to unlock capital within 48 hours.`;
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      const responseText = generateAIResponse(query);
      const aiMsg: Message = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-brand-900 via-brand-800 to-slate-900 text-white rounded-3xl p-6 shadow-lg flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-brand-700/80 border border-brand-500/40 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold">NOOL AI Financial Assistant</h1>
            <p className="text-xs text-brand-200">Interactive guidance on working capital, risk scoring, and eligibility</p>
          </div>
        </div>

        <span className="text-[11px] font-semibold text-brand-200 bg-brand-800/80 px-3 py-1 rounded-full border border-brand-600/50 hidden sm:inline">
          Educational Guide
        </span>
      </div>

      {/* Chat Container */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md flex flex-col h-[580px] overflow-hidden">
        {/* Messages Scroll Area */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          {messages.map((m) => {
            const isAI = m.sender === 'ai';
            return (
              <div
                key={m.id}
                className={`flex items-start gap-2.5 ${isAI ? 'justify-start' : 'justify-end'}`}
              >
                {isAI && (
                  <div className="w-8 h-8 rounded-xl bg-brand-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-lg space-y-2`}>
                  <div
                    className={`p-4 rounded-2xl text-xs leading-relaxed ${
                      isAI
                        ? 'bg-slate-50 border border-slate-200/80 text-slate-800'
                        : 'bg-brand-600 text-white shadow-xs'
                    }`}
                  >
                    <p className="whitespace-pre-line">{m.text}</p>
                    <span className={`block text-[10px] mt-1.5 ${isAI ? 'text-slate-400' : 'text-brand-200'} text-right`}>
                      {m.timestamp}
                    </span>
                  </div>

                  {/* Suggested Question Chips on Initial AI message */}
                  {isAI && m.suggestions && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {m.suggestions.map((chip, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSend(chip)}
                          className="px-3 py-1 rounded-full bg-brand-50 hover:bg-brand-100 text-brand-800 border border-brand-200 text-[11px] font-medium transition-colors text-left"
                        >
                          {chip}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {!isAI && (
                  <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-slate-400 p-2">
              <div className="w-6 h-6 rounded-lg bg-brand-100 text-brand-600 flex items-center justify-center animate-pulse">
                <Bot className="w-3.5 h-3.5" />
              </div>
              <span>NOOL AI is formulating guidance...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Bottom Input Box */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 space-y-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <button
              type="button"
              onClick={handleVoiceListen}
              className={`p-2.5 rounded-xl border transition-all ${
                isListening
                  ? 'bg-rose-500 text-white animate-pulse border-rose-600'
                  : 'bg-white text-slate-600 hover:text-brand-600 border-slate-200'
              }`}
              title="Voice Typing"
            >
              <Mic className="w-4 h-4" />
            </button>

            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder={isListening ? '🎙 Listening to speech...' : 'Ask about financing, risk score, invoices...'}
              className="flex-1 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />

            <button
              type="submit"
              disabled={!inputQuery.trim() || isTyping}
              className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-sm transition-all disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          <div className="text-[10px] text-slate-400 text-center flex items-center justify-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            <span>Nool AI is for educational and guidance purposes. Financing decisions are subject to institutional lender approval.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
