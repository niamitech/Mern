import React, { useEffect, useState } from 'react';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [leads, setLeads] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [leadsRes, contactsRes, campaignsRes] = await Promise.all([
        fetch(`${API}/api/leads`),
        fetch(`${API}/api/contacts`),
        fetch(`${API}/api/campaigns`)
      ]);
      setLeads(await leadsRes.json());
      setContacts(await contactsRes.json());
      setCampaigns(await campaignsRes.json());
    } catch (e) {
      alert('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1>Dashboard</h1>
      <button onClick={fetchAll} disabled={loading} style={{ marginBottom: 20 }}>
        {loading ? 'Loading...' : 'Refresh All'}
      </button>

      {/* Leads Table */}
      <section>
        <h2>Leads</h2>
        {leads.length === 0 ? (
          <p>No leads available.</p>
        ) : (
          <table border="1" cellPadding="8" cellSpacing="0" style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead style={{ backgroundColor: '#eee' }}>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Source</th>
                <th>Received At</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead._id}>
                  <td>{lead.name || '-'}</td>
                  <td>{lead.email}</td>
                  <td>{lead.phone || '-'}</td>
                  <td>{lead.source || '-'}</td>
                  <td>{new Date(lead.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Contacts Table */}
      <section style={{ marginTop: 40 }}>
        <h2>Contacts</h2>
        {contacts.length === 0 ? (
          <p>No contacts available.</p>
        ) : (
          <table border="1" cellPadding="8" cellSpacing="0" style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead style={{ backgroundColor: '#eee' }}>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Company</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact._id}>
                  <td>{contact.name || '-'}</td>
                  <td>{contact.email}</td>
                  <td>{contact.phone || '-'}</td>
                  <td>{contact.company || '-'}</td>
                  <td>{new Date(contact.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Campaigns Table */}
      <section style={{ marginTop: 40 }}>
        <h2>Campaigns</h2>
        {campaigns.length === 0 ? (
          <p>No campaigns available.</p>
        ) : (
          <table border="1" cellPadding="8" cellSpacing="0" style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead style={{ backgroundColor: '#eee' }}>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Budget</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign) => (
                <tr key={campaign._id}>
                  <td>{campaign.name || '-'}</td>
                  <td>{campaign.description || '-'}</td>
                  <td>{campaign.startDate ? new Date(campaign.startDate).toLocaleDateString() : '-'}</td>
                  <td>{campaign.endDate ? new Date(campaign.endDate).toLocaleDateString() : '-'}</td>
                  <td>${campaign.budget?.toLocaleString() || '-'}</td>
                  <td>{new Date(campaign.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

export default App;
