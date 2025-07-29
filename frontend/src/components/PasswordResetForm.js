import React, { useState } from 'react';
import axios from 'axios';

export default function PasswordResetForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/request-reset', { email });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error sending reset email');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Reset Password</h2>
      <input type="email" placeholder="Enter your email" onChange={e => setEmail(e.target.value)} required />
      <button type="submit">Send Reset Email</button>
      <p>{message}</p>
    </form>
  );
}
