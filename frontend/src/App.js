import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LeadReport from './components/LeadReport';

const API = process.env.REACT_APP_API_URL;

function App() {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    axios.get(`${API}/api/status`)
      .then((res) => {
        setStatus(res.data);
      })
      .catch((err) => {
        setStatus({ success: false, message: "Failed to fetch API status" });
      });
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>MERN Stack Health Check</h1>
      {status ? (
        <div>
          <p><strong>Status:</strong> {status.success ? '✅ OK' : '❌ Failed'}</p>
          <p><strong>Message:</strong> {status.message}</p>
          <p><strong>Time:</strong> {new Date(status.timestamp).toLocaleString()}</p>
        </div>
      ) : (
        <p>Loading API status...</p>
      )}

      <hr style={{ margin: '2rem 0' }} />

      {/* <h2>📊 Real-time Lead Report</h2> */}
      <LeadReport />
    </div>
  );
}

export default App;
