import React, { useState } from 'react';

const API_BASE = 'http://localhost:5000/api';

function App() {
  const [email, setEmail] = useState('');
  const [result, setResult] = useState(null);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const enrichLead = async () => {
    setMsg('');
    setResult(null);
    if (!email) {
      setMsg('Please enter an email');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/enrich`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to enrich lead');
      }

      setResult(data.enrichedData);
      setMsg('Enrichment successful!');
    } catch (err) {
      setMsg(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <h1>Lead Data Enrichment with Clearbit</h1>
      <input
        type="email"
        placeholder="Enter lead email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: 8, width: 300, marginRight: 10 }}
      />
      <button onClick={enrichLead} disabled={loading}>
        {loading ? 'Enriching...' : 'Enrich Lead'}
      </button>

      {msg && <p>{msg}</p>}

      {result && (
        <div style={{ marginTop: 20, maxWidth: 600, background: '#f9f9f9', padding: 15, borderRadius: 5 }}>
          <h3>Enriched Lead Data:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
