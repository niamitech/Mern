import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function UserProfile({ token, onLogout }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => {
      setUser(res.data);
    }).catch(() => {
      onLogout();
    });
  }, [token, onLogout]);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h3>Welcome, {user.email}</h3>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}
