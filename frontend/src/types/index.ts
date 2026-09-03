export type UserRole = 'MSME' | 'LENDER';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  token?: string;
  businessName?: string;
  industry?: string;
  location?: string;
}

export type VerificationStatus = 'PENDING' | 'EXTRACTING' | 'VERIFYING' | 'VERIFIED' | 'FAILED' | 'REQUIRES_REVIEW';
export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';
export type InvoiceStatus = 'AVAILABLE' | 'POOLED' | 'FINANCED' | 'REJECTED';
export type FinancingStatus = 'PENDING' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED' | 'DISBURSEMENT_INITIATED';

export interface Invoice {
  id: string;
  invoiceNumber: string;
  msmeId: string;
  msmeName?: string;
  buyerId: string;
  buyerName: string;
  buyerGst?: string;
  invoiceAmount: number;
  invoiceDate: string;
  dueDate: string;
  paymentTerms: string;
  verificationStatus: VerificationStatus;
  verificationScore: number;
  riskScore: number;
  riskLevel: RiskLevel;
  eligibleFinancing: number;
  status: InvoiceStatus;
  fraudAlerts?: string[];
  poolId?: string;
  createdAt: string;
}

export interface InvoicePool {
  id: string;
  poolNumber: string;
  msmeId: string;
  msmeName: string;
  invoiceIds: string[];
  invoiceCount: number;
  totalInvoiceValue: number;
  weightedRiskScore: number;
  riskLevel: RiskLevel;
  eligibleFinancing: number;
  status: 'CREATED' | 'REQUESTED' | 'APPROVED' | 'REJECTED';
  createdAt: string;
}

export interface FinancingRequest {
  id: string;
  requestNumber: string;
  msmeId: string;
  msmeName: string;
  industry: string;
  poolId: string;
  poolNumber: string;
  invoiceValue: number;
  riskScore: number;
  riskLevel: RiskLevel;
  recommendedAmount: number;
  requestedAmount: number;
  status: FinancingStatus;
  lenderDecision?: string;
  rejectionReason?: string;
  lenderName?: string;
  decisionDate?: string;
  createdAt: string;
  invoices?: Invoice[];
  positiveFactors?: string[];
  riskFactors?: string[];
}

export interface RiskAssessment {
  id: string;
  invoiceId: string;
  buyerReliability: number; // e.g. 25/25
  paymentHistory: number; // e.g. 20/20
  transactionConsistency: number; // e.g. 15/15
  paymentDelay: number; // e.g. 15/15
  invoiceConsistency: number; // e.g. 10/10
  previousSuccessfulInvoices: number; // e.g. 15/15
  fraudRiskDeduction: number; // e.g. 0
  finalScore: number; // 0-100
  riskLevel: RiskLevel;
  eligibleFinancingRate: number; // 0.85, 0.70, 0
  positiveFactors: string[];
  riskFactors: string[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'SUCCESS' | 'WARNING' | 'ERROR' | 'INFO';
  timestamp: string;
  read: boolean;
  link?: string;
}

export type KYCStepStatus = 'NOT_STARTED' | 'VERIFYING' | 'VERIFIED' | 'REQUIRES_REVIEW' | 'FAILED';

export interface KYCState {
  aadhaar: { status: KYCStepStatus; number: string; verifiedAt?: string };
  pan: { status: KYCStepStatus; number: string; verifiedAt?: string };
  bank: { status: KYCStepStatus; accountNumber: string; ifsc: string; verifiedAt?: string };
  business: { status: KYCStepStatus; gstNumber: string; udyamNumber: string; verifiedAt?: string };
  documents: { status: KYCStepStatus; count: number; verifiedAt?: string };
}

export interface GovernmentScheme {
  id: string;
  name: string;
  category: string;
  description: string;
  eligibility: string;
  potentialBenefit: string;
  requiredDocuments: string[];
  url: string;
}

export interface AuditLog {
  id: string;
  action: string;
  userId: string;
  details: string;
  timestamp: string;
}
