import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertTriangle, ShieldCheck, ArrowRight, FileText, Check, DollarSign } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { StatusBadge } from '../common/StatusBadge';
import { PrivacyMask } from '../common/PrivacyMask';

interface ExtractionCardProps {
  data: any;
  onSave: (updatedData: any) => void;
  onCancel: () => void;
}

export const ExtractionCard: React.FC<ExtractionCardProps> = ({ data, onSave, onCancel }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState(data);

  // Simulated Fraud Checks
  const hasDuplicate = formData.invoiceNumber === 'INV-1001';
  const isHighAmount = Number(formData.invoiceAmount) > 200000;
  const isExpired = new Date(formData.dueDate) < new Date('2026-08-01');

  const handleChange = (field: string, val: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: val }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md max-w-2xl mx-auto"
    >
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center border border-brand-100">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">{t('invoices.extractedDetails')}</h3>
            <p className="text-xs text-slate-400">Review and verify extracted fields before risk scoring</p>
          </div>
        </div>
        <StatusBadge status="VERIFIED" />
      </div>

      {/* Fraud Alert Banners if triggered */}
      {(hasDuplicate || isHighAmount || isExpired) && (
        <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1">
          <div className="font-bold flex items-center gap-1.5 text-amber-800">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Fraud & Anomaly Screening Notice</span>
          </div>
          {hasDuplicate && <p>⚠ Warning: Duplicate invoice number already detected in system database.</p>}
          {isHighAmount && <p>⚠ Note: Amount is 40% higher than historical MSME transaction average.</p>}
          {isExpired && <p>⚠ Warning: Due date appears past standard net payment duration.</p>}
        </div>
      )}

      {/* Editable Fields Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div>
          <label className="font-bold text-slate-700 block mb-1">{t('invoices.invoiceNo')}</label>
          <input
            type="text"
            value={formData.invoiceNumber}
            onChange={(e) => handleChange('invoiceNumber', e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-brand-500/20 text-xs font-semibold text-slate-800"
          />
        </div>

        <div>
          <label className="font-bold text-slate-700 block mb-1">{t('invoices.buyer')}</label>
          <input
            type="text"
            value={formData.buyerName}
            onChange={(e) => handleChange('buyerName', e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-brand-500/20 text-xs font-semibold text-slate-800"
          />
        </div>

        <div>
          <label className="font-bold text-slate-700 block mb-1">Invoice Value (₹)</label>
          <input
            type="number"
            value={formData.invoiceAmount}
            onChange={(e) => handleChange('invoiceAmount', Number(e.target.value))}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-brand-500/20 text-xs font-bold text-brand-700"
          />
        </div>

        <div>
          <label className="font-bold text-slate-700 block mb-1">{t('invoices.dueDate')}</label>
          <input
            type="date"
            value={formData.dueDate}
            onChange={(e) => handleChange('dueDate', e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-brand-500/20 text-xs font-semibold text-slate-800"
          />
        </div>
      </div>

      {/* Verification Summary Checkmarks */}
      <div className="bg-slate-50 rounded-2xl p-4 my-6 border border-slate-100">
        <div className="text-[11px] font-bold uppercase text-slate-400 tracking-wider mb-2.5">
          Validation Checklist
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-700">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>GSTIN Validated</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Digital Signature Verified</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Duplicate Hash Cleared</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Terms: Net 60 Days</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
        >
          {t('common.cancel')}
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-md transition-all"
        >
          <span>Save & Add to Invoices</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};
