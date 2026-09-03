import React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface PrivacyMaskProps {
  value: string | number;
  type?: 'currency' | 'aadhaar' | 'pan' | 'bank' | 'text';
  allowToggleLocal?: boolean;
  className?: string;
}

export const PrivacyMask: React.FC<PrivacyMaskProps> = ({
  value,
  type = 'text',
  className = ''
}) => {
  const { hideFinancials } = useApp();

  const formatDisplay = () => {
    if (type === 'currency') {
      const num = typeof value === 'number' ? value : parseFloat(value) || 0;
      if (hideFinancials) {
        return '₹ ••••••••';
      }
      return `₹${num.toLocaleString('en-IN')}`;
    }

    if (type === 'aadhaar') {
      // Aadhaar format: XXXX XXXX 4521
      const str = String(value).replace(/\s+/g, '');
      const last4 = str.slice(-4) || '4521';
      return `XXXX XXXX ${last4}`;
    }

    if (type === 'pan') {
      // PAN format: XXXXX1234X
      const str = String(value);
      if (str.length >= 10) {
        return `XXXXX${str.slice(5, 9)}${str.slice(-1)}`;
      }
      return 'XXXXX1234X';
    }

    if (type === 'bank') {
      const str = String(value);
      const last4 = str.slice(-4) || '8892';
      return `XXXX XXXX ${last4}`;
    }

    if (hideFinancials) {
      return '••••••••';
    }

    return String(value);
  };

  return <span className={`inline-block transition-all font-medium ${className}`}>{formatDisplay()}</span>;
};

export const PrivacyToggleBtn: React.FC = () => {
  const { hideFinancials, toggleHideFinancials } = useApp();

  return (
    <button
      onClick={toggleHideFinancials}
      className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg shadow-sm transition-colors"
      title={hideFinancials ? 'Show Sensitive Financials' : 'Hide Sensitive Financials'}
    >
      {hideFinancials ? (
        <>
          <EyeOff className="w-3.5 h-3.5 text-amber-600" />
          <span className="font-medium">Hidden</span>
        </>
      ) : (
        <>
          <Eye className="w-3.5 h-3.5 text-emerald-600" />
          <span className="font-medium">Visible</span>
        </>
      )}
    </button>
  );
};
