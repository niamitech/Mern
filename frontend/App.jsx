import React from "react";
import LeadAnalyticsDashboard from "./components/LeadAnalyticsDashboard";
import AnalyticsDashboard from './pages/AnalyticsDashboard';

// Inside Routes
<Route path="/analytics" element={<AnalyticsDashboard />} />

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <LeadAnalyticsDashboard />
    </div>
  );
}

export default App;
