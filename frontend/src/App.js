import React from 'react';
import LeadsAndContacts from './LeadsAndContacts';
import Communication from './Communication';

function App() {
  return (
    <div style={{ maxWidth: 900, margin: 'auto', padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1>Marketing Dashboard</h1>
      <LeadsAndContacts />
      <Communication />
    </div>
  );
}

export default App;
