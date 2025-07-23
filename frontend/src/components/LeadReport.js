import React, { useState } from 'react';
import axios from 'axios';

export default function LeadReport() {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [leads, setLeads] = useState([]);

  const fetchReport = async () => {
    const res = await axios.get(`http://localhost:5000/api/reports/lead-report?start=${start}&end=${end}`);
    setLeads(res.data);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold">Lead Report</h2>
      <input type="date" onChange={(e) => setStart(e.target.value)} />
      <input type="date" onChange={(e) => setEnd(e.target.value)} />
      <button onClick={fetchReport}>Get Report</button>

      <table border="1" className="w-full mt-2">
        <thead><tr><th>Name</th><th>Email</th><th>Date</th></tr></thead>
        <tbody>
          {leads.map(lead => (
            <tr key={lead._id}>
              <td>{lead.name}</td>
              <td>{lead.email}</td>
              <td>{new Date(lead.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
