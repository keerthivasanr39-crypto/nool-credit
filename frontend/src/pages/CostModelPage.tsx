import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, Server, Shield, BrainCircuit, Code, Info } from 'lucide-react';

export const CostModelPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-3xl font-bold text-slate-900 flex justify-center items-center">
          <Calculator className="w-8 h-8 mr-3 text-blue-600" />
          Cost & Economics
        </h1>
        <p className="mt-4 text-slate-600 text-lg">
          Illustrative breakdown of prototype and production operating economics.
        </p>
      </div>

      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg shadow-sm mb-12 max-w-4xl mx-auto">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
          <p className="text-sm text-amber-800">
            <strong>Illustrative Prototype Estimates:</strong> All costs, percentages, and unit economics displayed below are illustrative demo values for the hackathon prototype and do not represent actual real-world incurred costs. Actual production costs vary significantly based on scale, architecture, and vendor pricing.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12 max-w-6xl mx-auto">
        {/* Cost Categories */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Operating Cost Categories</h2>
          
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center">
            <div className="bg-blue-50 p-3 rounded-lg mr-4"><Server className="w-6 h-6 text-blue-600" /></div>
            <div>
              <h3 className="font-bold text-slate-900">Cloud Hosting & Database</h3>
              <p className="text-sm text-slate-500">Servers, MongoDB Atlas, API Gateway</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center">
            <div className="bg-purple-50 p-3 rounded-lg mr-4"><BrainCircuit className="w-6 h-6 text-purple-600" /></div>
            <div>
              <h3 className="font-bold text-slate-900">AI & OCR API Usage</h3>
              <p className="text-sm text-slate-500">Invoice data extraction, AI Risk Engine processing</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center">
            <div className="bg-emerald-50 p-3 rounded-lg mr-4"><Shield className="w-6 h-6 text-emerald-600" /></div>
            <div>
              <h3 className="font-bold text-slate-900">Security & Compliance</h3>
              <p className="text-sm text-slate-500">KYC verification APIs, SSL, WAF, Auditing</p>
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center">
            <div className="bg-amber-50 p-3 rounded-lg mr-4"><Code className="w-6 h-6 text-amber-600" /></div>
            <div>
              <h3 className="font-bold text-slate-900">Technology Maintenance</h3>
              <p className="text-sm text-slate-500">Engineering, DevOps, continuous integration</p>
            </div>
          </div>
        </div>

        {/* Unit Economics Calculator */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl shadow-xl text-white">
          <h2 className="text-2xl font-bold mb-8">Unit Economics Calculation</h2>
          
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-slate-700 pb-4">
              <span className="text-slate-300">Invoice Value Facilitated:</span>
              <span className="font-mono text-xl font-bold">₹1,00,000</span>
            </div>
            
            <div className="flex justify-between items-center border-b border-slate-700 pb-4">
              <span className="text-slate-300">Potential Partner Fee (Illustrative 1.5%):</span>
              <span className="font-mono text-emerald-400 text-xl font-bold">+ ₹1,500</span>
            </div>

            <div className="flex justify-between items-center border-b border-slate-700 pb-4">
              <span className="text-slate-300">Technology & API Cost / Transaction:</span>
              <span className="font-mono text-rose-400 text-xl font-bold">- ₹125</span>
            </div>

            <div className="flex justify-between items-center border-b border-slate-700 pb-4">
              <span className="text-slate-300">Operational & KYC Cost / Transaction:</span>
              <span className="font-mono text-rose-400 text-xl font-bold">- ₹85</span>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-lg font-bold text-white">Estimated Unit Contribution:</span>
              <span className="font-mono text-2xl font-black text-emerald-500">₹1,290</span>
            </div>
          </div>
          
          <div className="mt-8 text-xs text-slate-400 text-center">
            * All values are hypothetical and for demonstration purposes only.
          </div>
        </div>
      </div>
    </div>
  );
};
