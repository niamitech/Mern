import React, { useState } from 'react';
import axios from './axiosConfig';
export default function LoginForm({ onRequire2FA, onLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = async () => {
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      if (res.data.requires2FA) {
        onRequire2FA(res.data.userId);
      } else {
        onLoggedIn(res.data.token);
      }
    } catch {
      alert('Login failed');
    }
  };
  return (
    <div>
      <h3>Login</h3>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
    </div>
  );
}
