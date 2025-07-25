import React, { useState, useEffect } from 'react';

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');

  // Check URL on load for token (after OAuth redirect)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get('token');
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
      // Decode token payload (simple decode without validation)
      const payload = JSON.parse(atob(tokenFromUrl.split('.')[1]));
      setUser(payload);
      // Clean URL params
      window.history.replaceState({}, document.title, "/");
    }
  }, []);

  const loginUrl = 'http://localhost:5000/auth/google';

  const logout = () => {
    setUser(null);
    setToken('');
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <h1>Social Login with Google OAuth</h1>

      {!user ? (
        <a href={loginUrl}>
          <button>Login with Google</button>
        </a>
      ) : (
        <div>
          <h2>Welcome, {user.displayName}</h2>
          {user.photos && user.photos.length > 0 && (
            <img src={user.photos[0].value} alt="Profile" width={80} style={{ borderRadius: '50%' }} />
          )}
          <p>Email: {user.emails?.[0]?.value}</p>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default App;
