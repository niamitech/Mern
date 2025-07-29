import React, { useState } from 'react';
import axios from './axiosConfig';

export default function RegisterForm({ onRegistered }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const register = async () => {
    try {
      const res = await axios.post('/api/auth/register', { email, password });
      onRegistered(res.data.userId);
    } catch {
      alert('Registration failed');
    }
  };
  return (
    <div>
      <h3>Register</h3>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={register}>Register</button>
    </div>
  );
}
