import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

function CRM() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [page, setPage] = useState(1);
  const [selectedLead, setSelectedLead] = useState(null);

  const fetchLeads = async () => {
    const res = await axios.get(`${API}/api/leads`, {
      params: { search, sortBy, page }
    });
    setLeads(res.data);
  };

  useEffect(() => {
    fetchLeads();
  }, [search, sortBy, page]);

  const deleteLead = async (id) => {
    await axios.delete(`${API}/api/leads/${id}`);
    fetchLeads();
  };

  const totalPages = 5;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Lead Management (CRM)</h2>

      <input
        type="text"
        placeholder="Search leads..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginRight: '1rem' }}
      />

      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="createdAt">Newest</option>
        <option value="name">Name</option>
        <option value="score">Score</option>
      </select>

      <table border="1" cellPadding="10" style={{ width: '100%', marginTop: '1rem' }}>
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Score</th><th>Source</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map(lead => (
            <tr key={lead._id}>
              <td>{lead.name}</td>
              <td>{lead.email}</td>
              <td>{lead.score}</td>
              <td>{lead.source}</td>
              <td>
                <button onClick={() => setSelectedLead(lead)}>View</button>
                <button onClick={() => deleteLead(lead._id)} style={{ marginLeft: '0.5rem' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '1rem' }}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i} onClick={() => setPage(i + 1)} style={{ margin: '0 5px' }}>
            {i + 1}
          </button>
        ))}
      </div>

      {selectedLead && (
        <div style={{ marginTop: '2rem', border: '1px solid #ccc', padding: '1rem' }}>
          <h3>Lead Detail</h3>
          <p><strong>Name:</strong> {selectedLead.name}</p>
          <p><strong>Email:</strong> {selectedLead.email}</p>
          <p><strong>Phone:</strong> {selectedLead.phone}</p>
          <p><strong>Source:</strong> {selectedLead.source}</p>
          <p><strong>Message:</strong> {selectedLead.message}</p>
          <p><strong>Score:</strong> {selectedLead.score}</p>
          <button onClick={() => setSelectedLead(null)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default CRM;
