import React, { useState } from 'react';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import UserProfile from './UserProfile';
import axios from 'axios';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [view, setView] = useState(token ? 'profile' : 'login');

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setView('login');
  };

  const handleLogin = async (email, password) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      setView('profile');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Secure Password Hashing Demo</h2>

      {!token && (
        <>
          {view === 'login' && (
            <>
              <LoginForm onLogin={handleLogin} />
              <p>
                Don't have an account?{' '}
                <button onClick={() => setView('register')}>Register</button>
              </p>
            </>
          )}
          {view === 'register' && (
            <>
              <RegisterForm onRegisterSuccess={() => setView('login')} />
              <p>
                Already registered?{' '}
                <button onClick={() => setView('login')}>Login</button>
              </p>
            </>
          )}
        </>
      )}

      {token && <UserProfile token={token} onLogout={logout} />}
    </div>
  );
}

export default App;
