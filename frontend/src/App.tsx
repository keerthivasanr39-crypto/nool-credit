import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { MobileNav } from './components/common/MobileNav';
import { DemoBanner } from './components/common/DemoBanner';
import { VoiceModal } from './components/common/VoiceModal';

import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { MSMEDashboard } from './pages/MSMEDashboard';
import { InvoicesPage } from './pages/InvoicesPage';
import { InvoicePoolPage } from './pages/InvoicePoolPage';
import { EligibilityPage } from './pages/EligibilityPage';
import { RiskAnalysisPage } from './pages/RiskAnalysisPage';
import { FinancingHistoryPage } from './pages/FinancingHistoryPage';
import { DocumentsPage } from './pages/Documents/DocumentsPage';
import { KYCPage } from './pages/KYCPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { AIAssistantPage } from './pages/AIAssistantPage';
import { FinancialGoalsPage } from './pages/FinancialGoalsPage';
import { ProfilePage } from './pages/Profile/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { LenderDashboard } from './pages/LenderDashboard';
import { LenderReviewPage } from './pages/LenderReviewPage';
import { FinancingCalculator } from './components/financing/FinancingCalculator';
import { GovernmentSchemesPage } from './pages/GovernmentSchemesPage';
import { BusinessModelPage } from './pages/BusinessModelPage';
import { CostModelPage } from './pages/CostModelPage';
import { ArchitecturePage } from './pages/ArchitecturePage';
import { TargetAudiencePage } from './pages/TargetAudiencePage';
import { ImpactPage } from './pages/ImpactPage';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <DemoBanner />
      <Navbar />
      <main className="flex-1 pb-16 lg:pb-0">{children}</main>
      <Footer />
      <MobileNav />
      <VoiceModal />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/landing" element={<Layout><LandingPage /></Layout>} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/dashboard" element={<Layout><MSMEDashboard /></Layout>} />
            <Route path="/msme/dashboard" element={<Layout><MSMEDashboard /></Layout>} />
            <Route path="/invoices" element={<Layout><InvoicesPage /></Layout>} />
            <Route path="/pool" element={<Layout><InvoicePoolPage /></Layout>} />
            <Route path="/eligibility" element={<Layout><EligibilityPage /></Layout>} />
            <Route path="/risk" element={<Layout><RiskAnalysisPage /></Layout>} />
            <Route path="/financing" element={<Layout><FinancingHistoryPage /></Layout>} />
            <Route path="/history" element={<Layout><FinancingHistoryPage /></Layout>} />
            <Route path="/documents" element={<Layout><DocumentsPage /></Layout>} />
            <Route path="/kyc" element={<Layout><KYCPage /></Layout>} />
            <Route path="/analytics" element={<Layout><AnalyticsPage /></Layout>} />
            <Route path="/assistant" element={<Layout><AIAssistantPage /></Layout>} />
            <Route path="/goals" element={<Layout><FinancialGoalsPage /></Layout>} />
            <Route path="/profile" element={<Layout><ProfilePage /></Layout>} />
            <Route path="/settings" element={<Layout><SettingsPage /></Layout>} />
            <Route path="/calculator" element={<Layout><div className="max-w-7xl mx-auto px-4 py-8"><FinancingCalculator /></div></Layout>} />
            <Route path="/lender" element={<Layout><LenderDashboard /></Layout>} />
            <Route path="/lender/dashboard" element={<Layout><LenderDashboard /></Layout>} />
            <Route path="/lender/review" element={<Layout><LenderReviewPage /></Layout>} />
            <Route path="/government-schemes" element={<Layout><GovernmentSchemesPage /></Layout>} />
            <Route path="/business-model" element={<Layout><BusinessModelPage /></Layout>} />
            <Route path="/cost-model" element={<Layout><CostModelPage /></Layout>} />
            <Route path="/architecture" element={<Layout><ArchitecturePage /></Layout>} />
            <Route path="/target-audience" element={<Layout><TargetAudiencePage /></Layout>} />
            <Route path="/impact" element={<Layout><ImpactPage /></Layout>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AppProvider>
    </AuthProvider>
  );
};

export default App;
