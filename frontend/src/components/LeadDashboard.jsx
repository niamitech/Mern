import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

const LeadDashboard = () => {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    axios.get(`${API}/api/leads`)
      .then((res) => setLeads(res.data))
      .catch(() => alert('Failed to load leads'));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Leads Dashboard</h2>
      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Source</th>
            <th>Score</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id}>
              <td>{lead.name}</td>
              <td>{lead.email}</td>
              <td>{lead.source}</td>
              <td>{lead.score || 'N/A'}</td>
              <td>{new Date(lead.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadDashboard;
