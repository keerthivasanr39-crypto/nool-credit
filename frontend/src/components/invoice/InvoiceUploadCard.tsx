import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  AlertOctagon, 
  Cpu, 
  ArrowRight,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Invoice } from '../../types';
import { useDemoData } from '../../context/DemoDataContext';

interface InvoiceUploadCardProps {
  onSuccess?: (invoice: Invoice) => void;
}

export const InvoiceUploadCard: React.FC<InvoiceUploadCardProps> = ({ onSuccess }) => {
  const { t } = useTranslation();
  const { addInvoice } = useDemoData();

  const [dragActive, setDragActive] = useState(false);
  const [processingStep, setProcessingStep] = useState<number>(0); 
  // 0: idle, 1: uploading, 2: extracting, 3: verifying, 4: risk analysis, 5: completed
  const [extractedData, setExtractedData] = useState<Partial<Invoice>>({
    invoiceNumber: 'INV-1004',
    buyerName: 'ABC Garments Ltd.',
    buyerBusinessId: 'BUY-ABC-9842',
    invoiceAmount: 95000,
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 60 * 86400000).toISOString().split('T')[0],
    paymentTerms: 'Net 60 Days',
    notes: 'Textile yarn spinning & carding batch #510',
  });
  const [createdInvoice, setCreatedInvoice] = useState<Invoice | null>(null);

  const startExtractionProcess = async (sampleData?: Partial<Invoice>) => {
    const dataToUse = sampleData || extractedData;
    setProcessingStep(1); // Uploading

    setTimeout(() => {
      setProcessingStep(2); // Extracting OCR
    }, 700);

    setTimeout(() => {
      setProcessingStep(3); // Verifying
    }, 1500);

    setTimeout(() => {
      setProcessingStep(4); // Risk analysis
    }, 2300);

    setTimeout(async () => {
      const inv = await addInvoice(dataToUse);
      setCreatedInvoice(inv);
      setProcessingStep(5); // Completed
      if (onSuccess) onSuccess(inv);
    }, 3100);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    startExtractionProcess();
  };

  const loadSample = (type: 'normal' | 'duplicate' | 'anomaly') => {
    if (type === 'normal') {
      const data = {
        invoiceNumber: `INV-${Math.floor(1004 + Math.random() * 8000)}`,
        buyerName: 'ABC Garments Ltd.',
        buyerBusinessId: 'BUY-ABC-9842',
        invoiceAmount: 95000,
        invoiceDate: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 60 * 86400000).toISOString().split('T')[0],
        paymentTerms: 'Net 60 Days',
        notes: 'Combed cotton yarn warp & weft production',
      };
      setExtractedData(data);
      startExtractionProcess(data);
    } else if (type === 'duplicate') {
      const data = {
        invoiceNumber: 'INV-1001', // existing duplicate
        buyerName: 'ABC Garments Ltd.',
        buyerBusinessId: 'BUY-ABC-9842',
        invoiceAmount: 60000,
        invoiceDate: '2026-08-10',
        dueDate: '2026-10-10',
        paymentTerms: 'Net 60 Days',
        notes: 'Duplicate submission test',
      };
      setExtractedData(data);
      startExtractionProcess(data);
    } else if (type === 'anomaly') {
      const data = {
        invoiceNumber: `INV-${Math.floor(1005 + Math.random() * 8000)}`,
        buyerName: 'ABC Garments Ltd.',
        buyerBusinessId: 'BUY-ABC-9842',
        invoiceAmount: 480000, // unusual large amount > 3x average
        invoiceDate: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 60 * 86400000).toISOString().split('T')[0],
        paymentTerms: 'Net 60 Days',
        notes: 'Large anomaly batch without prior purchase order',
      };
      setExtractedData(data);
      startExtractionProcess(data);
    }
  };

  return (
    <div className="glass-card p-6 rounded-2xl border border-slate-800">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-bold text-white font-display flex items-center gap-2">
            <UploadCloud className="w-5 h-5 text-blue-400" />
            {t('invoice.uploadTitle')}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {t('invoice.uploadSubtitle')}
          </p>
        </div>

        {/* Quick Demo Pre-loaders */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800 text-xs">
          <span className="text-[10px] text-slate-400 font-semibold uppercase px-1">
            <Sparkles className="w-3 h-3 text-amber-400 inline mr-1" />
            Auto-Test:
          </span>
          <button
            onClick={() => loadSample('normal')}
            className="px-2.5 py-1 rounded-lg bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 font-medium text-xs border border-blue-500/30 transition-all"
          >
            ✓ Normal (₹95,000)
          </button>
          <button
            onClick={() => loadSample('duplicate')}
            className="px-2.5 py-1 rounded-lg bg-rose-600/20 hover:bg-rose-600/40 text-rose-400 font-medium text-xs border border-rose-500/30 transition-all"
          >
            ⚠ Duplicate (INV-1001)
          </button>
          <button
            onClick={() => loadSample('anomaly')}
            className="px-2.5 py-1 rounded-lg bg-amber-600/20 hover:bg-amber-600/40 text-amber-400 font-medium text-xs border border-amber-500/30 transition-all"
          >
            ⚠ Anomaly (₹4.8L)
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {processingStep === 0 && (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${
              dragActive
                ? 'border-blue-400 bg-blue-500/10 scale-[1.01]'
                : 'border-slate-700/80 hover:border-blue-500/50 hover:bg-slate-900/40'
            }`}
            onClick={() => startExtractionProcess()}
          >
            <div className="w-16 h-16 rounded-2xl bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <UploadCloud className="w-8 h-8 animate-pulse-slow" />
            </div>
            <h3 className="text-sm font-semibold text-white mb-1">
              {t('invoice.dragDropText')} <span className="text-blue-400 underline">{t('invoice.browseFiles')}</span>
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              {t('invoice.supportedFormats')}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700">
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>Simulate instant AI OCR parse</span>
            </div>
          </motion.div>
        )}

        {processingStep > 0 && processingStep < 5 && (
          <motion.div
            key="processing"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-6"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-0.5 mx-auto animate-spin">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Cpu className="w-6 h-6 text-cyan-400 animate-pulse" />
              </div>
            </div>

            <div className="space-y-3 max-w-md mx-auto">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-300">
                  {processingStep === 1 && t('invoice.extractingData')}
                  {processingStep === 2 && 'AI Optical Character Recognition (OCR)...'}
                  {processingStep === 3 && t('invoice.verifyingInvoice')}
                  {processingStep === 4 && t('invoice.analysingRisk')}
                </span>
                <span className="text-cyan-400 font-mono">
                  {processingStep === 1 && '25%'}
                  {processingStep === 2 && '50%'}
                  {processingStep === 3 && '75%'}
                  {processingStep === 4 && '90%'}
                </span>
              </div>

              {/* Multi-step progress bar */}
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-700">
                <div
                  className="bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 h-full rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${processingStep * 25}%`,
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] max-w-lg mx-auto text-left">
              <div className={`p-2.5 rounded-xl border ${processingStep >= 1 ? 'bg-blue-500/10 border-blue-500/30 text-blue-300' : 'bg-slate-800/40 border-slate-800 text-slate-500'}`}>
                1. Uploading
              </div>
              <div className={`p-2.5 rounded-xl border ${processingStep >= 2 ? 'bg-blue-500/10 border-blue-500/30 text-blue-300' : 'bg-slate-800/40 border-slate-800 text-slate-500'}`}>
                2. Extracting Data
              </div>
              <div className={`p-2.5 rounded-xl border ${processingStep >= 3 ? 'bg-blue-500/10 border-blue-500/30 text-blue-300' : 'bg-slate-800/40 border-slate-800 text-slate-500'}`}>
                3. Verification Checks
              </div>
              <div className={`p-2.5 rounded-xl border ${processingStep >= 4 ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-slate-800/40 border-slate-800 text-slate-500'}`}>
                4. Risk Scoring
              </div>
            </div>
          </motion.div>
        )}

        {processingStep === 5 && createdInvoice && (
          <motion.div
            key="completed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6"
          >
            {/* Header Result */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  createdInvoice.status === 'FLAGGED'
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                }`}>
                  {createdInvoice.status === 'FLAGGED' ? (
                    <AlertOctagon className="w-5 h-5" />
                  ) : (
                    <CheckCircle2 className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white font-display">
                      {createdInvoice.invoiceNumber}
                    </h3>
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                      createdInvoice.status === 'FLAGGED'
                        ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                        : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {createdInvoice.status === 'FLAGGED' ? 'FLAGGED' : t('invoice.statusVerified')}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Buyer: <span className="text-slate-200 font-medium">{createdInvoice.buyerName}</span> ({createdInvoice.buyerBusinessId})
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Verification Score</span>
                  <div className="text-lg font-bold text-cyan-400 font-display">
                    {createdInvoice.verificationScore}%
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Risk Score</span>
                  <div className="text-lg font-bold text-emerald-400 font-display">
                    {createdInvoice.riskScore}/100 ({createdInvoice.riskLevel})
                  </div>
                </div>
              </div>
            </div>

            {/* Warnings if any */}
            {createdInvoice.warnings && createdInvoice.warnings.length > 0 && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-400">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Fraud & Anomaly Warnings Detected:</span>
                </div>
                <ul className="text-xs text-rose-300 list-disc list-inside space-y-0.5">
                  {createdInvoice.warnings.map((w, i) => (
                    <li key={i}>{w}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Extracted Details Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Amount</span>
                <span className="text-base font-bold text-white">₹{createdInvoice.invoiceAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Invoice Date</span>
                <span className="text-xs font-medium text-slate-200">{createdInvoice.invoiceDate}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Due Date</span>
                <span className="text-xs font-medium text-slate-200">{createdInvoice.dueDate}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Eligible Financing (85%)</span>
                <span className="text-base font-bold text-emerald-400">₹{createdInvoice.eligibleFinancing.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  setProcessingStep(0);
                  setCreatedInvoice(null);
                }}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 flex items-center gap-1.5 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Upload Another Invoice
              </button>

              <button
                onClick={() => {
                  window.location.href = '/msme/pool';
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-xs font-bold text-white shadow-lg shadow-blue-500/20 flex items-center gap-1.5 transition-all"
              >
                <span>Proceed to Invoice Bundling</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
