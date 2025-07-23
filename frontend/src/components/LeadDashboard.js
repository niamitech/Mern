import React, { useEffect, useState } from "react";

function LeadDashboard() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/leads")
      .then(res => res.json())
      .then(data => setLeads(data));
  }, []);

  return (
    <div>
      <h2>📋 All Leads (Sorted by Score)</h2>
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Source</th><th>Date</th><th>Score</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead, i) => (
            <tr key={i}>
              <td>{lead.name}</td>
              <td>{lead.email}</td>
              <td>{lead.source}</td>
              <td>{new Date(lead.date).toLocaleDateString()}</td>
              <td>{lead.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeadDashboard;
