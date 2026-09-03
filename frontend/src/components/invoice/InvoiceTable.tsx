import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Search, Filter, CheckCircle2, ChevronRight, FileText, ArrowUpDown } from 'lucide-react';
import { Invoice } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { PrivacyMask } from '../common/PrivacyMask';

interface InvoiceTableProps {
  invoices: Invoice[];
  selectable?: boolean;
  selectedIds?: string[];
  onSelectToggle?: (id: string) => void;
  onSelectAll?: (select: boolean) => void;
}

export const InvoiceTable: React.FC<InvoiceTableProps> = ({
  invoices,
  selectable = false,
  selectedIds = [],
  onSelectToggle,
  onSelectAll
}) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRisk, setFilterRisk] = useState<string>('ALL');

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.buyerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = filterRisk === 'ALL' || inv.riskLevel === filterRisk;
    return matchesSearch && matchesRisk;
  });

  const allSelected =
    filteredInvoices.length > 0 &&
    filteredInvoices.every((inv) => selectedIds.includes(inv.id));

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
      {/* Controls Bar */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by invoice number or buyer name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-500/20 text-slate-800"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 flex items-center gap-1 font-medium">
            <Filter className="w-3.5 h-3.5" /> Risk Filter:
          </span>
          <select
            value={filterRisk}
            onChange={(e) => setFilterRisk(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:bg-white"
          >
            <option value="ALL">All Invoices</option>
            <option value="LOW">Low Risk</option>
            <option value="MEDIUM">Medium Risk</option>
            <option value="HIGH">High Risk</option>
          </select>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50/80 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-100">
            <tr>
              {selectable && (
                <th className="py-3.5 px-4 w-10">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={(e) => onSelectAll && onSelectAll(e.target.checked)}
                    className="rounded border-slate-300 text-brand-600 focus:ring-brand-500 w-4 h-4"
                  />
                </th>
              )}
              <th className="py-3.5 px-4">Invoice No</th>
              <th className="py-3.5 px-4">Buyer Entity</th>
              <th className="py-3.5 px-4">Invoice Amount</th>
              <th className="py-3.5 px-4">Due Date</th>
              <th className="py-3.5 px-4">Risk Score</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">Eligible Financing</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredInvoices.length === 0 ? (
              <tr>
                <td colSpan={selectable ? 8 : 7} className="py-8 text-center text-slate-400">
                  {t('invoices.noInvoices')}
                </td>
              </tr>
            ) : (
              filteredInvoices.map((inv) => {
                const isSelected = selectedIds.includes(inv.id);
                return (
                  <motion.tr
                    key={inv.id}
                    whileHover={{ backgroundColor: '#F8FAFC' }}
                    className={`transition-colors cursor-pointer ${
                      isSelected ? 'bg-brand-50/40' : ''
                    }`}
                    onClick={() => selectable && onSelectToggle && onSelectToggle(inv.id)}
                  >
                    {selectable && (
                      <td className="py-3.5 px-4">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => onSelectToggle && onSelectToggle(inv.id)}
                          onClick={(e) => e.stopPropagation()}
                          className="rounded border-slate-300 text-brand-600 focus:ring-brand-500 w-4 h-4"
                        />
                      </td>
                    )}
                    <td className="py-3.5 px-4 font-bold text-slate-800 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-brand-600 shrink-0" />
                      {inv.invoiceNumber}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-700">
                      <div>{inv.buyerName}</div>
                      <div className="text-[10px] text-slate-400">{inv.paymentTerms}</div>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      <PrivacyMask value={inv.invoiceAmount} type="currency" />
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 font-medium">
                      {inv.dueDate}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800">{inv.riskScore}/100</span>
                        <StatusBadge status={inv.riskLevel} />
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={inv.verificationStatus} />
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-emerald-700">
                      <PrivacyMask value={inv.eligibleFinancing} type="currency" />
                    </td>
                  </motion.tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
