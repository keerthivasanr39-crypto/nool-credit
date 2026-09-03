import React from 'react';
import { motion } from 'framer-motion';
import { Users, Building, Factory, Landmark, Map, UserCheck } from 'lucide-react';

export const TargetAudiencePage: React.FC = () => {
  const primaryAudiences = [
    { title: 'Tiruppur Textile MSMEs', desc: 'Knitwear, dyeing, stitching, and printing job-work units.', icon: <Factory className="w-8 h-8 text-blue-600" /> },
    { title: 'Micro & Small Enterprises', desc: 'Small businesses waiting 60-90 days for buyer payments.', icon: <Users className="w-8 h-8 text-emerald-600" /> },
    { title: 'Manufacturing Suppliers', desc: 'Vendors facing working capital gaps between orders.', icon: <Building className="w-8 h-8 text-purple-600" /> },
  ];

  const secondaryAudiences = [
    { title: 'Banks & NBFCs', desc: 'Institutional lenders seeking verified MSME loan pools.', icon: <Landmark className="w-6 h-6 text-slate-700" /> },
    { title: 'FinTech Partners', desc: 'Platforms wanting to integrate MSME invoice origination.', icon: <UserCheck className="w-6 h-6 text-slate-700" /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-3xl font-bold text-slate-900 flex justify-center items-center">
          <Map className="w-8 h-8 mr-3 text-blue-600" />
          Who We Serve & Ecosystem
        </h1>
        <p className="mt-4 text-slate-600 text-lg">
          Connecting India's grassroots manufacturing ecosystem with institutional capital.
        </p>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Primary Target Audience</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {primaryAudiences.map((aud, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <div className="flex justify-center mb-4">{aud.icon}</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{aud.title}</h3>
              <p className="text-slate-600">{aud.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Secondary Ecosystem Partners</h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {secondaryAudiences.map((aud, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.1 }}
              className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex items-center"
            >
              <div className="bg-white p-3 rounded-full mr-4 shadow-sm border border-slate-100">{aud.icon}</div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">{aud.title}</h3>
                <p className="text-slate-600 text-sm">{aud.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-900 to-indigo-900 p-8 rounded-2xl shadow-xl text-white max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Scalability Roadmap</h2>
        <div className="flex flex-col md:flex-row justify-between items-center relative">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-blue-800 -translate-y-1/2 z-0"></div>
          
          {[
            { phase: 'Phase 1', title: 'Tiruppur Cluster', active: true },
            { phase: 'Phase 2', title: 'Tamil Nadu MSMEs', active: false },
            { phase: 'Phase 3', title: 'Pan-India', active: false },
            { phase: 'Phase 4', title: 'Multi-Sector', active: false },
          ].map((step, idx) => (
            <div key={idx} className="relative z-10 flex flex-col items-center mb-6 md:mb-0">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mb-3 shadow-lg ${
                step.active ? 'bg-emerald-500 text-white border-4 border-emerald-200' : 'bg-slate-800 text-slate-400 border-4 border-slate-700'
              }`}>
                {idx + 1}
              </div>
              <span className="text-sm font-semibold text-blue-200">{step.phase}</span>
              <span className="font-bold text-white whitespace-nowrap">{step.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
