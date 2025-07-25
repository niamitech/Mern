import React from 'react';
import Heatmap from './Heatmap';
import ExportButtons from './ExportButtons';
import CampaignsDashboard from './CampaignsDashboard';

function App() {
  return (
    <div>
      <h1>Lead & Campaign Analytics</h1>
      <ExportButtons />
      <Heatmap />
      <CampaignsDashboard />
    </div>
  );
}

export default App;
