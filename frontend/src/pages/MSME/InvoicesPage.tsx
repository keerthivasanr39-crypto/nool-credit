import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDemoData } from '../../context/DemoDataContext';
import { InvoiceUploadCard } from '../../components/invoice/InvoiceUploadCard';
import { InvoiceTable } from '../../components/invoice/InvoiceTable';
import { ExplainableRiskCard } from '../../components/risk/ExplainableRiskCard';
import { Invoice } from '../../types';
import { FileText, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const InvoicesPage: React.FC = () => {
  const { invoices } = useDemoData();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedRiskInvoice, setSelectedRiskInvoice] = useState<Invoice | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-white font-display flex items-center gap-2">
          <FileText className="w-6 h-6 text-blue-400" />
          {t('nav.invoices')} Management
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Upload new invoices, inspect multi-point authenticity verification, and check explainable risk scores.
        </p>
      </div>

      {/* Upload Zone */}
      <InvoiceUploadCard onSuccess={(newInv) => setSelectedRiskInvoice(newInv)} />

      {/* All Invoices Table */}
      <div className="space-y-4 pt-4">
        <h2 className="text-base font-bold text-white font-display">
          All Invoices & Verification Status
        </h2>
        <InvoiceTable
          invoices={invoices}
          selectable={false}
          onViewRisk={(inv) => setSelectedRiskInvoice(inv)}
        />
      </div>

      {/* Explainable Risk Modal */}
      <AnimatePresence>
        {selectedRiskInvoice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-4xl max-h-[90vh] overflow-y-auto relative"
            >
              <button
                onClick={() => setSelectedRiskInvoice(null)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <ExplainableRiskCard
                invoice={selectedRiskInvoice}
                onBundleClick={() => {
                  setSelectedRiskInvoice(null);
                  navigate('/msme/pool');
                }}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
