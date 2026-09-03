import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Info, ArrowRight, Wallet, Activity, Database, Workflow, Building2, Landmark } from 'lucide-react';

export const BusinessModelPage: React.FC = () => {
  const revenueStreams = [
    {
      title: 'Lender Referral / Origination Fees',
      desc: 'Success-based fees charged to financing partners for successful loan disbursements.',
      icon: <Wallet className="w-6 h-6 text-blue-500" />
    },
    {
      title: 'Platform / SaaS Subscription',
      desc: 'Premium tier for Lenders requiring advanced API integration and custom MSME risk dashboards.',
      icon: <Database className="w-6 h-6 text-emerald-500" />
    },
    {
      title: 'Value-Added Analytics',
      desc: 'Industry benchmark reports and predictive cash-flow modeling tools for registered MSMEs.',
      icon: <Activity className="w-6 h-6 text-purple-500" />
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-3xl font-bold text-slate-900 flex justify-center items-center">
          <Briefcase className="w-8 h-8 mr-3 text-blue-600" />
          Potential Business Model
        </h1>
        <p className="mt-4 text-slate-600 text-lg">
          How Nool Credit intends to create sustainable value while empowering the MSME ecosystem.
        </p>
      </div>

      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg shadow-sm mb-12 max-w-4xl mx-auto">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
          <p className="text-sm text-amber-800">
            <strong>Regulatory Disclaimer:</strong> Nool Credit is a prototype platform designed to simplify MSME invoice-financing workflows. This business model is illustrative. Nool Credit does not represent that it is a bank, NBFC, or regulated lender. Facilitation fees are subject to applicable regulations, licensing, and partner agreements.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {revenueStreams.map((stream, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
            className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center flex flex-col items-center"
          >
            <div className="bg-slate-50 p-4 rounded-full mb-4">
              {stream.icon}
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">{stream.title}</h3>
            <p className="text-slate-600 text-sm">{stream.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Value Flow Diagram</h2>
        
        <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-center w-full md:w-1/4"
          >
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 h-32 flex flex-col items-center justify-center shadow-sm">
              <Building2 className="w-8 h-8 text-blue-600 mb-2" />
              <span className="font-bold text-blue-900">Job-Work MSME</span>
            </div>
            <p className="text-xs text-slate-500 mt-3">Uploads Unpaid Invoices</p>
          </motion.div>
          
          <div className="flex flex-col items-center text-slate-400">
            <Workflow className="w-6 h-6 mb-1" />
            <ArrowRight className="w-6 h-6 hidden md:block" />
            <div className="h-8 w-0.5 bg-slate-300 block md:hidden"></div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center w-full md:w-1/3 relative"
          >
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 h-36 flex flex-col items-center justify-center shadow-lg transform hover:scale-105 transition-transform">
              <span className="font-black text-white text-xl tracking-wider">NOOL CREDIT</span>
              <span className="text-blue-100 text-xs mt-2 uppercase tracking-widest font-semibold">Invoice Intelligence</span>
            </div>
            <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-48 text-center">
              <p className="text-xs font-semibold text-emerald-600 bg-emerald-50 py-1 px-2 rounded-full border border-emerald-100 shadow-sm">
                Potential Revenue Node
              </p>
            </div>
          </motion.div>

          <div className="flex flex-col items-center text-slate-400 mt-12 md:mt-0">
            <ArrowRight className="w-6 h-6 hidden md:block" />
            <div className="h-8 w-0.5 bg-slate-300 block md:hidden"></div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center w-full md:w-1/4"
          >
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 h-32 flex flex-col items-center justify-center shadow-sm">
              <Landmark className="w-8 h-8 text-emerald-600 mb-2" />
              <span className="font-bold text-emerald-900">Financing Partner</span>
            </div>
            <p className="text-xs text-slate-500 mt-3">Disburses Working Capital</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
