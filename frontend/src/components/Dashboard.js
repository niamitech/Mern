// frontend/src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL; // Your API base URL

function Dashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No authentication token found. Please log in.');
          return;
        }

        const res = await axios.get(`${API}/api/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setData(res.data);
      } catch (err) {
        console.error('Dashboard error:', err);
        setError('Failed to load dashboard data');
      }
    };

    fetchDashboard();
  }, []);

  if (error) return <p>{error}</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h2>User Dashboard</h2>
      
      <h3>Lead Statistics</h3>
      <ul>
        {Object.entries(data.stats || {}).map(([status, count]) => (
          <li key={status}>{status}: {count}</li>
        ))}
      </ul>

      <h3>Recent Leads</h3>
      <ul>
        {(data.recentLeads || []).map(lead => (
          <li key={lead._id}>{lead.name} - {lead.status}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
