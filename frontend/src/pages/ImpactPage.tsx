import React from 'react';
import { motion } from 'framer-motion';
import { HeartHandshake, TrendingUp, FileCheck, Banknote, ArrowRight } from 'lucide-react';

export const ImpactPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold text-slate-900 flex justify-center items-center">
          <HeartHandshake className="w-10 h-10 mr-4 text-emerald-600" />
          Our Impact
        </h1>
        <p className="mt-4 text-slate-600 text-lg">
          Transforming the way small businesses operate by eliminating working capital bottlenecks.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
          <div className="bg-emerald-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Banknote className="w-8 h-8 text-emerald-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Bridge Capital Gaps</h3>
          <p className="text-slate-600">Convert 60-90 day waiting periods into immediate liquidity for raw materials and wages.</p>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
          <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileCheck className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Reduce Paperwork</h3>
          <p className="text-slate-600">One digital profile. One verification. Eliminate repetitive manual document submissions.</p>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
          <div className="bg-purple-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-purple-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Business Continuity</h3>
          <p className="text-slate-600">Empower MSMEs to take on new orders immediately without waiting for previous payments.</p>
        </motion.div>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">The Working Capital Transformation</h2>
        
        <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
          <div className="text-center w-full md:w-1/4">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 shadow-sm">
              <span className="font-bold text-slate-700 block">Pending Invoice</span>
              <span className="text-xs text-slate-500">Day 1</span>
            </div>
          </div>
          
          <ArrowRight className="w-6 h-6 text-slate-400 hidden md:block" />
          <div className="h-6 w-0.5 bg-slate-300 block md:hidden"></div>

          <div className="text-center w-full md:w-1/4 relative">
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 shadow-sm transform -rotate-1">
              <span className="font-bold text-rose-700 block">Capital Gap</span>
              <span className="text-xs text-rose-500">Day 2 to 60</span>
            </div>
            <div className="absolute -top-3 -right-3">
              <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">Pain Point</span>
            </div>
          </div>

          <ArrowRight className="w-6 h-6 text-slate-400 hidden md:block" />
          <div className="h-6 w-0.5 bg-slate-300 block md:hidden"></div>

          <div className="text-center w-full md:w-1/4">
            <div className="bg-blue-600 border border-blue-700 rounded-xl p-4 shadow-md transform scale-110">
              <span className="font-bold text-white block">Nool Credit</span>
              <span className="text-xs text-blue-200">Financing Access</span>
            </div>
          </div>

          <ArrowRight className="w-6 h-6 text-emerald-500 hidden md:block" />
          <div className="h-6 w-0.5 bg-emerald-500 block md:hidden"></div>

          <div className="text-center w-full md:w-1/4">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 shadow-sm">
              <span className="font-bold text-emerald-700 block">Business Continuity</span>
              <span className="text-xs text-emerald-500">Instant Growth</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
