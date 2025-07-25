import React, { useState } from 'react';

const API_BASE = 'http://localhost:5000/api';

function App() {
  // For demo, a static leadId (could be dynamic in real app)
  const leadId = 'lead123';

  const [events, setEvents] = useState([]);
  const [msg, setMsg] = useState('');

  // Helper: send behavior event to backend
  const trackBehavior = async (eventType, details = {}) => {
    setMsg('');
    try {
      const res = await fetch(`${API_BASE}/behavior`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId, eventType, details }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to track event');
      setMsg(`Tracked event: ${eventType}`);
    } catch (err) {
      setMsg(`Error: ${err.message}`);
    }
  };

  // Load all tracked events for this lead
  const loadEvents = async () => {
    try {
      const res = await fetch(`${API_BASE}/behavior/${leadId}`);
      const data = await res.json();
      setEvents(data.events || []);
    } catch {
      setEvents([]);
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <h1>Lead Behavior Tracking Demo</h1>
      <p>Lead ID: {leadId}</p>

      <div style={{ marginBottom: 10 }}>
        <button onClick={() => trackBehavior('page_view', { page: 'landing' })}>
          Track Page View
        </button>
        <button onClick={() => trackBehavior('button_click', { buttonId: 'signup' })} style={{ marginLeft: 10 }}>
          Track Button Click
        </button>
        <button onClick={() => trackBehavior('form_submit', { formId: 'lead_capture' })} style={{ marginLeft: 10 }}>
          Track Form Submit
        </button>
      </div>

      <button onClick={loadEvents}>Load Tracked Events</button>

      {msg && <p>{msg}</p>}

      <h2>Tracked Events</h2>
      {events.length === 0 ? (
        <p>No events tracked yet.</p>
      ) : (
        <ul>
          {events.map((event, i) => (
            <li key={i}>
              <strong>{event.eventType}</strong> at {new Date(event.timestamp).toLocaleTimeString()} -{' '}
              {JSON.stringify(event.details)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
