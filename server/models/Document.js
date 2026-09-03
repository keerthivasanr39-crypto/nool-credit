const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  documentId: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  documentType: { type: String, required: true },
  title: { type: String, required: true },
  fileName: String,
  fileSize: String,
  uploadDate: { type: String, default: () => new Date().toISOString().split('T')[0] },
  status: { type: String, enum: ['VERIFIED', 'PENDING', 'MISSING', 'REJECTED'], default: 'VERIFIED' },
  verificationNotes: String,
  reusableForPools: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Document', documentSchema);
