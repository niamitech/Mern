import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CRM from './components/CRM';
import LeadForm from './components/LeadForm';

function App() {
  return (
    <Router>
      <nav style={{ padding: '1rem', background: '#eee' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
        <Link to="/lead-form" style={{ marginRight: '1rem' }}>Add Lead</Link>
        <Link to="/crm">CRM</Link>
      </nav>
      <Routes>
        <Route path="/" element={<h2 style={{ padding: '2rem' }}>Welcome to the Lead System</h2>} />
        <Route path="/lead-form" element={<LeadForm />} />
        <Route path="/crm" element={<CRM />} />
      </Routes>
    </Router>
  );
}

export default App;
