require('dotenv').config();
const fs = require('fs');
const path = require('path');
const app = require('./app');
const connectDB = require('./config/db');

// Copy user screenshot for presentation
try {
  const src = 'C:/Users/lithi/.gemini/antigravity/brain/fee04cd8-62a5-4a7b-aa02-8b4c47fdc253/.user_uploaded/media_1788454415843.jpg';
  const dest1 = path.resolve(__dirname, '../dashboard_screenshot.jpg');
  const dest2 = path.resolve(__dirname, '../frontend/public/dashboard_screenshot.jpg');
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest1);
    fs.copyFileSync(src, dest2);
  }
} catch (e) {}

const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 NOOL CREDIT EXPRESS SERVER RUNNING ON PORT ${PORT}`);
  console.log(`   Health Check: http://localhost:${PORT}/api/health`);
  console.log(`   API Endpoint: http://localhost:${PORT}/api/invoices`);
  console.log(`======================================================\n`);
});
