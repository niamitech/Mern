import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); // backend URL

function App() {
  const [notifications, setNotifications] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitMsg, setSubmitMsg] = useState('');

  useEffect(() => {
    // Listen for newLead events
    socket.on('newLead', (lead) => {
      setNotifications((prev) => [lead, ...prev]);
    });

    return () => {
      socket.off('newLead');
    };
  }, []);

  const createLead = async (e) => {
    e.preventDefault();
    setSubmitMsg('');
    if (!name || !email) {
      setSubmitMsg('Please enter name and email');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to create lead');

      setSubmitMsg(`Lead created with ID ${data.lead.id}`);
      setName('');
      setEmail('');
    } catch (err) {
      setSubmitMsg(err.message);
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <h1>Real-time Leads Notifications</h1>

      <form onSubmit={createLead} style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          style={{ marginRight: 10, padding: 5 }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ marginRight: 10, padding: 5 }}
        />
        <button type="submit">Create Lead</button>
      </form>

      {submitMsg && <p>{submitMsg}</p>}

      <h2>Notifications</h2>
      {notifications.length === 0 && <p>No leads yet.</p>}

      <ul>
        {notifications.map(lead => (
          <li key={lead.id}>
            New lead: <strong>{lead.name}</strong> ({lead.email}) at {new Date(lead.createdAt).toLocaleTimeString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
