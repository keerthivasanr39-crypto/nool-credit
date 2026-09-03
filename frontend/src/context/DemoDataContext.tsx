import React, { createContext, useContext, useState, useEffect } from 'react';
import { Invoice, InvoicePool, FinancingRequest, RiskAssessment, Buyer } from '../types';
import apiClient from '../services/api';

interface DemoDataContextType {
  invoices: Invoice[];
  pools: InvoicePool[];
  financingRequests: FinancingRequest[];
  buyers: Buyer[];
  addInvoice: (invoice: Partial<Invoice>) => Promise<Invoice>;
  createPool: (invoiceIds: string[]) => Promise<InvoicePool>;
  submitFinancingRequest: (poolId: string) => Promise<FinancingRequest>;
  approveFinancingRequest: (requestId: string) => Promise<boolean>;
  rejectFinancingRequest: (requestId: string, reason: string) => Promise<boolean>;
  getRiskAssessmentForInvoice: (invoiceId: string) => RiskAssessment;
  getInvoiceById: (id: string) => Invoice | undefined;
  getPoolById: (id: string) => InvoicePool | undefined;
  getRequestById: (id: string) => FinancingRequest | undefined;
  resetDemoData: () => void;
}

const INITIAL_BUYERS: Buyer[] = [
  {
    id: 'buy-01',
    name: 'ABC Garments Ltd.',
    businessId: 'BUY-ABC-9842',
    reliabilityScore: 94,
    successfulPayments: 38,
    averagePaymentDelayDays: 6,
  },
  {
    id: 'buy-02',
    name: 'Knitwear Exports Global',
    businessId: 'BUY-KNT-1102',
    reliabilityScore: 88,
    successfulPayments: 24,
    averagePaymentDelayDays: 12,
  },
];

const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'inv-1001',
    invoiceNumber: 'INV-1001',
    msmeId: 'msme-01',
    msmeName: 'Sri Lakshmi Knits',
    buyerId: 'buy-01',
    buyerName: 'ABC Garments Ltd.',
    buyerBusinessId: 'BUY-ABC-9842',
    invoiceAmount: 60000,
    invoiceDate: '2026-08-10',
    dueDate: '2026-10-10',
    paymentTerms: 'Net 60 Days',
    verificationStatus: 'VERIFIED',
    verificationScore: 96,
    riskScore: 85,
    riskLevel: 'LOW',
    eligibleFinancing: 51000, // 85%
    status: 'VERIFIED',
    notes: 'Textile dye and spin batch #402',
  },
  {
    id: 'inv-1002',
    invoiceNumber: 'INV-1002',
    msmeId: 'msme-01',
    msmeName: 'Sri Lakshmi Knits',
    buyerId: 'buy-01',
    buyerName: 'ABC Garments Ltd.',
    buyerBusinessId: 'BUY-ABC-9842',
    invoiceAmount: 80000,
    invoiceDate: '2026-08-15',
    dueDate: '2026-10-15',
    paymentTerms: 'Net 60 Days',
    verificationStatus: 'VERIFIED',
    verificationScore: 94,
    riskScore: 82,
    riskLevel: 'LOW',
    eligibleFinancing: 68000, // 85%
    status: 'VERIFIED',
    notes: 'Cotton jersey fabric knitting job work',
  },
  {
    id: 'inv-1003',
    invoiceNumber: 'INV-1003',
    msmeId: 'msme-01',
    msmeName: 'Sri Lakshmi Knits',
    buyerId: 'buy-01',
    buyerName: 'ABC Garments Ltd.',
    buyerBusinessId: 'BUY-ABC-9842',
    invoiceAmount: 120000,
    invoiceDate: '2026-08-20',
    dueDate: '2026-10-20',
    paymentTerms: 'Net 60 Days',
    verificationStatus: 'VERIFIED',
    verificationScore: 95,
    riskScore: 80,
    riskLevel: 'LOW',
    eligibleFinancing: 102000, // 85%
    status: 'VERIFIED',
    notes: 'Export garment finish and packaging',
  },
];

const INITIAL_POOLS: InvoicePool[] = [
  {
    id: 'pool-1001',
    poolNumber: 'POOL-1001',
    msmeId: 'msme-01',
    msmeName: 'Sri Lakshmi Knits',
    industry: 'Textile Job Work',
    invoiceIds: ['inv-1001', 'inv-1002', 'inv-1003'],
    totalInvoiceValue: 260000,
    weightedRiskScore: 82,
    riskLevel: 'LOW',
    eligibleFinancing: 208000, // 80% bundle rate
    status: 'SUBMITTED',
    createdAt: '2026-08-25',
  },
];

const INITIAL_REQUESTS: FinancingRequest[] = [
  {
    id: 'req-1001',
    requestNumber: 'REQ-2026-089',
    msmeId: 'msme-01',
    msmeName: 'Sri Lakshmi Knits',
    industry: 'Textile Job Work',
    location: 'Tirupur, Tamil Nadu',
    poolId: 'pool-1001',
    poolNumber: 'POOL-1001',
    invoiceCount: 3,
    invoiceValue: 260000,
    riskScore: 82,
    riskLevel: 'LOW',
    recommendedAmount: 208000,
    status: 'UNDER_REVIEW',
    submittedAt: '2026-08-25T14:30:00Z',
    positiveDrivers: [
      'Strong buyer payment history with ABC Garments (38 successful settlements)',
      'High transaction consistency across 12-month textile production cycles',
      'No history of disputed deliveries or quality penalties',
      'Verified GST compliance and active manufacturing unit',
    ],
    riskDrivers: [
      'Seasonal concentration in single buyer portfolio',
      'Average payment settlement cycle spans 66 calendar days',
    ],
  },
];

const DemoDataContext = createContext<DemoDataContextType | undefined>(undefined);

export const DemoDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    const saved = localStorage.getItem('nool_invoices');
    return saved ? JSON.parse(saved) : INITIAL_INVOICES;
  });

  const [pools, setPools] = useState<InvoicePool[]>(() => {
    const saved = localStorage.getItem('nool_pools');
    return saved ? JSON.parse(saved) : INITIAL_POOLS;
  });

  const [financingRequests, setFinancingRequests] = useState<FinancingRequest[]>(() => {
    const saved = localStorage.getItem('nool_requests');
    return saved ? JSON.parse(saved) : INITIAL_REQUESTS;
  });

  const [buyers] = useState<Buyer[]>(INITIAL_BUYERS);

  useEffect(() => {
    localStorage.setItem('nool_invoices', JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem('nool_pools', JSON.stringify(pools));
  }, [pools]);

  useEffect(() => {
    localStorage.setItem('nool_requests', JSON.stringify(financingRequests));
  }, [financingRequests]);

  // Attempt background sync with backend if available
  useEffect(() => {
    const fetchBackendData = async () => {
      try {
        const invRes = await apiClient.get('/invoices');
        if (invRes.data && Array.isArray(invRes.data) && invRes.data.length > 0) {
          setInvoices(invRes.data);
        }
      } catch (e) {
        // Backend not ready yet - continue smoothly with rich mock state
      }
    };
    fetchBackendData();
  }, []);

  const addInvoice = async (invoiceData: Partial<Invoice>): Promise<Invoice> => {
    const amount = Number(invoiceData.invoiceAmount) || 50000;
    const invNum = invoiceData.invoiceNumber || `INV-${Math.floor(1000 + Math.random() * 9000)}`;
    
    // Fraud & Risk Checks
    const isDuplicate = invoices.some((i) => i.invoiceNumber.toLowerCase() === invNum.toLowerCase());
    const isUnusualAmount = amount > 300000;
    const isExpired = invoiceData.dueDate ? new Date(invoiceData.dueDate) < new Date() : false;

    let baseRiskScore = 88;
    const warnings: string[] = [];

    if (isDuplicate) {
      baseRiskScore -= 30;
      warnings.push('Duplicate Invoice Detected');
    }
    if (isUnusualAmount) {
      baseRiskScore -= 15;
      warnings.push('Unusual Invoice Amount Detected (>2.5x historical average)');
    }
    if (isExpired) {
      baseRiskScore -= 20;
      warnings.push('Invoice Due Date has Passed - Requires Additional Verification');
    }

    const calculatedRiskLevel: 'LOW' | 'MEDIUM' | 'HIGH' =
      baseRiskScore >= 80 ? 'LOW' : baseRiskScore >= 60 ? 'MEDIUM' : 'HIGH';
    
    const financingRate = calculatedRiskLevel === 'LOW' ? 0.85 : calculatedRiskLevel === 'MEDIUM' ? 0.70 : 0.50;
    const eligibleAmount = Math.round(amount * financingRate);

    const newInvoice: Invoice = {
      id: `inv-${Date.now()}`,
      invoiceNumber: invNum,
      msmeId: 'msme-01',
      msmeName: 'Sri Lakshmi Knits',
      buyerId: invoiceData.buyerId || 'buy-01',
      buyerName: invoiceData.buyerName || 'ABC Garments Ltd.',
      buyerBusinessId: invoiceData.buyerBusinessId || 'BUY-ABC-9842',
      invoiceAmount: amount,
      invoiceDate: invoiceData.invoiceDate || new Date().toISOString().split('T')[0],
      dueDate: invoiceData.dueDate || new Date(Date.now() + 60 * 86400000).toISOString().split('T')[0],
      paymentTerms: invoiceData.paymentTerms || 'Net 60 Days',
      verificationStatus: isDuplicate ? 'FAILED' : 'VERIFIED',
      verificationScore: isDuplicate ? 45 : 95,
      riskScore: Math.max(20, Math.min(100, baseRiskScore)),
      riskLevel: calculatedRiskLevel,
      eligibleFinancing: eligibleAmount,
      status: isDuplicate ? 'FLAGGED' : 'VERIFIED',
      warnings,
      notes: invoiceData.notes || 'Job work batch verification completed',
    };

    try {
      await apiClient.post('/invoices', newInvoice);
    } catch (e) {
      // Offline fallback
    }

    setInvoices((prev) => [newInvoice, ...prev]);
    return newInvoice;
  };

  const createPool = async (invoiceIds: string[]): Promise<InvoicePool> => {
    const selectedInvoices = invoices.filter((i) => invoiceIds.includes(i.id));
    const totalVal = selectedInvoices.reduce((sum, i) => sum + i.invoiceAmount, 0);
    
    // Calculate weighted risk score
    const weightedScoreSum = selectedInvoices.reduce(
      (sum, i) => sum + i.riskScore * i.invoiceAmount,
      0
    );
    const weightedRiskScore = totalVal > 0 ? Math.round(weightedScoreSum / totalVal) : 80;
    const riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' =
      weightedRiskScore >= 80 ? 'LOW' : weightedRiskScore >= 60 ? 'MEDIUM' : 'HIGH';

    const bundleRate = riskLevel === 'LOW' ? 0.80 : riskLevel === 'MEDIUM' ? 0.65 : 0.40;
    const eligibleFinancing = Math.round(totalVal * bundleRate);

    const newPool: InvoicePool = {
      id: `pool-${Date.now()}`,
      poolNumber: `POOL-${Math.floor(1000 + Math.random() * 9000)}`,
      msmeId: 'msme-01',
      msmeName: 'Sri Lakshmi Knits',
      industry: 'Textile Job Work',
      invoiceIds,
      invoices: selectedInvoices,
      totalInvoiceValue: totalVal,
      weightedRiskScore,
      riskLevel,
      eligibleFinancing,
      status: 'READY',
      createdAt: new Date().toISOString().split('T')[0],
    };

    try {
      await apiClient.post('/pools', newPool);
    } catch (e) {
      // offline fallback
    }

    setPools((prev) => [newPool, ...prev]);
    return newPool;
  };

  const submitFinancingRequest = async (poolId: string): Promise<FinancingRequest> => {
    const pool = pools.find((p) => p.id === poolId) || pools[0];
    
    const newRequest: FinancingRequest = {
      id: `req-${Date.now()}`,
      requestNumber: `REQ-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      msmeId: pool.msmeId,
      msmeName: pool.msmeName,
      industry: pool.industry,
      location: 'Tirupur, Tamil Nadu',
      poolId: pool.id,
      poolNumber: pool.poolNumber,
      invoiceCount: pool.invoiceIds.length,
      invoiceValue: pool.totalInvoiceValue,
      riskScore: pool.weightedRiskScore,
      riskLevel: pool.riskLevel,
      recommendedAmount: pool.eligibleFinancing,
      status: 'UNDER_REVIEW',
      submittedAt: new Date().toISOString(),
      positiveDrivers: [
        'Verified GST and operational textile manufacturing unit in Tirupur hub',
        'Strong buyer historical clearance rate with 35+ settled consignments',
        'Balanced invoice pool diversification reducing default concentration',
        'Clean ledger balance and no active dispute records',
      ],
      riskDrivers: [
        'Average job-work clearance timeline ranges between 60 to 75 days',
      ],
    };

    // Update pool status
    setPools((prev) =>
      prev.map((p) => (p.id === poolId ? { ...p, status: 'SUBMITTED' } : p))
    );

    // Update invoices status
    setInvoices((prev) =>
      prev.map((inv) =>
        pool.invoiceIds.includes(inv.id) ? { ...inv, status: 'POOLED' } : inv
      )
    );

    try {
      await apiClient.post('/financing/request', newRequest);
    } catch (e) {
      // fallback
    }

    setFinancingRequests((prev) => [newRequest, ...prev]);
    return newRequest;
  };

  const approveFinancingRequest = async (requestId: string): Promise<boolean> => {
    try {
      await apiClient.put(`/financing/${requestId}/approve`);
    } catch (e) {
      // offline fallback
    }

    setFinancingRequests((prev) =>
      prev.map((req) =>
        req.id === requestId
          ? {
              ...req,
              status: 'APPROVED',
              lenderDecision: 'APPROVED',
              reviewedAt: new Date().toISOString(),
              disbursementReference: `DISB-TXN-${Math.floor(100000 + Math.random() * 900000)}`,
            }
          : req
      )
    );

    return true;
  };

  const rejectFinancingRequest = async (requestId: string, reason: string): Promise<boolean> => {
    try {
      await apiClient.put(`/financing/${requestId}/reject`, { reason });
    } catch (e) {
      // offline fallback
    }

    setFinancingRequests((prev) =>
      prev.map((req) =>
        req.id === requestId
          ? {
              ...req,
              status: 'REJECTED',
              lenderDecision: 'REJECTED',
              rejectionReason: reason,
              reviewedAt: new Date().toISOString(),
            }
          : req
      )
    );

    return true;
  };

  const getRiskAssessmentForInvoice = (invoiceId: string): RiskAssessment => {
    const inv = invoices.find((i) => i.id === invoiceId) || invoices[0];
    return {
      id: `risk-${inv.id}`,
      invoiceId: inv.id,
      buyerReliability: 24, // out of 25
      paymentHistory: 19, // out of 20
      successfulInvoices: 14, // out of 15
      transactionConsistency: 14, // out of 15
      amountConsistency: 9, // out of 10
      paymentDelayScore: 12, // out of 15
      fraudDeductions: inv.warnings && inv.warnings.length > 0 ? 25 : 0,
      finalScore: inv.riskScore,
      riskLevel: inv.riskLevel,
      positiveFactors: [
        'Strong buyer payment history with 98% on-time settlement clearance',
        'Multiple successful verified invoices in previous 4 quarters',
        'Consistent transaction rhythm with reliable repeat purchase orders',
        'Invoice amount matches historical manufacturing job-work baseline',
      ],
      riskFactors: [
        'Minor payment delay variance (+5 days beyond Net 60 terms in festive periods)',
      ],
    };
  };

  const getInvoiceById = (id: string) => invoices.find((i) => i.id === id);
  const getPoolById = (id: string) => pools.find((p) => p.id === id);
  const getRequestById = (id: string) => financingRequests.find((r) => r.id === id);

  const resetDemoData = () => {
    setInvoices(INITIAL_INVOICES);
    setPools(INITIAL_POOLS);
    setFinancingRequests(INITIAL_REQUESTS);
    localStorage.removeItem('nool_invoices');
    localStorage.removeItem('nool_pools');
    localStorage.removeItem('nool_requests');
  };

  return (
    <DemoDataContext.Provider
      value={{
        invoices,
        pools,
        financingRequests,
        buyers,
        addInvoice,
        createPool,
        submitFinancingRequest,
        approveFinancingRequest,
        rejectFinancingRequest,
        getRiskAssessmentForInvoice,
        getInvoiceById,
        getPoolById,
        getRequestById,
        resetDemoData,
      }}
    >
      {children}
    </DemoDataContext.Provider>
  );
};

export const useDemoData = (): DemoDataContextType => {
  const context = useContext(DemoDataContext);
  if (!context) {
    throw new Error('useDemoData must be used within a DemoDataProvider');
  }
  return context;
};
