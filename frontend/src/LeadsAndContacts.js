// frontend/src/LeadsAndContacts.js

import React, { useEffect, useState } from 'react';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default function LeadsAndContacts() {
  const [leads, setLeads] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchLeads() {
    try {
      const res = await fetch(`${API}/api/leads`);
      if (!res.ok) throw new Error('Failed to fetch leads');
      const data = await res.json();
      setLeads(data);
    } catch (err) {
      setError(err.message);
    }
  }

  async function fetchContacts() {
    try {
      const res = await fetch(`${API}/api/contacts`);
      if (!res.ok) throw new Error('Failed to fetch contacts');
      const data = await res.json();
      setContacts(data);
    } catch (err) {
      setError(err.message);
    }
  }

  async function refreshData() {
    setLoading(true);
    setError(null);
    await Promise.all([fetchLeads(), fetchContacts()]);
    setLoading(false);
  }

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Leads and Contacts</h1>
      <button onClick={refreshData} disabled={loading}>
        {loading ? 'Loading...' : 'Refresh'}
      </button>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      <h2>Leads</h2>
      <table border="1" cellPadding="5" style={{ width: '100%', marginBottom: 40 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Company</th>
            <th>Source</th>
          </tr>
        </thead>
        <tbody>
          {leads.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>
                No leads found.
              </td>
            </tr>
          )}
          {leads.map((lead) => (
            <tr key={lead._id}>
              <td>{lead.name}</td>
              <td>{lead.email}</td>
              <td>{lead.phone}</td>
              <td>{lead.company}</td>
              <td>{lead.source}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Contacts</h2>
      <table border="1" cellPadding="5" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {contacts.length === 0 && (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>
                No contacts found.
              </td>
            </tr>
          )}
          {contacts.map((contact) => (
            <tr key={contact._id}>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>{contact.company}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
