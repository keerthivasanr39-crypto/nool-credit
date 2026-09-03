import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, FileText, CheckCircle2, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { BrandedLoader } from '../common/BrandedLoader';

interface InvoiceUploadDropzoneProps {
  onExtractionComplete: (data: any) => void;
}

export const InvoiceUploadDropzone: React.FC<InvoiceUploadDropzoneProps> = ({
  onExtractionComplete
}) => {
  const { t } = useTranslation();
  const [isDragging, setIsDragging] = useState(false);
  const [processingStage, setProcessingStage] = useState<
    'IDLE' | 'UPLOADING' | 'EXTRACTING' | 'VERIFYING' | 'ANALYSING' | 'DONE'
  >('IDLE');
  const [fileName, setFileName] = useState<string>('');

  const simulateInvoiceProcessing = (name: string) => {
    setFileName(name);
    setProcessingStage('UPLOADING');

    setTimeout(() => {
      setProcessingStage('EXTRACTING');
      setTimeout(() => {
        setProcessingStage('VERIFYING');
        setTimeout(() => {
          setProcessingStage('ANALYSING');
          setTimeout(() => {
            setProcessingStage('DONE');
            // Generated Extracted Data
            const extractedMock = {
              invoiceNumber: `INV-${Math.floor(1006 + Math.random() * 90)}`,
              buyerName: 'ABC Garments Ltd',
              buyerGst: '33AABCA1234F1Z8',
              invoiceAmount: 115000,
              invoiceDate: '2026-08-28',
              dueDate: '2026-10-28',
              paymentTerms: 'Net 60 Days',
              verificationScore: 96,
              riskScore: 86,
              riskLevel: 'LOW',
              eligibleFinancing: 97750,
              fraudAlerts: []
            };
            onExtractionComplete(extractedMock);
          }, 800);
        }, 900);
      }, 1000);
    }, 700);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      simulateInvoiceProcessing(e.dataTransfer.files[0].name);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      simulateInvoiceProcessing(e.target.files[0].name);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
      <div className="text-center max-w-md mx-auto mb-6">
        <h3 className="text-lg font-bold text-slate-900">{t('invoices.uploadTitle')}</h3>
        <p className="text-xs text-slate-500 mt-1">{t('invoices.uploadSubtitle')}</p>
      </div>

      <AnimatePresence mode="wait">
        {processingStage === 'IDLE' ? (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center transition-all cursor-pointer ${
              isDragging
                ? 'border-brand-500 bg-brand-50/50 scale-[1.01]'
                : 'border-slate-300 hover:border-brand-400 bg-slate-50/50 hover:bg-slate-50'
            }`}
            onClick={() => document.getElementById('invoice-file-input')?.click()}
          >
            <input
              type="file"
              id="invoice-file-input"
              className="hidden"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={handleFileSelect}
            />

            <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-110 transition-transform">
              <UploadCloud className="w-8 h-8" />
            </div>

            <h4 className="text-sm font-bold text-slate-800 mb-1">{t('invoices.dragDrop')}</h4>
            <p className="text-xs text-slate-400 mb-4">Supported: GST Tax Invoices (PDF, PNG, JPG up to 10MB)</p>

            <button
              type="button"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white shadow-sm transition-all"
            >
              {t('invoices.browseFiles')}
            </button>
          </motion.div>
        ) : processingStage !== 'DONE' ? (
          <motion.div
            key="processing"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="border border-slate-100 bg-slate-50/60 rounded-3xl p-8 text-center"
          >
            <BrandedLoader
              stage={
                processingStage === 'UPLOADING'
                  ? 'PAGE'
                  : processingStage === 'EXTRACTING'
                  ? 'INVOICE_UPLOAD'
                  : processingStage === 'VERIFYING'
                  ? 'KYC'
                  : 'RISK_ANALYSIS'
              }
            />

            <div className="mt-4 max-w-xs mx-auto space-y-2 text-left">
              {[
                { stage: 'UPLOADING', label: '1. Uploading invoice document' },
                { stage: 'EXTRACTING', label: '2. OCR Extracting invoice fields' },
                { stage: 'VERIFYING', label: '3. Verifying GSTIN & duplicate hash' },
                { stage: 'ANALYSING', label: '4. Computing explainable risk rating' }
              ].map((step, idx) => {
                const isCurrent = processingStage === step.stage;
                const isPassed =
                  (step.stage === 'UPLOADING' && processingStage !== 'UPLOADING') ||
                  (step.stage === 'EXTRACTING' && ['VERIFYING', 'ANALYSING'].includes(processingStage)) ||
                  (step.stage === 'VERIFYING' && processingStage === 'ANALYSING');

                return (
                  <div key={idx} className="flex items-center gap-2 text-xs">
                    {isPassed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : isCurrent ? (
                      <div className="w-4 h-4 rounded-full border-2 border-brand-600 border-t-transparent animate-spin" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-300" />
                    )}
                    <span className={isCurrent ? 'font-bold text-brand-800' : isPassed ? 'text-slate-700' : 'text-slate-400'}>
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 text-center bg-emerald-50/60 rounded-3xl border border-emerald-200"
          >
            <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto mb-3 shadow-md">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-emerald-800">Invoice Extracted & Verified!</h4>
            <p className="text-xs text-emerald-700 mt-0.5">Ready for review and pool bundling.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
