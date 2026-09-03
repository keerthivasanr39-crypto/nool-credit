require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const User = require('../models/User');
const MsmeProfile = require('../models/MsmeProfile');
const Invoice = require('../models/Invoice');
const InvoicePool = require('../models/InvoicePool');
const FinancingRequest = require('../models/FinancingRequest');
const Document = require('../models/Document');
const connectDB = require('../config/db');

const seedAll = async () => {
  console.log('🌱 Starting Nool Credit Database Seeding...');

  // Connect to MongoDB if available
  await connectDB();

  try {
    // Clear existing collections if connected
    if (mongoose.connection.readyState === 1) {
      await Promise.all([
        User.deleteMany({}),
        MsmeProfile.deleteMany({}),
        Invoice.deleteMany({}),
        InvoicePool.deleteMany({}),
        FinancingRequest.deleteMany({}),
        Document.deleteMany({}),
      ]);
      console.log('🧹 Cleared existing database records.');
    }

    // 1. Seed Demo Users
    const users = [
      {
        userId: 'usr-msme-01',
        name: 'Karthik Subramanian',
        email: 'demo.msme@noolcredit.in',
        password: 'demo1234',
        role: 'MSME',
      },
      {
        userId: 'usr-msme-alt',
        name: 'Karthik Subramanian',
        email: 'msme@noolcredit.com',
        password: 'password123',
        role: 'MSME',
      },
      {
        userId: 'usr-lender-01',
        name: 'Priya Sundaram',
        email: 'demo.lender@noolcredit.in',
        password: 'demo1234',
        role: 'LENDER',
      },
      {
        userId: 'usr-lender-alt',
        name: 'Priya Sundaram',
        email: 'lender@noolcredit.com',
        password: 'password123',
        role: 'LENDER',
      },
    ];

    if (mongoose.connection.readyState === 1) {
      await User.insertMany(users);
      console.log('✅ Demo Users Seeded (MSME & Lender)');
    }

    // 2. Seed MSME Profiles (Low Risk & High Risk)
    const msmeProfiles = [
      {
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
      {
        userId: 'usr-msme-02',
        businessName: 'Kaveri Spinning Mills',
        businessType: 'Partnership',
        industry: 'Yarn Spinning',
        location: 'Coimbatore, Tamil Nadu',
        udyamNumber: 'UDYAM-TN-28-0054321',
        gstin: '33AAACK9876E1Z2',
        panNumber: 'AAACK9876E',
        contactNumber: '+91 94433 22110',
        bankDetails: {
          accountName: 'Kaveri Spinning Mills',
          accountNumber: '10892000345678',
          ifscCode: 'SBIN0000842',
          bankName: 'State Bank of India - Coimbatore',
          upiId: 'kaverispinner@oksbi',
          isVerified: true,
        },
        readinessScore: 54, // High-risk profile example
        verificationStatus: 'PENDING_AUDIT',
      },
    ];

    if (mongoose.connection.readyState === 1) {
      await MsmeProfile.insertMany(msmeProfiles);
      console.log('✅ MSME Business Profiles Seeded (Low Risk & High Risk)');
    }

    // 3. Seed Demo Invoices (₹60,000 / ₹80,000 / ₹1,20,000 + Duplicate test invoice)
    const invoices = [
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
      {
        id: 'inv-1004-dup',
        invoiceNumber: 'INV-1001', // DUPLICATE EXAMPLE
        msmeId: 'usr-msme-01',
        buyerName: 'ABC Garments Ltd.',
        buyerBusinessId: 'BUY-ABC-9842',
        buyerGst: '33AABCA1234F1Z8',
        invoiceAmount: 60000,
        invoiceDate: '2026-08-10',
        dueDate: '2026-10-10',
        paymentTerms: 'Net 60 Days',
        verificationStatus: 'DUPLICATE_FLAGGED',
        verificationScore: 40,
        riskScore: 35,
        riskLevel: 'HIGH',
        eligibleFinancing: 0,
        status: 'FLAGGED',
        notes: 'DUPLICATE INVOICE TEST CASE: Same invoice number previously uploaded and verified.',
      },
    ];

    if (mongoose.connection.readyState === 1) {
      await Invoice.insertMany(invoices);
      console.log('✅ Demo Invoices Seeded (including ₹60k, ₹80k, ₹1.2L & Duplicate test case)');
    }

    // 4. Seed Invoice Pools
    const pools = [
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
    ];

    if (mongoose.connection.readyState === 1) {
      await InvoicePool.insertMany(pools);
      console.log('✅ Invoice Pools Seeded');
    }

    // 5. Seed Financing Requests
    const financingRequests = [
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
    ];

    if (mongoose.connection.readyState === 1) {
      await FinancingRequest.insertMany(financingRequests);
      console.log('✅ Financing Requests Seeded');
    }

    console.log('\n======================================================');
    console.log('✨ NOOL CREDIT DEMO DATA SEEDED SUCCESSFULLY!');
    console.log('------------------------------------------------------');
    console.log('MSME Login:   demo.msme@noolcredit.in / demo1234');
    console.log('Lender Login: demo.lender@noolcredit.in / demo1234');
    console.log('Demo Profile: Sri Lakshmi Knits (Tirupur)');
    console.log('Invoices:     ₹60,000 + ₹80,000 + ₹1,20,000 = ₹2,60,000');
    console.log('Duplicate:    INV-1001 duplicate test case');
    console.log('======================================================\n');

  } catch (error) {
    console.error('❌ Seeding Error:', error);
  } finally {
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
    }
  }
};

seedAll();
