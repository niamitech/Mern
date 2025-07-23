import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/leads').then(res => setLeads(res.data));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold">All Leads</h2>
      <table border="1" className="w-full">
        <thead>
          <tr><th>Name</th><th>Email</th><th>Source</th><th>Score</th></tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id}>
              <td>{lead.name}</td>
              <td>{lead.email}</td>
              <td>{lead.source}</td>
              <td>{lead.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
