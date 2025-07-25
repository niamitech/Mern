import React, { useState } from 'react';

function App() {
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const fetchData = async () => {
    setError('');
    setResponse('');
    try {
      const res = await fetch('http://localhost:5000/api/data');
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Error fetching data');
      }
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>API Rate Limiting Demo</h1>
      <button onClick={fetchData}>Fetch Data from API</button>

      {response && (
        <pre
          style={{
            background: '#f0f0f0',
            padding: '1rem',
            marginTop: '1rem',
            borderRadius: '5px',
          }}
        >
          {response}
        </pre>
      )}

      {error && (
        <p style={{ color: 'red', marginTop: '1rem' }}>
          Error: {error}
        </p>
      )}

      <p style={{ marginTop: '2rem', color: '#666' }}>
        You can only make 10 requests per 15 minutes.
      </p>
    </div>
  );
}

export default App;
