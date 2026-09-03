import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FolderLock, 
  UploadCloud, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  FileText, 
  ShieldCheck, 
  ArrowRight,
  Plus,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { BusinessDocument } from '../../types';

export const DocumentsPage: React.FC = () => {
  const { t } = useTranslation();

  const [documents, setDocuments] = useState<BusinessDocument[]>([
    {
      id: 'doc-01',
      userId: 'usr-msme-01',
      documentType: 'BUSINESS_PAN',
      title: t('documents.panCard'),
      fileName: 'SriLakshmi_PAN_AABCS1234F.pdf',
      fileSize: '1.2 MB',
      uploadDate: '2026-07-15',
      status: 'VERIFIED',
      verificationNotes: 'Automated NSDL PAN verification passed',
      reusableForPools: true,
    },
    {
      id: 'doc-02',
      userId: 'usr-msme-01',
      documentType: 'GST_CERTIFICATE',
      title: t('documents.gstCert'),
      fileName: 'GSTIN_33AABCS1234F1Z5.pdf',
      fileSize: '2.4 MB',
      uploadDate: '2026-07-15',
      status: 'VERIFIED',
      verificationNotes: 'Active manufacturing GSTIN in Tirupur cluster',
      reusableForPools: true,
    },
    {
      id: 'doc-03',
      userId: 'usr-msme-01',
      documentType: 'UDYAM_REGISTRATION',
      title: t('documents.udyamCert'),
      fileName: 'UDYAM_TN_30_0098234.pdf',
      fileSize: '850 KB',
      uploadDate: '2026-07-20',
      status: 'VERIFIED',
      verificationNotes: 'Small Enterprise Textile Job Work classification',
      reusableForPools: true,
    },
    {
      id: 'doc-04',
      userId: 'usr-msme-01',
      documentType: 'BANK_STATEMENT',
      title: t('documents.bankStatement'),
      fileName: 'HDFC_Current_Account_6M.pdf',
      fileSize: '4.8 MB',
      uploadDate: '2026-08-01',
      status: 'VERIFIED',
      verificationNotes: 'Healthy average monthly turnover ₹12.5 Lakhs',
      reusableForPools: true,
    },
    {
      id: 'doc-05',
      userId: 'usr-msme-01',
      documentType: 'ADDRESS_PROOF',
      title: t('documents.addressProof'),
      fileName: 'TNEB_Electricity_Mill_Bill.pdf',
      fileSize: '1.1 MB',
      uploadDate: '2026-08-05',
      status: 'VERIFIED',
      verificationNotes: 'Factory physical location verified',
      reusableForPools: true,
    },
    {
      id: 'doc-06',
      userId: 'usr-msme-01',
      documentType: 'FINANCIAL_STATEMENT',
      title: t('documents.financialDoc'),
      fileName: 'Pending Upload',
      status: 'PENDING',
      verificationNotes: 'Upload to boost Readiness Score by +5 pts',
      reusableForPools: true,
    },
  ]);

  const [uploadingDocId, setUploadingDocId] = useState<string | null>(null);

  const simulateDocUpload = (id: string) => {
    setUploadingDocId(id);
    setTimeout(() => {
      setDocuments((prev) =>
        prev.map((d) =>
          d.id === id
            ? {
                ...d,
                fileName: 'Audited_P_and_L_FY25-26.pdf',
                fileSize: '3.1 MB',
                uploadDate: new Date().toISOString().split('T')[0],
                status: 'VERIFIED',
                verificationNotes: 'Cryptographic hash verified by institutional engine',
              }
            : d
        )
      );
      setUploadingDocId(null);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-semibold uppercase">
              One-Time Vault
            </span>
            <span className="text-xs text-slate-400">Zero Repeated Form Filling</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-1 flex items-center gap-2.5">
            <FolderLock className="w-7 h-7 text-blue-400" />
            {t('documents.title')}
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            {t('documents.subtitle')}
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-800 text-xs text-slate-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Vault Security: <strong className="text-white">256-Bit Encrypted</strong></span>
        </div>
      </div>

      {/* Document Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map((doc, idx) => {
          const isVerified = doc.status === 'VERIFIED';
          const isPending = doc.status === 'PENDING';

          return (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className={`p-5 rounded-2xl glass-card border transition-all flex flex-col justify-between space-y-4 ${
                isVerified
                  ? 'border-emerald-500/30 hover:border-emerald-500/50 shadow-sm shadow-emerald-500/5'
                  : 'border-amber-500/30 hover:border-amber-500/50 shadow-sm shadow-amber-500/5'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-xl border ${
                    isVerified
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                  }`}>
                    <FileText className="w-5 h-5" />
                  </div>

                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                    isVerified
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  }`}>
                    {isVerified ? t('documents.statusVerified') : t('documents.statusPending')}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white font-display">
                    {doc.title}
                  </h3>
                  <span className="text-[11px] text-slate-400 font-mono block mt-0.5">
                    {doc.fileName} {doc.fileSize && `• ${doc.fileSize}`}
                  </span>
                </div>

                <p className="text-[11px] text-slate-400 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80">
                  {doc.verificationNotes}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[10px] text-cyan-400 flex items-center gap-1 font-semibold">
                  <Sparkles className="w-3 h-3" />
                  {t('documents.reusableBadge')}
                </span>

                {isPending ? (
                  <button
                    onClick={() => simulateDocUpload(doc.id)}
                    disabled={uploadingDocId === doc.id}
                    className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-500/20 flex items-center gap-1.5 transition-all"
                  >
                    {uploadingDocId === doc.id ? (
                      <span>Verifying...</span>
                    ) : (
                      <>
                        <UploadCloud className="w-3.5 h-3.5" />
                        <span>Upload & Verify</span>
                      </>
                    )}
                  </button>
                ) : (
                  <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Passed
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
