const mongoose = require('mongoose');
const dns = require('dns');

// Fix Windows DNS querySrv ECONNREFUSED with MongoDB Atlas
try {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
} catch (err) {
  // Ignore if not supported
}

const connectDB = async () => {
  try {
    const connUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/nool_credit_db';
    const conn = await mongoose.connect(connUri);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`⚠️ MongoDB connection error: ${error.message}. Running in memory fallback mode.`);
  }
};

module.exports = connectDB;
