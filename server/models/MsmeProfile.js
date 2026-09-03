const mongoose = require('mongoose');

const msmeProfileSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  businessName: { type: String, required: true },
  industry: { type: String, required: true },
  location: { type: String, required: true },
  businessType: { type: String, default: 'Private Limited' },
  udyamNumber: { type: String },
  gstin: { type: String },
  panNumber: { type: String },
  contactNumber: { type: String },
  bankDetails: {
    accountName: String,
    accountNumber: String,
    ifscCode: String,
    bankName: String,
    upiId: String,
    isVerified: { type: Boolean, default: true },
  },
  readinessScore: { type: Number, default: 82 },
  verificationStatus: { type: String, default: 'VERIFIED' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('MsmeProfile', msmeProfileSchema);
