import React from 'react';

const API_BASE = 'http://localhost:5000/api';

function App() {
  const downloadExcel = async () => {
    try {
      const response = await fetch(`${API_BASE}/export/excel`);
      if (!response.ok) throw new Error('Failed to download file');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'leads.xlsx';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <h1>Export Leads to Excel</h1>
      <button onClick={downloadExcel}>Download Leads Excel</button>
    </div>
  );
}

export default App;
