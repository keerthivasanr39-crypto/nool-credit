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

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  suggestions?: string[];
}

export const AIAssistantPage: React.FC = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: 'Namaste Karthik! I am NOOL AI, your working capital financial guide. How can I help Sri Lakshmi Knits today?',
      timestamp: '10:00 AM',
      suggestions: [
        'What is my financing eligibility?',
        'Why is my risk score 86/100?',
        'What documents are missing?',
        'Show my pending invoices.',
        'How can I improve my financing eligibility?'
      ]
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
    if (q.includes('eligibility') || q.includes('eligible')) {
      return `Based on your profile with Sri Lakshmi Knits, your current estimated financing eligibility is ₹3,90,000 across your ₹4,80,000 verified invoice portfolio (85% advance ratio). You have a High Confidence and Low Risk rating.`;
    }
    if (q.includes('risk score') || q.includes('why') || q.includes('86')) {
      return `Your current risk score is 86/100 (LOW RISK). 

Key positive factors:
✓ 38 successful previous settlements with ABC Garments
✓ 100% GST on-time filing compliance
✓ Active manufacturing unit in Tirupur cluster

Minor factor:
⚠ Recent payment settlement cycle averages 66 days.`;
    }
    if (q.includes('missing') || q.includes('document') || q.includes('kyc')) {
      return `Your Document Vault is 80% complete! 
✓ PAN Card Verified
✓ GST Certificate Verified
✓ Aadhaar e-KYC Verified
✓ Bank Statement (6 Months) Verified

Pending: Upload your latest Q2 Audited Balance Sheet to boost your Nool Business Score by +5 points.`;
    }
    if (q.includes('pending') || q.includes('invoice')) {
      return `You have 3 eligible verified invoices ready for pooling:
1. INV-1001: ₹60,000 (ABC Garments)
2. INV-1002: ₹80,000 (Royal Exports)
3. INV-1003: ₹1,20,000 (Chennai Weaving Mills)

Total bundle value: ₹2,60,000. You can unlock ₹2,08,000 in 48 hours.`;
    }
    if (q.includes('improve') || q.includes('boost')) {
      return `To maximize your financing limit and lower discount rates:
1. Maintain consistent settlement records with anchor buyers.
2. Upload audited annual financials in the Document Center.
3. Bundle 3+ invoices into a single pool to diversify buyer risk.`;
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
