import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function UserProfile({ token, onLogout }) {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setUser(res.data);
      setEmail(res.data.email);
      setConsent(res.data.consent);
    }).catch(() => {
      onLogout();
    });
  }, [token, onLogout]);

  const update = async () => {
    try {
      await axios.put('http://localhost:5000/api/auth/me', { email, consent }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Profile updated');
    } catch {
      setMessage('Update failed');
    }
  };

  const del = async () => {
    try {
      await axios.delete('http://localhost:5000/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      onLogout();
    } catch {
      setMessage('Delete failed');
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h3>Your Profile</h3>
      <label>
        Email: <input value={email} onChange={e => setEmail(e.target.value)} />
      </label><br />
      <label>
        <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} />
        Consent to data processing
      </label><br />
      <button onClick={update}>Update</button>
      <button onClick={del} style={{ marginLeft: 10, color: 'red' }}>Delete Account</button>
      <p>{message}</p>
    </div>
  );
}
