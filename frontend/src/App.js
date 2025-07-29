import React, { useState } from 'react';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import PasswordResetForm from './components/PasswordResetForm';

export default function App() {
  const [stage, setStage] = useState('login');
  const [user, setUser] = useState(null);

  const onLoginSuccess = data => {
    setUser(data);
  };

  if (user) {
    return (
      <div>
        <h1>Welcome, {user.username}</h1>
        <button onClick={() => { setUser(null); setStage('login'); }}>Logout</button>
      </div>
    );
  }

  return (
    <div>
      {stage === 'login' && (
        <>
          <LoginForm onLoginSuccess={onLoginSuccess} />
          <p>
            Don't have an account? <button onClick={() => setStage('register')}>Register</button>
          </p>
          <p>
            Forgot password? <button onClick={() => setStage('reset')}>Reset Password</button>
          </p>
        </>
      )}
      {stage === 'register' && (
        <>
          <RegisterForm onRegistered={() => setStage('login')} />
          <p>
            Already have an account? <button onClick={() => setStage('login')}>Login</button>
          </p>
        </>
      )}
      {stage === 'reset' && (
        <>
          <PasswordResetForm />
          <p>
            Remembered password? <button onClick={() => setStage('login')}>Login</button>
          </p>
        </>
      )}
    </div>
  );
}
