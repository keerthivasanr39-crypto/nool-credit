const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  invoiceId: { type: String, required: true, unique: true },
  invoiceNumber: { type: String, required: true, unique: true },
  msmeId: { type: String, required: true },
  buyerName: { type: String, required: true },
  buyerBusinessId: { type: String, required: true },
  invoiceAmount: { type: Number, required: true },
  invoiceDate: { type: String, required: true },
  dueDate: { type: String, required: true },
  paymentTerms: { type: String, default: 'Net 60 Days' },
  verificationStatus: { type: String, default: 'VERIFIED' },
  verificationScore: { type: Number, default: 95 },
  riskScore: { type: Number, default: 85 },
  riskLevel: { type: String, default: 'LOW' },
  eligibleFinancing: { type: Number, required: true },
  status: { type: String, default: 'VERIFIED' },
  warnings: [String],
  notes: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Invoice', invoiceSchema);
