import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, FileSpreadsheet, Plus, CheckCircle2, Filter, ShieldAlert } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { InvoiceUploadDropzone } from '../components/invoice/InvoiceUploadDropzone';
import { ExtractionCard } from '../components/invoice/ExtractionCard';
import { InvoiceTable } from '../components/invoice/InvoiceTable';

export const InvoicesPage: React.FC = () => {
  const { t } = useTranslation();
  const { invoices, addInvoice } = useApp();
  const [searchParams] = useSearchParams();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [extractedData, setExtractedData] = useState<any>(null);

  useEffect(() => {
    if (searchParams.get('action') === 'upload') {
      setShowUploadModal(true);
    }
  }, [searchParams]);

  const handleExtractionComplete = (data: any) => {
    setExtractedData(data);
  };

  const handleSaveInvoice = async (finalData: any) => {
    await addInvoice(finalData);
    setExtractedData(null);
    setShowUploadModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">{t('invoices.title')}</h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage your verified and pending invoices for pool bundling and working capital.
          </p>
        </div>

        <button
          onClick={() => {
            setExtractedData(null);
            setShowUploadModal(true);
          }}
          className="flex items-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{t('dashboard.uploadInvoice')}</span>
        </button>
      </div>

      <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-start gap-4">
        <div className="bg-emerald-100 p-2 rounded-lg shrink-0 mt-0.5">
          <ShieldAlert className="w-5 h-5 text-emerald-700" />
        </div>
        <div>
          <h4 className="font-bold text-emerald-900 text-sm flex items-center gap-2">
            3-Layer Institutional Security Active
            <span className="bg-emerald-200 text-emerald-800 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">Enabled</span>
          </h4>
          <p className="text-emerald-700 text-xs mt-1 leading-relaxed">
            All uploaded invoices are automatically verified against the <strong>Government GST Portal (via GSP API)</strong> and scanned for <strong>cryptographic E-Invoice IRN tampering</strong>. Past payment histories are matched immutably via the <strong>RBI Account Aggregator framework</strong> to prevent fraud and guarantee lender trust.
          </p>
        </div>
      </div>

      {/* Invoice Upload & Extraction Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
            <div className="relative w-full max-w-2xl my-8">
              {!extractedData ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUploadModal(false)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 z-10 text-sm font-bold bg-slate-100 hover:bg-slate-200 w-8 h-8 rounded-full flex items-center justify-center"
                  >
                    ✕
                  </button>
                  <InvoiceUploadDropzone onExtractionComplete={handleExtractionComplete} />
                </div>
              ) : (
                <ExtractionCard
                  data={extractedData}
                  onSave={handleSaveInvoice}
                  onCancel={() => {
                    setExtractedData(null);
                    setShowUploadModal(false);
                  }}
                />
              )}
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Invoices List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">All Registered Invoices ({invoices.length})</h3>
        </div>
        <InvoiceTable invoices={invoices} />
      </div>
    </div>
  );
};
