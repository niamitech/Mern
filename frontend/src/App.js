import React from 'react';
import LeadForm from './components/LeadForm';
import Dashboard from './components/Dashboard';
import LeadReport from './components/LeadReport';
import Recommendations from './components/Recommendations';

function App() {
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-3xl font-bold">Lead Management Dashboard</h1>
      <LeadForm />
      <Dashboard />
      <LeadReport />
      <Recommendations />
    </div>
  );
}

export default App;
