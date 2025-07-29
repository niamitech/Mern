import React, { useState } from 'react';
import RegisterForm from './RegisterForm';
import UserProfile from './UserProfile';
import axios from 'axios';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [view, setView] = useState(token ? 'profile' : 'register');

  // Logout handler
  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setView('register');
  };

  // Simple login handler for demo (you can replace with a proper login form)
  const login = async (email, password) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      setView('profile');
    } catch (e) {
      alert(e.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>MERN GDPR-Compliant Auth</h2>

      {!token && (
        <>
          {view === 'register' && (
            <>
              <RegisterForm onRegisterSuccess={() => setView('login')} />
              <p>
                Already registered?{' '}
                <button onClick={() => setView('login')}>Login</button>
              </p>
            </>
          )}

          {view === 'login' && (
            <>
              <LoginForm onLogin={login} />
              <p>
                Don't have an account?{' '}
                <button onClick={() => setView('register')}>Register</button>
              </p>
            </>
          )}
        </>
      )}

      {token && (
        <>
          <UserProfile token={token} onLogout={logout} />
          <button onClick={logout} style={{ marginTop: 10 }}>
            Logout
          </button>
        </>
      )}
    </div>
  );
}

// Simple LoginForm component for demo:
function LoginForm({ onLogin }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const submit = e => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <form onSubmit={submit}>
      <h3>Login</h3>
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
      <button type="submit">Login</button>
    </form>
  );
}

export default App;
