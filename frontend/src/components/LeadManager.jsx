// src/components/LeadManager.jsx
import React, { useState, useRef } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

function LeadManager() {
  const [lead, setLead] = useState({ name: '', email: '', source: '' });
  const [message, setMessage] = useState('');
  const fileInputRef = useRef();

  const handleChange = (e) => {
    setLead({ ...lead, [e.target.name]: e.target.value });
  };

  const submitLead = async () => {
    try {
      const res = await axios.post(`${API}/api/leads`, lead);
      setMessage('✅ Lead submitted successfully');
    } catch (err) {
      setMessage('❌ Failed to submit lead');
    }
  };

  const handleImport = async () => {
    const file = fileInputRef.current.files[0];
    if (!file) return alert('Select a CSV or Excel file');

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post(`${API}/api/leads/import`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage('✅ Leads imported successfully');
    } catch (err) {
      setMessage('❌ Import failed');
    }
  };

  const handleExport = async () => {
    try {
      const res = await axios.get(`${API}/api/leads/export`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'leads.csv'); // or .xlsx
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      setMessage('❌ Export failed');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📋 Lead Form</h2>
      <input name="name" placeholder="Name" value={lead.name} onChange={handleChange} />
      <input name="email" placeholder="Email" value={lead.email} onChange={handleChange} />
      <input name="source" placeholder="Source" value={lead.source} onChange={handleChange} />
      <button onClick={submitLead}>Submit Lead</button>

      <hr />

      <h3>📥 Import Leads</h3>
      <input type="file" ref={fileInputRef} accept=".csv,.xlsx" />
      <button onClick={handleImport}>Import</button>

      <h3>📤 Export Leads</h3>
      <button onClick={handleExport}>Export</button>

      <p>{message}</p>
    </div>
  );
}

export default LeadManager;
