const mongoose = require('mongoose');

const invoicePoolSchema = new mongoose.Schema({
  poolId: { type: String, required: true, unique: true },
  poolNumber: { type: String, required: true, unique: true },
  msmeId: { type: String, required: true },
  msmeName: { type: String, required: true },
  industry: { type: String, required: true },
  invoiceIds: [{ type: String }],
  totalInvoiceValue: { type: Number, required: true },
  weightedRiskScore: { type: Number, default: 80 },
  riskLevel: { type: String, default: 'LOW' },
  eligibleFinancing: { type: Number, required: true },
  status: { type: String, default: 'READY' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('InvoicePool', invoicePoolSchema);
