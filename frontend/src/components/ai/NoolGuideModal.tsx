import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  Send, 
  X, 
  Sparkles, 
  ArrowRight, 
  HelpCircle, 
  CheckCircle2, 
  Layers, 
  ShieldCheck,
  FileCheck2
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDemoData } from '../../context/DemoDataContext';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  actions?: { label: string; url: string }[];
}

export const NoolGuideModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { invoices, pools } = useDemoData();

  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'bot',
      text: "Hello! I am Nool Guide, your personal MSME invoice financing assistant. How can I help you accelerate your working capital today?",
      actions: [
        { label: 'Check Financing Eligibility', url: '/msme/pool' },
        { label: 'Improve Readiness Score', url: '/msme/documents' },
      ],
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const quickQuestions = [
    t('guide.q1'),
    t('guide.q2'),
    t('guide.q3'),
    t('guide.q4'),
  ];

  const handleSend = (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: textToSend,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      let botReply = '';
      let suggestedActions: { label: string; url: string }[] | undefined;

      const lower = textToSend.toLowerCase();
      if (lower.includes('financing') || lower.includes('request') || lower.includes('eligible') || lower.includes('right now')) {
        botReply = `Based on your live profile for Sri Lakshmi Knits, you have 3 verified invoices totaling ₹2,60,000 (INV-1001, INV-1002, and INV-1003). They are eligible for an estimated 80% working capital advance of ₹2,08,000 via pool bundling.`;
        suggestedActions = [{ label: 'Bundle Invoices (POOL-1001)', url: '/msme/pool' }];
      } else if (lower.includes('readiness') || lower.includes('score') || lower.includes('improve')) {
        botReply = `Your Nool Credit Readiness Score is currently 82/100 (GOOD). To boost it to 87+, verify your pending audited financial document in the Document Vault and confirm your bank IFSC details.`;
        suggestedActions = [{ label: 'Open Document Vault', url: '/msme/documents' }];
      } else if (lower.includes('bundling') || lower.includes('pool') || lower.includes('help')) {
        botReply = `Invoice Bundling allows job-work MSMEs in manufacturing clusters like Tiruppur to combine several small-ticket invoices (e.g. ₹60k + ₹80k + ₹1.2L) into a diversified pool. This lowers default risk for partner lenders and unlocks up to 80-85% advance liquidity in 24 hours.`;
        suggestedActions = [{ label: 'Try Invoice Bundling', url: '/msme/pool' }];
      } else if (lower.includes('86') || lower.includes('why') || lower.includes('risk')) {
        botReply = `Your verified invoice scored 86/100 (LOW RISK) because buyer ABC Garments Ltd. has a 98% on-time settlement record, clean GST filings, and a consistent 12-month order cadence with no active disputes.`;
        suggestedActions = [{ label: 'View Explainable Risk Model', url: '/msme/invoices' }];
      } else {
        botReply = `I can help you navigate invoice uploads, explain your 100-point risk score, guide document verification, or bundle invoices into high-advance collateral pools. What would you like to explore next?`;
        suggestedActions = [
          { label: 'Upload New Invoice', url: '/msme/invoices' },
          { label: 'View Dashboard', url: '/msme/dashboard' },
        ];
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: botReply,
          actions: suggestedActions,
        },
      ]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="w-full max-w-xl h-[620px] glass-card rounded-3xl border border-blue-500/40 shadow-2xl flex flex-col overflow-hidden relative"
          >
            {/* Header */}
            <div className="p-4 px-6 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 p-0.5 shadow-md shadow-blue-500/30">
                  <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                    <Bot className="w-5 h-5 text-cyan-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
                    {t('guide.title')}
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Live Assistant
                    </span>
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {t('guide.subtitle')}
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-5 overflow-y-auto space-y-4 text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none shadow-md shadow-blue-500/20'
                        : 'bg-slate-900/90 text-slate-200 border border-slate-800 rounded-bl-none shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Suggested Action Chips */}
                  {msg.actions && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {msg.actions.map((act, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            onClose();
                            navigate(act.url);
                          }}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 text-[11px] font-semibold transition-all"
                        >
                          <span>{act.label}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-400 text-xs w-24">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" />
                </div>
              )}
            </div>

            {/* Quick Questions Tray */}
            <div className="px-4 py-2 bg-slate-900/60 border-t border-slate-800/80 overflow-x-auto flex gap-2">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] border border-slate-700 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2"
            >
              <input
                type="text"
                placeholder={t('guide.askPlaceholder')}
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                className="flex-1 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:opacity-90 shadow-md shadow-blue-500/20"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
