import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Setup2FA from './Setup2FA';
import Verify2FA from './Verify2FA';

function App() {
  const [stage, setStage] = useState('login');
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const handleRegistered = (id) => {
    setUserId(id);
    setStage('setup-2fa');
  };

  const handleRequire2FA = (id) => {
    setUserId(id);
    setStage('verify-2fa');
  };

  const handleLoggedIn = (token) => {
  localStorage.setItem('token', token);
  setToken(token);
  setStage('dashboard');
};


  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setStage('login');
    setUserId(null);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>MERN 2FA Authentication</h1>
      <p>Current stage: {stage}</p>

      {stage === 'login' && <LoginForm onRequire2FA={handleRequire2FA} onLoggedIn={handleLoggedIn} />}
      {stage === 'register' && <RegisterForm onRegistered={handleRegistered} />}
      {stage === 'setup-2fa' && userId && (
      <Setup2FA userId={userId} onNext={() => setStage('verify-2fa')} />
      )}
      {stage === 'verify-2fa' && userId && (
      <Verify2FA userId={userId} onVerified={handleLoggedIn} />
      )}
      {stage === 'dashboard' && token && (
        <>
          <h2>Logged in!</h2>
          <button onClick={logout}>Logout</button>
        </>
      )}

      {stage === 'login' && <p>Don't have account? <button onClick={() => setStage('register')}>Register</button></p>}
      {stage === 'register' && <p>Have account? <button onClick={() => setStage('login')}>Login</button></p>}
    </div>
  );
}

export default App;
