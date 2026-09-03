const mongoose = require('mongoose');

const financingRequestSchema = new mongoose.Schema({
  requestId: { type: String, required: true, unique: true },
  requestNumber: { type: String, required: true, unique: true },
  msmeId: { type: String, required: true },
  msmeName: { type: String, required: true },
  industry: { type: String, required: true },
  location: { type: String, required: true },
  poolId: { type: String, required: true },
  poolNumber: { type: String, required: true },
  invoiceCount: { type: Number, required: true },
  invoiceValue: { type: Number, required: true },
  riskScore: { type: Number, required: true },
  riskLevel: { type: String, required: true },
  recommendedAmount: { type: Number, required: true },
  status: { type: String, default: 'UNDER_REVIEW' },
  lenderDecision: String,
  rejectionReason: String,
  disbursementReference: String,
  positiveDrivers: [String],
  riskDrivers: [String],
  submittedAt: { type: Date, default: Date.now },
  reviewedAt: Date,
});

module.exports = mongoose.model('FinancingRequest', financingRequestSchema);
