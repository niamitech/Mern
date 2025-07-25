import React from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';

const ExportButtons = () => {
  const downloadCSV = async () => {
    try {
      const res = await axios.get('/api/leads/export/csv', { responseType: 'blob' });
      const blob = new Blob([res.data], { type: 'text/csv;charset=utf-8;' });
      saveAs(blob, 'leads_report.csv');
    } catch (err) {
      console.error('Error downloading CSV', err);
    }
  };

  const downloadPDF = async () => {
    try {
      const res = await axios.get('/api/leads/export/pdf', { responseType: 'blob' });
      const blob = new Blob([res.data], { type: 'application/pdf' });
      saveAs(blob, 'leads_report.pdf');
    } catch (err) {
      console.error('Error downloading PDF', err);
    }
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <button onClick={downloadCSV} style={{ marginRight: '10px' }}>Download CSV</button>
      <button onClick={downloadPDF}>Download PDF</button>
    </div>
  );
};

export default ExportButtons;
