import React, { useState } from 'react';
import axios from 'axios';

export default function RegisterForm({ onRegisterSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [consent, setConsent] = useState(false);
  const [message, setMessage] = useState('');

  const register = async () => {
    if (!consent) {
      setMessage('You must consent to proceed.');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/auth/register', { email, password, consent });
      setMessage('Registered successfully! Please login.');
      onRegisterSuccess && onRegisterSuccess();
    } catch (e) {
      setMessage(e.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div>
      <h3>Register</h3>
      <input
        placeholder="Email"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      /><br />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      /><br />
      <label>
        <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} />
        I consent to the processing of my data.
      </label><br />
      <button onClick={register}>Register</button>
      <p>{message}</p>
    </div>
  );
}
