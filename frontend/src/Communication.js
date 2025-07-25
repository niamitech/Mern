import React, { useState } from 'react';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default function Communication() {
  const [phone, setPhone] = useState('');
  const [smsMessage, setSmsMessage] = useState('');
  const [email, setEmail] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailText, setEmailText] = useState('');
  const [status, setStatus] = useState('');

  async function handleSendSMS() {
    setStatus('Sending SMS...');
    try {
      const res = await fetch(`${API}/api/communication/send-sms`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, message: smsMessage }),
      });
      const data = await res.json();
      setStatus(res.ok ? `SMS sent! SID: ${data.sid}` : `Error: ${data.error}`);
    } catch {
      setStatus('Failed to send SMS');
    }
  }

  async function handleSendEmail() {
    setStatus('Sending Email...');
    try {
      const res = await fetch(`${API}/api/communication/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, subject: emailSubject, text: emailText }),
      });
      const data = await res.json();
      setStatus(res.ok ? 'Email sent!' : `Error: ${data.error}`);
    } catch {
      setStatus('Failed to send Email');
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Send SMS to Lead</h2>
      <input
        placeholder="Phone (+1234567890)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={{ marginRight: 10, width: 200 }}
      />
      <input
        placeholder="Message"
        value={smsMessage}
        onChange={(e) => setSmsMessage(e.target.value)}
        style={{ marginRight: 10, width: 400 }}
      />
      <button onClick={handleSendSMS}>Send SMS</button>

      <h2 style={{ marginTop: 40 }}>Send Email to Lead</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginRight: 10, width: 300 }}
      />
      <input
        placeholder="Subject"
        value={emailSubject}
        onChange={(e) => setEmailSubject(e.target.value)}
        style={{ marginRight: 10, width: 400 }}
      />
      <textarea
        placeholder="Email Text"
        value={emailText}
        onChange={(e) => setEmailText(e.target.value)}
        rows={4}
        style={{ display: 'block', width: '720px', marginTop: 10 }}
      />

      <button onClick={handleSendEmail} style={{ marginTop: 10 }}>
        Send Email
      </button>

      {status && <p style={{ marginTop: 20 }}>{status}</p>}
    </div>
  );
}
