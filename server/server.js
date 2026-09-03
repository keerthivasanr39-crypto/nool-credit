const app = require('./app');
const connectDB = require('./config/db');

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
