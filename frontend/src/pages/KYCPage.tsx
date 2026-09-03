import React from 'react';
import { useTranslation } from 'react-i18next';
import { KYCJourneyTracker } from '../components/kyc/KYCJourneyTracker';

export const KYCPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">{t('kyc.title')}</h1>
        <p className="text-xs text-slate-500 mt-1">{t('kyc.subtitle')}</p>
      </div>

      <KYCJourneyTracker />
    </div>
  );
};
