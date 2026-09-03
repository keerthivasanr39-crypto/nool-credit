const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// In-memory demo store fallback for standalone out-of-the-box execution
const memoryStore = {
  users: [
    {
      userId: 'usr-msme-01',
      name: 'Karthik Subramanian',
      email: 'demo.msme@noolcredit.in',
      role: 'MSME',
      businessName: 'Sri Lakshmi Knits',
      industry: 'Textile Job Work & Knitting',
      location: 'Tirupur, Tamil Nadu',
    },
    {
      userId: 'usr-msme-alt',
      name: 'Karthik Subramanian',
      email: 'msme@noolcredit.com',
      role: 'MSME',
      businessName: 'Sri Lakshmi Knits',
      industry: 'Textile Job Work & Knitting',
      location: 'Tirupur, Tamil Nadu',
    },
    {
      userId: 'usr-lender-01',
      name: 'Priya Sundaram',
      email: 'demo.lender@noolcredit.in',
      role: 'LENDER',
      businessName: 'Apex Capital Partners',
      industry: 'Institutional NBFC & SME Credit',
      location: 'Mumbai / Chennai',
    },
    {
      userId: 'usr-lender-alt',
      name: 'Priya Sundaram',
      email: 'lender@noolcredit.com',
      role: 'LENDER',
      businessName: 'Apex Capital Partners',
      industry: 'Institutional NBFC & SME Credit',
      location: 'Mumbai / Chennai',
    },
  ],
  profile: {
    userId: 'usr-msme-01',
    businessName: 'Sri Lakshmi Knits',
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
    readinessScore: 86,
    verificationStatus: 'VERIFIED',
  },
  invoices: [
    {
      id: 'inv-1001',
      invoiceNumber: 'INV-1001',
      msmeId: 'usr-msme-01',
      buyerName: 'ABC Garments Ltd.',
      buyerBusinessId: 'BUY-ABC-9842',
      buyerGst: '33AABCA1234F1Z8',
      invoiceAmount: 60000,
      invoiceDate: '2026-08-10',
      dueDate: '2026-10-10',
      paymentTerms: 'Net 60 Days',
      verificationStatus: 'VERIFIED',
      verificationScore: 96,
      riskScore: 85,
      riskLevel: 'LOW',
      eligibleFinancing: 51000,
      status: 'VERIFIED',
      notes: 'Textile dye and spin batch #402',
    },
    {
      id: 'inv-1002',
      invoiceNumber: 'INV-1002',
      msmeId: 'usr-msme-01',
      buyerName: 'Royal Exports India',
      buyerBusinessId: 'BUY-ROY-4412',
      buyerGst: '33AABCR5678K1Z3',
      invoiceAmount: 80000,
      invoiceDate: '2026-08-15',
      dueDate: '2026-10-15',
      paymentTerms: 'Net 60 Days',
      verificationStatus: 'VERIFIED',
      verificationScore: 94,
      riskScore: 82,
      riskLevel: 'LOW',
      eligibleFinancing: 68000,
      status: 'VERIFIED',
      notes: 'Cotton jersey fabric knitting job work',
    },
    {
      id: 'inv-1003',
      invoiceNumber: 'INV-1003',
      msmeId: 'usr-msme-01',
      buyerName: 'Chennai Weaving Mills',
      buyerBusinessId: 'BUY-CWM-7731',
      buyerGst: '33AABCC9900L1Z9',
      invoiceAmount: 120000,
      invoiceDate: '2026-08-20',
      dueDate: '2026-10-20',
      paymentTerms: 'Net 60 Days',
      verificationStatus: 'VERIFIED',
      verificationScore: 95,
      riskScore: 80,
      riskLevel: 'LOW',
      eligibleFinancing: 102000,
      status: 'VERIFIED',
      notes: 'Export garment finish and packaging',
    },
  ],
  pools: [
    {
      id: 'pool-1001',
      poolNumber: 'POOL-1001',
      msmeId: 'usr-msme-01',
      msmeName: 'Sri Lakshmi Knits',
      industry: 'Textile Job Work',
      invoiceIds: ['inv-1001', 'inv-1002', 'inv-1003'],
      totalInvoiceValue: 260000,
      weightedRiskScore: 82,
      riskLevel: 'LOW',
      eligibleFinancing: 208000,
      status: 'SUBMITTED',
    },
  ],
  financingRequests: [
    {
      id: 'req-1001',
      requestNumber: 'REQ-2026-089',
      msmeId: 'usr-msme-01',
      msmeName: 'Sri Lakshmi Knits',
      industry: 'Textile Job Work',
      location: 'Tirupur, Tamil Nadu',
      poolId: 'pool-1001',
      poolNumber: 'POOL-1001',
      invoiceCount: 3,
      invoiceValue: 260000,
      riskScore: 82,
      riskLevel: 'LOW',
      requestedAmount: 208000,
      recommendedAmount: 208000,
      status: 'UNDER_REVIEW',
      submittedAt: new Date().toISOString(),
      positiveDrivers: [
        'Strong buyer payment history with ABC Garments (38 successful settlements)',
        'High transaction consistency across 12-month textile production cycles',
        'GST returns 100% compliant with 0 delayed filings',
      ],
      riskDrivers: [
        'Average payment settlement cycle spans 66 calendar days',
      ],
    },
    {
      id: 'req-1002',
      requestNumber: 'REQ-2026-074',
      msmeId: 'usr-msme-01',
      msmeName: 'Sri Lakshmi Knits',
      industry: 'Textile Job Work',
      location: 'Tirupur, Tamil Nadu',
      poolId: 'pool-1000',
      poolNumber: 'POOL-1000',
      invoiceCount: 2,
      invoiceValue: 140000,
      riskScore: 86,
      riskLevel: 'LOW',
      requestedAmount: 112000,
      recommendedAmount: 112000,
      status: 'APPROVED',
      submittedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
      positiveDrivers: ['Timely delivery track record', 'High buyer credit rating'],
      riskDrivers: [],
    },
  ],
  documents: [
    {
      id: 'doc-01',
      documentType: 'PAN',
      title: 'PAN Card',
      fileName: 'SriLakshmi_PAN_AABCS1234F.pdf',
      status: 'VERIFIED',
      verifiedAt: '2026-08-01',
    },
    {
      id: 'doc-02',
      documentType: 'AADHAAR',
      title: 'Aadhaar Card',
      fileName: 'Aadhaar_Masked_XXXX4521.pdf',
      status: 'VERIFIED',
      verifiedAt: '2026-08-01',
    },
    {
      id: 'doc-03',
      documentType: 'GST_CERTIFICATE',
      title: 'GST Certificate',
      fileName: 'GSTIN_33AABCS1234F1Z5.pdf',
      status: 'VERIFIED',
      verifiedAt: '2026-08-01',
    },
    {
      id: 'doc-04',
      documentType: 'BANK_STATEMENT',
      title: 'Bank Statement (6 Months)',
      fileName: 'HDFC_Statement_6M.pdf',
      status: 'VERIFIED',
      verifiedAt: '2026-08-02',
    },
    {
      id: 'doc-05',
      documentType: 'BUSINESS_REGISTRATION',
      title: 'Udyam MSME Registration',
      fileName: 'UDYAM_TN_30_0098234.pdf',
      status: 'VERIFIED',
      verifiedAt: '2026-08-02',
    },
    {
      id: 'doc-06',
      documentType: 'INCOME_PROOF',
      title: 'Audited Financials / Income Proof',
      fileName: 'Audited_P_and_L_FY25-26.pdf',
      status: 'PENDING',
      verifiedAt: null,
    },
  ],
  notifications: [
    {
      id: 'notif-1',
      title: 'Financing Approved',
      message: 'Apex Capital Partners approved ₹2,08,000 for POOL-1001.',
      type: 'SUCCESS',
      createdAt: new Date().toISOString(),
      read: false,
    },
    {
      id: 'notif-2',
      title: 'Invoice Verified',
      message: 'Invoice INV-1003 (₹1,20,000) verified with 95% confidence.',
      type: 'INFO',
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      read: false,
    },
  ],
  governmentSchemes: [
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
  ],
  auditLogs: [
    { id: 'log-1', action: 'LOGIN', userId: 'usr-msme-01', details: 'MSME logged in', timestamp: new Date(Date.now() - 86400000).toISOString() },
    { id: 'log-2', action: 'INVOICE_UPLOADED', userId: 'usr-msme-01', details: 'Uploaded INV-1003', timestamp: new Date(Date.now() - 3600000).toISOString() },
    { id: 'log-3', action: 'RISK_ASSESSED', userId: 'usr-msme-01', details: 'Score: 86', timestamp: new Date(Date.now() - 3500000).toISOString() }
  ]
};

// Health endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'UP',
    service: 'Nool Credit Express API',
    tagline: 'One Platform. Smarter Financing. Faster Growth.',
    timestamp: new Date(),
  });
});

// Auth endpoints
app.post('/api/auth/login', (req, res) => {
  const { email, password, role } = req.body;
  const isLender =
    email?.toLowerCase().includes('lender') ||
    email === 'demo.lender@noolcredit.in' ||
    role === 'LENDER';

  const user = {
    token: 'jwt_mock_token_' + Date.now(),
    userId: isLender ? 'usr-lender-01' : 'usr-msme-01',
    name: isLender ? 'Priya Sundaram' : 'Karthik Subramanian',
    email: email || (isLender ? 'demo.lender@noolcredit.in' : 'demo.msme@noolcredit.in'),
    role: isLender ? 'LENDER' : 'MSME',
    businessName: isLender ? 'Apex Capital Partners' : 'Sri Lakshmi Knits',
    industry: isLender ? 'Institutional NBFC & SME Credit' : 'Textile Job Work & Knitting',
    location: isLender ? 'Mumbai / Chennai' : 'Tirupur, Tamil Nadu',
  };

  res.json(user);
});

// Profile endpoints
app.get('/api/profile', (req, res) => {
  res.json(memoryStore.profile);
});

app.put('/api/profile', (req, res) => {
  memoryStore.profile = { ...memoryStore.profile, ...req.body };
  res.json(memoryStore.profile);
});

// Invoices endpoints
app.get('/api/invoices', (req, res) => {
  res.json(memoryStore.invoices);
});

app.post('/api/invoices', (req, res) => {
  const { invoiceNumber, invoiceAmount, buyerName, dueDate, invoiceDate } = req.body;

  // Duplicate invoice check
  const isDuplicate = memoryStore.invoices.some(
    (inv) => inv.invoiceNumber?.toLowerCase() === invoiceNumber?.toLowerCase()
  );

  const newInvoice = {
    id: `inv-${Date.now()}`,
    invoiceNumber: invoiceNumber || `INV-${Math.floor(1000 + Math.random() * 9000)}`,
    msmeId: 'usr-msme-01',
    buyerName: buyerName || 'ABC Garments Ltd.',
    buyerBusinessId: 'BUY-ABC-9842',
    buyerGst: '33AABCA1234F1Z8',
    invoiceAmount: Number(invoiceAmount) || 100000,
    invoiceDate: invoiceDate || new Date().toISOString().split('T')[0],
    dueDate: dueDate || new Date(Date.now() + 60 * 86400000).toISOString().split('T')[0],
    paymentTerms: 'Net 60 Days',
    verificationStatus: isDuplicate ? 'DUPLICATE_FLAGGED' : 'VERIFIED',
    verificationScore: isDuplicate ? 40 : 96,
    riskScore: isDuplicate ? 35 : 85,
    riskLevel: isDuplicate ? 'HIGH' : 'LOW',
    eligibleFinancing: isDuplicate ? 0 : Math.round((Number(invoiceAmount) || 100000) * 0.85),
    status: isDuplicate ? 'FLAGGED' : 'VERIFIED',
    notes: isDuplicate ? 'Possible Duplicate Invoice Detected' : 'Verified via GSTIN & OCR',
  };

  memoryStore.invoices.unshift(newInvoice);

  memoryStore.notifications.unshift({
    id: `notif-${Date.now()}`,
    title: isDuplicate ? 'Duplicate Invoice Warning' : 'Invoice Verified',
    message: isDuplicate
      ? `Invoice ${newInvoice.invoiceNumber} duplicate detected.`
      : `Invoice ${newInvoice.invoiceNumber} (₹${newInvoice.invoiceAmount.toLocaleString('en-IN')}) successfully verified.`,
    type: isDuplicate ? 'WARNING' : 'SUCCESS',
    createdAt: new Date().toISOString(),
    read: false,
  });

  res.status(201).json(newInvoice);
});

// Pools endpoints
app.get('/api/pools', (req, res) => {
  res.json(memoryStore.pools);
});

app.post('/api/pools', (req, res) => {
  const { invoiceIds } = req.body;
  const selectedInvoices = memoryStore.invoices.filter((inv) =>
    invoiceIds.includes(inv.id)
  );

  const totalValue = selectedInvoices.reduce((acc, inv) => acc + inv.invoiceAmount, 0);
  const weightedScore =
    selectedInvoices.length > 0
      ? Math.round(
          selectedInvoices.reduce((acc, inv) => acc + inv.riskScore * inv.invoiceAmount, 0) /
            (totalValue || 1)
        )
      : 82;

  const newPool = {
    id: `pool-${Date.now()}`,
    poolNumber: `POOL-${Math.floor(1000 + Math.random() * 9000)}`,
    msmeId: 'usr-msme-01',
    msmeName: 'Sri Lakshmi Knits',
    industry: 'Textile Job Work',
    invoiceIds: invoiceIds || [],
    totalInvoiceValue: totalValue,
    weightedRiskScore: weightedScore,
    riskLevel: weightedScore >= 80 ? 'LOW' : weightedScore >= 60 ? 'MEDIUM' : 'HIGH',
    eligibleFinancing: Math.round(totalValue * 0.8),
    status: 'READY',
  };

  memoryStore.pools.unshift(newPool);
  res.status(201).json(newPool);
});

// Financing endpoints
app.get('/api/financing/requests', (req, res) => {
  res.json(memoryStore.financingRequests);
});

app.get('/api/financing/lender', (req, res) => {
  res.json(memoryStore.financingRequests);
});

app.get('/api/financing/msme', (req, res) => {
  res.json(memoryStore.financingRequests);
});

app.post('/api/financing/request', (req, res) => {
  const { poolId, requestedAmount } = req.body;
  const pool = memoryStore.pools.find((p) => p.id === poolId) || memoryStore.pools[0];

  const newReq = {
    id: `req-${Date.now()}`,
    requestNumber: `REQ-2026-${Math.floor(100 + Math.random() * 900)}`,
    msmeId: 'usr-msme-01',
    msmeName: 'Sri Lakshmi Knits',
    industry: 'Textile Job Work',
    location: 'Tirupur, Tamil Nadu',
    poolId: pool?.id || 'pool-1001',
    poolNumber: pool?.poolNumber || 'POOL-1001',
    invoiceCount: pool?.invoiceIds?.length || 3,
    invoiceValue: pool?.totalInvoiceValue || 260000,
    riskScore: pool?.weightedRiskScore || 82,
    riskLevel: pool?.riskLevel || 'LOW',
    requestedAmount: requestedAmount || pool?.eligibleFinancing || 208000,
    recommendedAmount: requestedAmount || pool?.eligibleFinancing || 208000,
    status: 'UNDER_REVIEW',
    submittedAt: new Date().toISOString(),
    positiveDrivers: [
      'Strong buyer payment history with ABC Garments (38 successful settlements)',
      'High transaction consistency across 12-month textile production cycles',
      'GST returns 100% compliant with 0 delayed filings',
    ],
    riskDrivers: [
      'Average payment settlement cycle spans 66 calendar days',
    ],
  };

  memoryStore.financingRequests.unshift(newReq);

  memoryStore.notifications.unshift({
    id: `notif-${Date.now()}`,
    title: 'Financing Request Submitted',
    message: `Request ${newReq.requestNumber} for ₹${newReq.requestedAmount.toLocaleString('en-IN')} sent to partner lenders.`,
    type: 'INFO',
    createdAt: new Date().toISOString(),
    read: false,
  });

  res.status(201).json(newReq);
});

app.put('/api/financing/:id/approve', (req, res) => {
  const { id } = req.params;
  const reqItem = memoryStore.financingRequests.find((r) => r.id === id);
  if (reqItem) {
    reqItem.status = 'APPROVED';
    reqItem.lenderDecision = 'APPROVED';
    reqItem.disbursementReference = `DISB-TXN-${Math.floor(100000 + Math.random() * 900000)}`;
    reqItem.approvedAt = new Date().toISOString();

    memoryStore.notifications.unshift({
      id: `notif-${Date.now()}`,
      title: 'Financing Approved & Disbursed! 🎉',
      message: `Apex Capital Partners approved ₹${(reqItem.requestedAmount || reqItem.recommendedAmount).toLocaleString('en-IN')}. Reference: ${reqItem.disbursementReference}`,
      type: 'SUCCESS',
      createdAt: new Date().toISOString(),
      read: false,
    });
  }
  res.json(reqItem || { success: true });
});

app.put('/api/financing/:id/reject', (req, res) => {
  const { id } = req.params;
  const reqItem = memoryStore.financingRequests.find((r) => r.id === id);
  if (reqItem) {
    reqItem.status = 'REJECTED';
    reqItem.lenderDecision = 'REJECTED';
    reqItem.rejectionReason = req.body.reason || 'Additional documentation required for collateral review.';
    reqItem.rejectedAt = new Date().toISOString();

    memoryStore.notifications.unshift({
      id: `notif-${Date.now()}`,
      title: 'Financing Decision Updated',
      message: `Request ${reqItem.requestNumber} requires additional verification. Reason: ${reqItem.rejectionReason}`,
      type: 'WARNING',
      createdAt: new Date().toISOString(),
      read: false,
    });
  }
  res.json(reqItem || { success: true });
});

app.put('/api/financing/:id/disburse', (req, res) => {
  const { id } = req.params;
  const reqItem = memoryStore.financingRequests.find((r) => r.id === id);
  if (reqItem) {
    reqItem.status = 'DISBURSEMENT_INITIATED';
    reqItem.disbursementReference = reqItem.disbursementReference || `DISB-TXN-${Math.floor(100000 + Math.random() * 900000)}`;
  }
  res.json(reqItem || { success: true });
});

// Documents endpoints
app.get('/api/documents', (req, res) => {
  res.json(memoryStore.documents);
});

app.post('/api/documents', (req, res) => {
  const newDoc = {
    id: `doc-${Date.now()}`,
    ...req.body,
    status: 'VERIFIED',
    verifiedAt: new Date().toISOString().split('T')[0],
  };
  memoryStore.documents.push(newDoc);
  res.status(201).json(newDoc);
});

// Notifications endpoints
app.get('/api/notifications', (req, res) => {
  res.json(memoryStore.notifications);
});

app.post('/api/notifications/read', (req, res) => {
  memoryStore.notifications.forEach((n) => (n.read = true));
  res.json({ success: true });
});

// AI Risk Assessment Engine Endpoint
app.post('/api/risk/evaluate', (req, res) => {
  const {
    monthlyRevenue = 500000,
    averageInvoiceValue = 85000,
    paymentCycleDays = 60,
    delayedInvoicesCount = 1,
    successfulInvoicesCount = 12,
  } = req.body;

  let score = 86;
  if (paymentCycleDays > 75) score -= 8;
  if (delayedInvoicesCount > 3) score -= 12;
  if (successfulInvoicesCount > 10) score += 5;
  score = Math.max(30, Math.min(98, score));

  const riskLevel = score >= 80 ? 'LOW' : score >= 60 ? 'MEDIUM' : 'HIGH';
  const advancePercent = score >= 80 ? 0.85 : score >= 60 ? 0.70 : 0.50;

  res.json({
    score,
    riskLevel,
    advancePercent,
    recommendedAdvanceAmount: Math.round(averageInvoiceValue * advancePercent),
    positiveDrivers: [
      'Strong buyer payment settlement track record',
      `${successfulInvoicesCount} successful previous invoice clearings`,
      'Consistent monthly textile order volumes',
    ],
    riskDrivers: [
      paymentCycleDays > 60 ? `Average settlement window spans ${paymentCycleDays} days` : 'Minor standard sector payment variance',
    ],
    notice: 'Our prototype uses invoice and transaction signals to generate an explainable financing risk assessment.',
  });
});

// Government Schemes endpoint
app.get('/api/government/schemes', (req, res) => {
  res.json(memoryStore.governmentSchemes);
});

// Audit Logs endpoint
app.get('/api/audit-logs', (req, res) => {
  res.json(memoryStore.auditLogs);
});

app.post('/api/audit-logs', (req, res) => {
  const newLog = {
    id: `log-${Date.now()}`,
    ...req.body,
    timestamp: new Date().toISOString()
  };
  memoryStore.auditLogs.unshift(newLog);
  res.status(201).json(newLog);
});

module.exports = app;
