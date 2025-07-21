import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LeadManager from './components/LeadManager';

const API = process.env.REACT_APP_API_URL;

function App() {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    axios.get(`${API}/api/status`)
      .then((res) => {
        setStatus({
          success: true,
          message: res.data.status,
          timestamp: new Date().toISOString()
        });
      })
      .catch(() => {
        setStatus({
          success: false,
          message: 'Failed to fetch API status',
          timestamp: new Date().toISOString()
        });
      });
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>MERN Stack Health Check</h1>
      {status ? (
        <div style={{ marginBottom: '2rem' }}>
          <p><strong>Status:</strong> {status.success ? '✅ OK' : '❌ Failed'}</p>
          <p><strong>Message:</strong> {status.message}</p>
          <p><strong>Time:</strong> {new Date(status.timestamp).toLocaleString()}</p>
        </div>
      ) : (
        <p>Loading API status...</p>
      )}

      <LeadManager />
    </div>
  );
}

export default App;
