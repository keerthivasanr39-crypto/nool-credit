import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { 
  Building2, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  CreditCard, 
  MapPin, 
  Phone, 
  Mail, 
  FileText,
  Save
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { MSMEProfile } from '../../types';

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { t } = useTranslation();

  const [profile, setProfile] = useState<MSMEProfile>({
    userId: user?.id || 'usr-msme-01',
    businessName: user?.businessName || 'Sri Lakshmi Knits',
    businessType: 'Private Limited',
    industry: 'Textile Job Work & Knitting',
    location: 'Tirupur, Tamil Nadu',
    udyamNumber: 'UDYAM-TN-30-0098234',
    gstin: '33AABCS1234F1Z5',
    panNumber: 'AABCS1234F',
    contactNumber: '+91 98420 11982',
    bankDetails: {
      accountName: 'Sri Lakshmi Knits Pvt Ltd',
      accountNumber: '50200049281920',
      ifscCode: 'HDFC0001824',
      bankName: 'HDFC Bank - Tirupur Main Branch',
      upiId: 'srilakshmiknits@okhdfcbank',
      isVerified: true,
    },
    readinessScore: 82,
    verificationStatus: 'VERIFIED',
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  React.useEffect(() => {
    if (user) {
      setProfile((prev) => ({
        ...prev,
        userId: user.id || prev.userId,
        businessName: user.businessName || prev.businessName,
        bankDetails: {
          ...prev.bankDetails,
          accountName: `${user.businessName || 'Sri Lakshmi Knits'} Pvt Ltd`,
        },
      }));
    }
  }, [user]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold uppercase">
              One MSME Profile
            </span>
            <span className="text-xs text-slate-400">Reusable across all financing requests</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-1 flex items-center gap-2.5">
            <Building2 className="w-7 h-7 text-blue-400" />
            {t('nav.profile')}
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage your single verified MSME profile, linked bank details, and compliance registration.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-2 rounded-xl text-xs text-emerald-400 font-semibold">
          <ShieldCheck className="w-4 h-4" />
          <span>Status: Verified Enterprise</span>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Basic Business Details */}
        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white font-display uppercase tracking-wider text-slate-300">
            Enterprise Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="text-slate-300 font-medium">Account Owner / Full Name</label>
              <input
                type="text"
                disabled
                value={user?.name || 'Karthik Subramanian'}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 cursor-not-allowed"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-medium">Registered Email</label>
              <input
                type="text"
                disabled
                value={user?.email || 'msme@noolcredit.com'}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 cursor-not-allowed"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-medium">Business / Mill Name</label>
              <input
                type="text"
                value={profile.businessName}
                onChange={(e) => setProfile({ ...profile, businessName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-medium">Constitution Type</label>
              <select
                value={profile.businessType}
                onChange={(e: any) => setProfile({ ...profile, businessType: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
              >
                <option value="Proprietorship">Proprietorship</option>
                <option value="Partnership">Partnership</option>
                <option value="Private Limited">Private Limited</option>
                <option value="LLP">LLP</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-medium">Industry Sector</label>
              <input
                type="text"
                value={profile.industry}
                onChange={(e) => setProfile({ ...profile, industry: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-medium">Manufacturing Hub / Location</label>
              <input
                type="text"
                value={profile.location}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Regulatory & Tax Identifiers */}
        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white font-display uppercase tracking-wider text-slate-300">
            Compliance & Registrations
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1">
              <label className="text-slate-300 font-medium">Udyam Registration No.</label>
              <input
                type="text"
                value={profile.udyamNumber}
                onChange={(e) => setProfile({ ...profile, udyamNumber: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-medium">GSTIN</label>
              <input
                type="text"
                value={profile.gstin}
                onChange={(e) => setProfile({ ...profile, gstin: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-medium">Business PAN</label>
              <input
                type="text"
                value={profile.panNumber}
                onChange={(e) => setProfile({ ...profile, panNumber: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono"
              />
            </div>
          </div>
        </div>

        {/* Linked Settlement Bank & UPI Account (Google Pay style clean UI) */}
        <div className="glass-card p-6 rounded-3xl border border-cyan-500/30 space-y-4 relative overflow-hidden">
          <div className="flex items-center justify-between pb-2">
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-cyan-400" />
              <h3 className="text-sm font-bold text-white font-display">
                Linked Working Capital Bank Account
              </h3>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
              ✓ Automated IMPS/RTGS Enabled
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="text-slate-300 font-medium">Account Beneficiary Name</label>
              <input
                type="text"
                value={profile.bankDetails.accountName}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    bankDetails: { ...profile.bankDetails, accountName: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-medium">Current Account Number</label>
              <input
                type="text"
                value={profile.bankDetails.accountNumber}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    bankDetails: { ...profile.bankDetails, accountNumber: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-medium">IFSC Code</label>
              <input
                type="text"
                value={profile.bankDetails.ifscCode}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    bankDetails: { ...profile.bankDetails, ifscCode: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-medium">Bank Name & Branch</label>
              <input
                type="text"
                value={profile.bankDetails.bankName}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    bankDetails: { ...profile.bankDetails, bankName: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="text-slate-300 font-medium">Business UPI ID (Instant Mandate)</label>
              <input
                type="text"
                value={profile.bankDetails.upiId}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    bankDetails: { ...profile.bankDetails, upiId: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-300 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Save CTA */}
        <div className="flex items-center justify-between pt-2">
          {savedSuccess && (
            <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              Profile changes saved successfully!
            </span>
          )}

          <button
            type="submit"
            className="ml-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-bold shadow-lg shadow-blue-500/25 flex items-center gap-2 transition-all hover:scale-105"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile</span>
          </button>
        </div>
      </form>
    </div>
  );
};
