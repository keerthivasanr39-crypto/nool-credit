import React from 'react';
import { InvoicePoolBuilder } from '../../components/financing/InvoicePoolBuilder';

export const InvoicePoolPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
      <InvoicePoolBuilder />
    </div>
  );
};
