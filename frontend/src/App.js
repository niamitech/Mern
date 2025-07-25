import React, { useState } from 'react';

const backendURL = 'http://localhost:5000';

function App() {
  const [googleCampaigns, setGoogleCampaigns] = useState(null);
  const [facebookCampaigns, setFacebookCampaigns] = useState(null);
  const [linkedinCampaigns, setLinkedinCampaigns] = useState(null);

  // Step 1: Authenticate (Get auth code from OAuth flow)
  // For demo, prompt user to paste auth code

  const handleGoogleAuth = async () => {
    const code = prompt('Paste Google OAuth authorization code:');
    if (!code) return alert('Auth code required');

    const res = await fetch(`${backendURL}/api/google/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });
    const data = await res.json();
    if (data.success) alert('Google Ads authenticated!');
    else alert('Google Auth failed: ' + data.error);
  };

  const fetchGoogleCampaigns = async () => {
    const res = await fetch(`${backendURL}/api/google/campaigns`);
    const data = await res.json();
    setGoogleCampaigns(data);
  };

  const handleFacebookAuth = async () => {
    const code = prompt('Paste Facebook OAuth authorization code:');
    if (!code) return alert('Auth code required');

    const res = await fetch(`${backendURL}/api/facebook/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });
    const data = await res.json();
    if (data.success) alert('Facebook Ads authenticated!');
    else alert('Facebook Auth failed: ' + data.error);
  };

  const fetchFacebookCampaigns = async () => {
    const res = await fetch(`${backendURL}/api/facebook/campaigns`);
    const data = await res.json();
    setFacebookCampaigns(data);
  };

  const handleLinkedinAuth = async () => {
    const code = prompt('Paste LinkedIn OAuth authorization code:');
    if (!code) return alert('Auth code required');

    const res = await fetch(`${backendURL}/api/linkedin/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });
    const data = await res.json();
    if (data.success) alert('LinkedIn Ads authenticated!');
    else alert('LinkedIn Auth failed: ' + data.error);
  };

  const fetchLinkedinCampaigns = async () => {
    const orgId = prompt('Enter LinkedIn Organization ID:');
    if (!orgId) return alert('Organization ID required');

    const res = await fetch(`${backendURL}/api/linkedin/campaigns?orgId=${orgId}`);
    const data = await res.json();
    setLinkedinCampaigns(data);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Marketing Tools Integration (MERN)</h1>

      <section>
        <h2>Google Ads</h2>
        <button onClick={handleGoogleAuth}>Authenticate Google Ads</button>{' '}
        <button onClick={fetchGoogleCampaigns}>Fetch Campaigns</button>
        <pre>{JSON.stringify(googleCampaigns, null, 2)}</pre>
      </section>

      <section>
        <h2>Facebook Ads</h2>
        <button onClick={handleFacebookAuth}>Authenticate Facebook Ads</button>{' '}
        <button onClick={fetchFacebookCampaigns}>Fetch Campaigns</button>
        <pre>{JSON.stringify(facebookCampaigns, null, 2)}</pre>
      </section>

      <section>
        <h2>LinkedIn Ads</h2>
        <button onClick={handleLinkedinAuth}>Authenticate LinkedIn Ads</button>{' '}
        <button onClick={fetchLinkedinCampaigns}>Fetch Campaigns</button>
        <pre>{JSON.stringify(linkedinCampaigns, null, 2)}</pre>
      </section>
    </div>
  );
}

export default App;
