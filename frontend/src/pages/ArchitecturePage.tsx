import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Server, Database, Shield, Globe, Cpu, Smartphone, Lock, Activity } from 'lucide-react';

export const ArchitecturePage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-3xl font-bold text-slate-900 flex justify-center items-center">
          <Layout className="w-8 h-8 mr-3 text-blue-600" />
          System Architecture
        </h1>
        <p className="mt-4 text-slate-600 text-lg">
          High-level technical design of the Nool Credit platform.
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm max-w-5xl mx-auto relative overflow-hidden">
        {/* Animated Background Lines */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg width="100%" height="100%">
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative z-10 space-y-12">
          
          {/* Frontend Layer */}
          <div className="text-center">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Presentation Layer</h3>
            <div className="flex justify-center space-x-6">
              <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-blue-50 border border-blue-200 p-4 rounded-xl shadow-sm w-48 text-center flex flex-col items-center">
                <Globe className="w-8 h-8 text-blue-600 mb-2" />
                <span className="font-bold text-slate-800">React Frontend</span>
                <span className="text-xs text-slate-500 mt-1">Vite + Tailwind</span>
              </motion.div>
              <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="bg-indigo-50 border border-indigo-200 p-4 rounded-xl shadow-sm w-48 text-center flex flex-col items-center">
                <Smartphone className="w-8 h-8 text-indigo-600 mb-2" />
                <span className="font-bold text-slate-800">Responsive UI</span>
                <span className="text-xs text-slate-500 mt-1">Mobile First</span>
              </motion.div>
            </div>
          </div>

          {/* Connection Line */}
          <div className="flex justify-center">
            <div className="h-12 w-0.5 bg-slate-300 relative">
              <motion.div 
                animate={{ y: [0, 48, 0] }} 
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute top-0 -left-1 w-2.5 h-2.5 bg-blue-500 rounded-full" 
              />
            </div>
          </div>

          {/* API Gateway & Auth Layer */}
          <div className="text-center">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">API & Security Layer</h3>
            <div className="flex justify-center">
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }} className="bg-slate-800 p-4 rounded-xl shadow-md w-full max-w-lg text-center flex items-center justify-center space-x-4">
                <Lock className="w-6 h-6 text-emerald-400" />
                <span className="font-bold text-white tracking-wide">REST API Gateway + JWT Auth</span>
                <Shield className="w-6 h-6 text-emerald-400" />
              </motion.div>
            </div>
          </div>

          {/* Connection Line */}
          <div className="flex justify-center">
            <div className="h-12 w-0.5 bg-slate-300 relative">
              <motion.div 
                animate={{ y: [0, 48, 0] }} 
                transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                className="absolute top-0 -left-1 w-2.5 h-2.5 bg-emerald-500 rounded-full" 
              />
            </div>
          </div>

          {/* Microservices Layer */}
          <div className="text-center">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Node.js / Express Services</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex flex-col items-center">
                <Server className="w-6 h-6 text-slate-600 mb-2" />
                <span className="font-semibold text-sm">Invoice Service</span>
              </div>
              <div className="bg-white border border-emerald-300 p-4 rounded-xl shadow-sm flex flex-col items-center bg-emerald-50">
                <Cpu className="w-6 h-6 text-emerald-600 mb-2" />
                <span className="font-semibold text-sm text-emerald-900">Risk Engine</span>
              </div>
              <div className="bg-white border border-blue-300 p-4 rounded-xl shadow-sm flex flex-col items-center bg-blue-50">
                <Activity className="w-6 h-6 text-blue-600 mb-2" />
                <span className="font-semibold text-sm text-blue-900">Financing Service</span>
              </div>
              <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex flex-col items-center">
                <Server className="w-6 h-6 text-slate-600 mb-2" />
                <span className="font-semibold text-sm">Govt Schemes API</span>
              </div>
            </div>
          </div>

          {/* Connection Line */}
          <div className="flex justify-center">
            <div className="h-12 w-0.5 bg-slate-300 relative">
              <motion.div 
                animate={{ y: [0, 48, 0] }} 
                transition={{ repeat: Infinity, duration: 2, delay: 1 }}
                className="absolute top-0 -left-1 w-2.5 h-2.5 bg-purple-500 rounded-full" 
              />
            </div>
          </div>

          {/* Database & External Layer */}
          <div className="text-center">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Data & Integrations</h3>
            <div className="flex justify-center space-x-6">
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl shadow-sm w-48 text-center flex flex-col items-center">
                <Database className="w-8 h-8 text-emerald-600 mb-2" />
                <span className="font-bold text-slate-800">MongoDB</span>
                <span className="text-xs text-slate-500 mt-1">Primary Data Store</span>
              </motion.div>
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="bg-amber-50 border border-amber-200 p-4 rounded-xl shadow-sm w-48 text-center flex flex-col items-center">
                <Globe className="w-8 h-8 text-amber-600 mb-2" />
                <span className="font-bold text-slate-800">Govt GSP APIs</span>
                <span className="text-[10px] text-slate-500 mt-1">ClearTax / GST Verification</span>
              </motion.div>
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }} className="bg-blue-50 border border-blue-200 p-4 rounded-xl shadow-sm w-48 text-center flex flex-col items-center">
                <Globe className="w-8 h-8 text-blue-600 mb-2" />
                <span className="font-bold text-slate-800">Account Aggregator</span>
                <span className="text-[10px] text-slate-500 mt-1">Setu / RBI FIU Framework</span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-8 bg-blue-50 border border-blue-200 p-6 rounded-xl">
        <h3 className="font-bold text-blue-900 mb-2 flex items-center"><Shield className="w-5 h-5 mr-2" /> 3-Layer Anti-Fraud Architecture (Real-World Implementation)</h3>
        <ul className="text-sm text-blue-800 space-y-2 list-disc pl-5">
          <li><strong>GST Validation:</strong> Integrates with authorized GST Suvidha Providers (GSPs) to cross-check invoice filings instantly against the government portal.</li>
          <li><strong>E-Invoice & IRN Scanning:</strong> Validates the cryptographic QR codes generated by the IRP to prevent Photoshop tampering.</li>
          <li><strong>Fake History Prevention:</strong> Acts as a Financial Information User (FIU) via the RBI Account Aggregator framework to securely read immutable bank statements and verify past buyer payments.</li>
        </ul>
      </div>
    </div>
  );
};
