import React, { useState } from 'react';
import axios from './axiosConfig';

export default function Verify2FA({ userId, onVerified }) {
  const [token, setToken] = useState('');

  const verify = async () => {
    try {
      const res = await axios.post('/api/auth/2fa/verify', { userId, token });
      onVerified(res.data.token);
    } catch {
      alert('Invalid 2FA code');
    }
  };

  return (
    <div>
      <h3>Enter 2FA Code</h3>
      <input
        placeholder="6-digit code"
        value={token}
        onChange={e => setToken(e.target.value)}
      />
      <button onClick={verify}>Verify</button>
    </div>
  );
}
