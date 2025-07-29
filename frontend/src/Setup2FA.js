// src/Setup2FA.js
import React, { useEffect, useState } from 'react';
import axios from './axiosConfig';

export default function Setup2FA({ userId, onNext }) {
  const [qrCode, setQrCode] = useState('');

  useEffect(() => {
    axios.post('/api/auth/2fa/setup', { userId })
      .then(res => setQrCode(res.data.qrCode))
      .catch(() => alert('Error generating QR code'));
  }, [userId]);

  return (
    <div>
      <h3>Scan this QR Code using Google Authenticator</h3>
      {qrCode ? <img src={qrCode} alt="2FA QR Code" /> : <p>Loading...</p>}
      <br />
      <button onClick={onNext}>I have scanned the QR code</button>
    </div>
  );
}
