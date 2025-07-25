import React, { useEffect, useState } from 'react';

const backendURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${backendURL}/api/leads`);
      const data = await res.json();
      setLeads(data);
    } catch (error) {
      alert('Failed to load leads');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Incoming Leads</h1>
      <button onClick={fetchLeads} disabled={loading}>
        {loading ? 'Loading...' : 'Refresh Leads'}
      </button>
      <table border="1" cellPadding="10" style={{ marginTop: 20, borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Phone</th><th>Source</th><th>Received At</th>
          </tr>
        </thead>
        <tbody>
          {leads.length === 0 ? (
            <tr><td colSpan="5">No leads yet</td></tr>
          ) : (
            leads.map(lead => (
              <tr key={lead._id}>
                <td>{lead.name || '-'}</td>
                <td>{lead.email}</td>
                <td>{lead.phone || '-'}</td>
                <td>{lead.source || '-'}</td>
                <td>{new Date(lead.createdAt).toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
