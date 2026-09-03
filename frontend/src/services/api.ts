import { Invoice, InvoicePool, FinancingRequest, RiskAssessment, User, KYCState, NotificationItem } from '../types';

const API_BASE = '/api';

// Initial Mock Seed Data
const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'inv-1',
    invoiceNumber: 'INV-1001',
    msmeId: 'msme-1',
    msmeName: 'Sri Lakshmi Knits',
    buyerId: 'buyer-1',
    buyerName: 'ABC Garments Ltd',
    buyerGst: '33AABCA1234F1Z8',
    invoiceAmount: 60000,
    invoiceDate: '2026-08-10',
    dueDate: '2026-10-10',
    paymentTerms: 'Net 60 Days',
    verificationStatus: 'VERIFIED',
    verificationScore: 98,
    riskScore: 88,
    riskLevel: 'LOW',
    eligibleFinancing: 51000,
    status: 'POOLED',
    poolId: 'pool-1',
    createdAt: '2026-08-11T10:00:00Z',
    fraudAlerts: []
  },
  {
    id: 'inv-2',
    invoiceNumber: 'INV-1002',
    msmeId: 'msme-1',
    msmeName: 'Sri Lakshmi Knits',
    buyerId: 'buyer-2',
    buyerName: 'Royal Exports India',
    buyerGst: '33AABCR5678F1Z2',
    invoiceAmount: 80000,
    invoiceDate: '2026-08-15',
    dueDate: '2026-10-15',
    paymentTerms: 'Net 60 Days',
    verificationStatus: 'VERIFIED',
    verificationScore: 94,
    riskScore: 82,
    riskLevel: 'LOW',
    eligibleFinancing: 68000,
    status: 'POOLED',
    poolId: 'pool-1',
    createdAt: '2026-08-16T11:30:00Z',
    fraudAlerts: []
  },
  {
    id: 'inv-3',
    invoiceNumber: 'INV-1003',
    msmeId: 'msme-1',
    msmeName: 'Sri Lakshmi Knits',
    buyerId: 'buyer-3',
    buyerName: 'Chennai Weaving Mills',
    buyerGst: '33AABCC9999F1Z1',
    invoiceAmount: 120000,
    invoiceDate: '2026-08-20',
    dueDate: '2026-10-20',
    paymentTerms: 'Net 60 Days',
    verificationStatus: 'VERIFIED',
    verificationScore: 92,
    riskScore: 79,
    riskLevel: 'MEDIUM',
    eligibleFinancing: 96000,
    status: 'POOLED',
    poolId: 'pool-1',
    createdAt: '2026-08-21T09:15:00Z',
    fraudAlerts: []
  },
  {
    id: 'inv-4',
    invoiceNumber: 'INV-1004',
    msmeId: 'msme-1',
    msmeName: 'Sri Lakshmi Knits',
    buyerId: 'buyer-1',
    buyerName: 'ABC Garments Ltd',
    buyerGst: '33AABCA1234F1Z8',
    invoiceAmount: 95000,
    invoiceDate: '2026-08-28',
    dueDate: '2026-10-28',
    paymentTerms: 'Net 60 Days',
    verificationStatus: 'VERIFIED',
    verificationScore: 96,
    riskScore: 86,
    riskLevel: 'LOW',
    eligibleFinancing: 80750,
    status: 'AVAILABLE',
    createdAt: '2026-08-29T14:20:00Z',
    fraudAlerts: []
  },
  {
    id: 'inv-5',
    invoiceNumber: 'INV-1005',
    msmeId: 'msme-1',
    msmeName: 'Sri Lakshmi Knits',
    buyerId: 'buyer-4',
    buyerName: 'FastTex Retailers',
    buyerGst: '33AABCF4444F1Z5',
    invoiceAmount: 125000,
    invoiceDate: '2026-08-29',
    dueDate: '2026-10-29',
    paymentTerms: 'Net 60 Days',
    verificationStatus: 'REQUIRES_REVIEW',
    verificationScore: 78,
    riskScore: 64,
    riskLevel: 'MEDIUM',
    eligibleFinancing: 87500,
    status: 'AVAILABLE',
    createdAt: '2026-08-30T08:45:00Z',
    fraudAlerts: ['Slight mismatch in buyer billing address', 'Average payment delay higher by 8 days']
  }
];

const INITIAL_POOLS: InvoicePool[] = [
  {
    id: 'pool-1',
    poolNumber: 'POOL-1001',
    msmeId: 'msme-1',
    msmeName: 'Sri Lakshmi Knits',
    invoiceIds: ['inv-1', 'inv-2', 'inv-3'],
    invoiceCount: 3,
    totalInvoiceValue: 260000,
    weightedRiskScore: 82,
    riskLevel: 'LOW',
    eligibleFinancing: 208000,
    status: 'REQUESTED',
    createdAt: '2026-08-25T15:00:00Z'
  }
];

const INITIAL_REQUESTS: FinancingRequest[] = [
  {
    id: 'req-1',
    requestNumber: 'REQ-1001',
    msmeId: 'msme-1',
    msmeName: 'Sri Lakshmi Knits',
    industry: 'Textile Job Work',
    poolId: 'pool-1',
    poolNumber: 'POOL-1001',
    invoiceValue: 260000,
    riskScore: 82,
    riskLevel: 'LOW',
    recommendedAmount: 208000,
    requestedAmount: 208000,
    status: 'APPROVED',
    lenderName: 'Apex FinCorp Capital',
    decisionDate: '2026-08-26T16:00:00Z',
    createdAt: '2026-08-25T15:30:00Z',
    positiveFactors: [
      'Strong buyer payment history (>94% on-time settlement)',
      'Multiple previous successful invoice completions',
      'Consistent transaction history over past 12 months',
      'Invoice values match historical average orders'
    ],
    riskFactors: [
      'Minor seasonal volatility in textile demand'
    ]
  },
  {
    id: 'req-2',
    requestNumber: 'REQ-1007',
    msmeId: 'msme-1',
    msmeName: 'Sri Lakshmi Knits',
    industry: 'Textile Job Work',
    poolId: 'pool-legacy-1',
    poolNumber: 'POOL-0994',
    invoiceValue: 150000,
    riskScore: 54,
    riskLevel: 'HIGH',
    recommendedAmount: 90000,
    requestedAmount: 135000,
    status: 'REJECTED',
    rejectionReason: 'Additional documents required. Buyer payment history requires further review.',
    lenderName: 'TrustBridge NBFC',
    decisionDate: '2026-08-18T11:00:00Z',
    createdAt: '2026-08-17T09:00:00Z',
    positiveFactors: ['Valid GST registration'],
    riskFactors: [
      'Buyer credit profile shows multiple overdue flags',
      'High invoice concentration with single buyer'
    ]
  },
  {
    id: 'req-3',
    requestNumber: 'REQ-1008',
    msmeId: 'msme-1',
    msmeName: 'Sri Lakshmi Knits',
    industry: 'Textile Job Work',
    poolId: 'pool-legacy-2',
    poolNumber: 'POOL-1002',
    invoiceValue: 95000,
    riskScore: 86,
    riskLevel: 'LOW',
    recommendedAmount: 80750,
    requestedAmount: 80750,
    status: 'UNDER_REVIEW',
    lenderName: 'Apex FinCorp Capital',
    createdAt: '2026-09-01T08:00:00Z',
    positiveFactors: [
      'Buyer ABC Garments has 98% reliability score',
      'Verified e-Way bill and GST matched'
    ],
    riskFactors: []
  }
];

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Financing Approved ✓',
    message: 'Financing request REQ-1001 for ₹2,08,000 has been approved by Apex FinCorp.',
    type: 'SUCCESS',
    timestamp: '10m ago',
    read: false
  },
  {
    id: 'notif-2',
    title: 'Invoice Verified ✓',
    message: 'Invoice INV-1004 for ₹95,000 has been verified with 96% confidence.',
    type: 'SUCCESS',
    timestamp: '2h ago',
    read: false
  },
  {
    id: 'notif-3',
    title: 'Invoice Notice ⚠',
    message: 'Invoice INV-1005 requires review due to slight billing address mismatch.',
    type: 'WARNING',
    timestamp: '1d ago',
    read: true
  }
];

const INITIAL_KYC: KYCState = {
  aadhaar: { status: 'VERIFIED', number: 'XXXX XXXX 4521', verifiedAt: '2026-08-01' },
  pan: { status: 'VERIFIED', number: 'XXXXX1234X', verifiedAt: '2026-08-01' },
  bank: { status: 'VERIFIED', accountNumber: 'XXXX XXXX 8892', ifsc: 'HDFC0001234', verifiedAt: '2026-08-02' },
  business: { status: 'VERIFIED', gstNumber: '33AABCS1234F1Z0', udyamNumber: 'UDYAM-TN-30-0012345', verifiedAt: '2026-08-02' },
  documents: { status: 'VERIFIED', count: 3, verifiedAt: '2026-08-03' }
};

// Local storage helper
const getStored = <T>(key: string, fallback: T): T => {
  try {
    const item = localStorage.getItem(`nool_${key}`);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
};

const setStored = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(`nool_${key}`, JSON.stringify(value));
  } catch (e) {
    console.error('Storage error:', e);
  }
};

export const api = {
  // Invoices
  getInvoices: async (): Promise<Invoice[]> => {
    try {
      const res = await fetch(`${API_BASE}/invoices`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setStored('invoices', data);
          return data;
        }
      }
    } catch (e) {
      console.warn('Backend fetch failed, using local invoices:', e);
    }
    return getStored('invoices', INITIAL_INVOICES);
  },

  addInvoice: async (invoice: Partial<Invoice>): Promise<Invoice> => {
    const list = getStored('invoices', INITIAL_INVOICES);
    const newInv: Invoice = {
      id: `inv-${Date.now()}`,
      invoiceNumber: invoice.invoiceNumber || `INV-${1000 + list.length + 1}`,
      msmeId: 'msme-1',
      msmeName: 'Sri Lakshmi Knits',
      buyerId: `buyer-${Math.floor(Math.random() * 5) + 1}`,
      buyerName: invoice.buyerName || 'ABC Garments Ltd',
      buyerGst: invoice.buyerGst || '33AABCA1234F1Z8',
      invoiceAmount: Number(invoice.invoiceAmount) || 100000,
      invoiceDate: invoice.invoiceDate || new Date().toISOString().split('T')[0],
      dueDate: invoice.dueDate || new Date(Date.now() + 60 * 86400000).toISOString().split('T')[0],
      paymentTerms: invoice.paymentTerms || 'Net 60 Days',
      verificationStatus: invoice.verificationStatus || 'VERIFIED',
      verificationScore: invoice.verificationScore || 95,
      riskScore: invoice.riskScore || 86,
      riskLevel: invoice.riskLevel || 'LOW',
      eligibleFinancing: Math.round((Number(invoice.invoiceAmount) || 100000) * 0.85),
      status: 'AVAILABLE',
      fraudAlerts: invoice.fraudAlerts || [],
      createdAt: new Date().toISOString()
    };

    // Save directly to MongoDB Atlas via Express backend!
    try {
      const res = await fetch(`${API_BASE}/invoices`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newInv)
      });
      if (res.ok) {
        const savedData = await res.json();
        console.log('✅ Successfully persisted invoice to MongoDB Atlas:', savedData);
      }
    } catch (err) {
      console.warn('Backend write failed, saving locally:', err);
    }

    const updated = [newInv, ...list];
    setStored('invoices', updated);
    return newInv;
  },

  // Pools
  getPools: async (): Promise<InvoicePool[]> => {
    return getStored('pools', INITIAL_POOLS);
  },

  createPool: async (selectedInvoiceIds: string[]): Promise<InvoicePool> => {
    const invoices = getStored('invoices', INITIAL_INVOICES);
    const pools = getStored('pools', INITIAL_POOLS);
    const selectedInvoices = invoices.filter(inv => selectedInvoiceIds.includes(inv.id));
    
    const totalValue = selectedInvoices.reduce((acc, inv) => acc + inv.invoiceAmount, 0);
    const weightedScore = Math.round(
      selectedInvoices.reduce((acc, inv) => acc + (inv.riskScore * inv.invoiceAmount), 0) / (totalValue || 1)
    );
    const riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' = weightedScore >= 80 ? 'LOW' : weightedScore >= 60 ? 'MEDIUM' : 'HIGH';
    const financingRate = riskLevel === 'LOW' ? 0.85 : riskLevel === 'MEDIUM' ? 0.70 : 0.50;
    const eligibleFinancing = Math.round(totalValue * financingRate);

    const newPool: InvoicePool = {
      id: `pool-${Date.now()}`,
      poolNumber: `POOL-${1000 + pools.length + 1}`,
      msmeId: 'msme-1',
      msmeName: 'Sri Lakshmi Knits',
      invoiceIds: selectedInvoiceIds,
      invoiceCount: selectedInvoiceIds.length,
      totalInvoiceValue: totalValue,
      weightedRiskScore: weightedScore,
      riskLevel,
      eligibleFinancing,
      status: 'CREATED',
      createdAt: new Date().toISOString()
    };

    // Update invoice status to POOLED
    const updatedInvoices = invoices.map(inv => 
      selectedInvoiceIds.includes(inv.id) ? { ...inv, status: 'POOLED' as const, poolId: newPool.id } : inv
    );

    setStored('invoices', updatedInvoices);
    setStored('pools', [newPool, ...pools]);
    return newPool;
  },

  // Financing Requests
  getFinancingRequests: async (): Promise<FinancingRequest[]> => {
    return getStored('requests', INITIAL_REQUESTS);
  },

  submitFinancingRequest: async (poolId: string, requestedAmount?: number): Promise<FinancingRequest> => {
    const pools = getStored('pools', INITIAL_POOLS);
    const requests = getStored('requests', INITIAL_REQUESTS);
    const pool = pools.find(p => p.id === poolId) || pools[0];

    const newReq: FinancingRequest = {
      id: `req-${Date.now()}`,
      requestNumber: `REQ-${1000 + requests.length + 1}`,
      msmeId: 'msme-1',
      msmeName: pool.msmeName || 'Sri Lakshmi Knits',
      industry: 'Textile Job Work',
      poolId: pool.id,
      poolNumber: pool.poolNumber,
      invoiceValue: pool.totalInvoiceValue,
      riskScore: pool.weightedRiskScore,
      riskLevel: pool.riskLevel,
      recommendedAmount: pool.eligibleFinancing,
      requestedAmount: requestedAmount || pool.eligibleFinancing,
      status: 'UNDER_REVIEW',
      createdAt: new Date().toISOString(),
      positiveFactors: [
        'Strong historical repayment record',
        'Verified GST and matching invoice hash',
        'Diversified invoice pool'
      ],
      riskFactors: []
    };

    setStored('requests', [newReq, ...requests]);
    return newReq;
  },

  approveRequest: async (requestId: string, lenderName: string = 'Apex FinCorp Capital'): Promise<FinancingRequest> => {
    const requests = getStored('requests', INITIAL_REQUESTS);
    const updated = requests.map(req => {
      if (req.id === requestId) {
        return {
          ...req,
          status: 'APPROVED' as const,
          lenderName,
          lenderDecision: 'APPROVED',
          decisionDate: new Date().toISOString()
        };
      }
      return req;
    });
    setStored('requests', updated);
    return updated.find(r => r.id === requestId)!;
  },

  rejectRequest: async (requestId: string, reason: string): Promise<FinancingRequest> => {
    const requests = getStored('requests', INITIAL_REQUESTS);
    const updated = requests.map(req => {
      if (req.id === requestId) {
        return {
          ...req,
          status: 'REJECTED' as const,
          rejectionReason: reason,
          lenderDecision: 'REJECTED',
          decisionDate: new Date().toISOString()
        };
      }
      return req;
    });
    setStored('requests', updated);
    return updated.find(r => r.id === requestId)!;
  },

  initiateDisbursement: async (requestId: string): Promise<FinancingRequest> => {
    const requests = getStored('requests', INITIAL_REQUESTS);
    const updated = requests.map(req => {
      if (req.id === requestId) {
        return {
          ...req,
          status: 'DISBURSEMENT_INITIATED' as const
        };
      }
      return req;
    });
    setStored('requests', updated);
    return updated.find(r => r.id === requestId)!;
  },

  // KYC
  getKYCState: async (): Promise<KYCState> => {
    return getStored('kyc', INITIAL_KYC);
  },

  updateKYCState: async (step: keyof KYCState, data: any): Promise<KYCState> => {
    const current = getStored('kyc', INITIAL_KYC);
    const updated = {
      ...current,
      [step]: {
        ...current[step],
        ...data,
        status: 'VERIFIED',
        verifiedAt: new Date().toISOString().split('T')[0]
      }
    };
    setStored('kyc', updated);
    return updated;
  },

  // Notifications
  getNotifications: async (): Promise<NotificationItem[]> => {
    return getStored('notifications', INITIAL_NOTIFICATIONS);
  },

  markNotificationsRead: async (): Promise<void> => {
    const current = getStored('notifications', INITIAL_NOTIFICATIONS);
    const updated = current.map(n => ({ ...n, read: true }));
    setStored('notifications', updated);
  },

  // Reset Demo Data
  resetDemoData: async (): Promise<void> => {
    setStored('invoices', INITIAL_INVOICES);
    setStored('pools', INITIAL_POOLS);
    setStored('requests', INITIAL_REQUESTS);
    setStored('kyc', INITIAL_KYC);
    setStored('notifications', INITIAL_NOTIFICATIONS);
  },

  // Government Schemes
  getGovernmentSchemes: async (): Promise<GovernmentScheme[]> => {
    try {
      const response = await fetch(`${API_BASE}/government/schemes`);
      if (response.ok) return await response.json();
    } catch (e) {
      console.warn('Backend unavailable, using mock schemes');
    }
    return [
      {
        id: 'scheme-1',
        name: 'Credit Guarantee Fund Trust for Micro and Small Enterprises (CGTMSE)',
        category: 'Credit Guarantees',
        description: 'Provides collateral-free credit to the micro and small enterprise sector.',
        eligibility: 'New and existing Micro and Small Enterprises.',
        potentialBenefit: 'Guarantee cover up to 85% for loans up to ₹500 Lakhs.',
        requiredDocuments: ['Udyam Registration', 'Project Report', 'Bank Statement'],
        url: 'https://www.cgtmse.in/',
      },
      {
        id: 'scheme-2',
        name: 'Trade Receivables Discounting System (TReDS)',
        category: 'Working Capital Support',
        description: 'An electronic platform for facilitating the financing / discounting of trade receivables of MSMEs.',
        eligibility: 'MSMEs holding valid Udyam Registration.',
        potentialBenefit: 'Immediate realization of receivables at competitive rates.',
        requiredDocuments: ['Udyam Registration', 'Invoices', 'Bank Account Details'],
        url: 'https://www.rbi.org.in/',
      },
      {
        id: 'scheme-3',
        name: 'Amended Technology Upgradation Fund Scheme (ATUFS)',
        category: 'Technology Upgradation',
        description: 'Facilitates technology upgradation in the textile sector.',
        eligibility: 'Textile MSMEs undertaking technology upgradation.',
        potentialBenefit: 'Capital investment subsidy up to 15%.',
        requiredDocuments: ['Detailed Project Report', 'Machinery Quotations', 'Udyam'],
        url: 'http://txcindia.gov.in/',
      },
      {
        id: 'scheme-4',
        name: 'Tamil Nadu New Entrepreneur cum Enterprise Development Scheme (NEEDS)',
        category: 'Entrepreneurship Support',
        description: 'Assistance for first generation entrepreneurs in Tamil Nadu.',
        eligibility: 'Educated youth in Tamil Nadu setting up new enterprises.',
        potentialBenefit: '25% capital subsidy up to ₹75 Lakhs.',
        requiredDocuments: ['Educational Certificate', 'Project Report', 'Quotations'],
        url: 'https://www.msmeonline.tn.gov.in/',
      }
    ];
  },

  // Audit Logs
  getAuditLogs: async (): Promise<AuditLog[]> => {
    try {
      const response = await fetch(`${API_BASE}/audit-logs`);
      if (response.ok) return await response.json();
    } catch (e) {
      console.warn('Backend unavailable, using mock audit logs');
    }
    return [
      { id: 'log-1', action: 'LOGIN', userId: 'usr-msme-01', details: 'MSME logged in', timestamp: new Date(Date.now() - 86400000).toISOString() },
      { id: 'log-2', action: 'INVOICE_UPLOADED', userId: 'usr-msme-01', details: 'Uploaded INV-1003', timestamp: new Date(Date.now() - 3600000).toISOString() },
      { id: 'log-3', action: 'RISK_ASSESSED', userId: 'usr-msme-01', details: 'Score: 86', timestamp: new Date(Date.now() - 3500000).toISOString() }
    ];
  }
};
