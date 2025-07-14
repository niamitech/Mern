import React from 'react';

function Dashboard({ user }) {
  return (
    <div>
      <h2>Dashboard</h2>
      {user ? (
        <>
          <p>Welcome, user ID: {user.userId}</p>
          <p>Message: {user.message}</p>
        </>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
}

export default Dashboard;
