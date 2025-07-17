import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function LeadList() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    axios.get('/api/leads').then(res => setLeads(res.data));
  }, []);

  return (
    <div>
      <h2>All Leads</h2>
      {leads.map(lead => (
        <div key={lead._id} className="border p-2 mb-2">
          <p><strong>{lead.name}</strong> ({lead.email})</p>
          <p>Source: {lead.source} | Score: {lead.score}</p>
          <p>Tags: {lead.tags?.join(', ')}</p>
        </div>
      ))}
    </div>
  );
}
