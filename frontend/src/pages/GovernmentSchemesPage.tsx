import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Landmark, FileText, CheckCircle2, ArrowRight, ExternalLink, ShieldAlert, CheckCircle, Building2, ShieldCheck, Info } from 'lucide-react';
import { api } from '../services/api';
import { GovernmentScheme } from '../types';

export const GovernmentSchemesPage: React.FC = () => {
  const { t } = useTranslation();
  const [schemes, setSchemes] = useState<GovernmentScheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const data = await api.getGovernmentSchemes();
        setSchemes(data);
      } catch (error) {
        console.error('Error fetching schemes:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSchemes();
  }, []);

  const categories = ['All', 'Credit Guarantees', 'Working Capital Support', 'Technology Upgradation', 'Entrepreneurship Support'];
  
  const filteredSchemes = filter === 'All' ? schemes : schemes.filter(s => s.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center">
            <Landmark className="w-8 h-8 mr-3 text-blue-600" />
            Government Support & Schemes
          </h1>
          <p className="mt-2 text-slate-600 max-w-2xl">
            Discover potentially relevant government schemes and funding opportunities for your MSME.
          </p>
        </div>
      </div>

      {/* Statutory Disclaimer */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg shadow-sm mb-8">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
          <p className="text-sm text-blue-800">
            <strong>Statutory Disclaimer:</strong> Nool Credit helps users discover potentially relevant schemes. Actual benefits, eligibility, and approval are determined by the respective government authority or financial institution. Nool Credit does not provide government funding.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === cat 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1,2,3,4].map(i => (
            <div key={i} className="bg-white rounded-xl h-64 border border-slate-200 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSchemes.map((scheme, idx) => (
            <motion.div 
              key={scheme.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow overflow-hidden flex flex-col"
            >
              <div className="p-6 flex-1">
                <div className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full mb-4">
                  {scheme.category}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{scheme.name}</h3>
                <p className="text-slate-600 text-sm mb-4">{scheme.description}</p>
                
                <div className="space-y-3 mt-6 border-t border-slate-100 pt-4">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs text-slate-500 font-medium uppercase tracking-wider block">Potential Benefit</span>
                      <span className="text-sm font-medium text-slate-900">{scheme.potentialBenefit}</span>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Building2 className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs text-slate-500 font-medium uppercase tracking-wider block">Who it may help</span>
                      <span className="text-sm text-slate-800">{scheme.eligibility}</span>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <ShieldCheck className="w-5 h-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs text-slate-500 font-medium uppercase tracking-wider block">Required Documents</span>
                      <span className="text-sm text-slate-800">{scheme.requiredDocuments.join(', ')}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 p-4 border-t border-slate-100 flex justify-end">
                <a 
                  href={scheme.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Check Eligibility & Learn More <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
