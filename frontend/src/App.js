import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import LeadForm from './components/LeadForm';

const API = process.env.REACT_APP_API_URL;

function Home() {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    axios.get(`${API}/api/status`)
      .then((res) => {
        setStatus(res.data);
      })
      .catch(() => {
        setStatus({ success: false, message: "Failed to fetch API status" });
      });
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
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
      <br />
      <Link to="/lead-form">Submit a Lead</Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lead-form" element={<LeadForm />} />
      </Routes>
    </Router>
  );
}

export default App;
