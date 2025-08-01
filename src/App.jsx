import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import InfluencerDiscovery from './pages/InfluencerDiscovery';
import CampaignManagement from './pages/CampaignManagement';
import PaymentManagement from './pages/PaymentManagement';
import Analytics from './pages/Analytics';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <div className="app">
            <Header />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/discovery" element={<InfluencerDiscovery />} />
              <Route path="/campaigns" element={<CampaignManagement />} />
              <Route path="/payments" element={<PaymentManagement />} />
              <Route path="/analytics" element={<Analytics />} />
            </Routes>
          </div>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;