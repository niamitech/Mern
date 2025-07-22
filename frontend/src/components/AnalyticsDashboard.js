import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const API = process.env.REACT_APP_API_URL;

const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    axios.get(`${API}/api/analytics/lead-analytics`)
      .then(res => setAnalytics(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!analytics) return <p>Loading analytics...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📊 Lead Analytics Dashboard</h2>
      <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
        <div><strong>Total Leads:</strong> {analytics.totalLeads}</div>
        <div><strong>Converted Leads:</strong> {analytics.convertedLeads}</div>
        <div><strong>Conversion Rate:</strong> {analytics.conversionRate}%</div>
      </div>

      <h3>📈 Lead Activity (Last 30 Days)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={analytics.activityData}>
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="count" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyticsDashboard;
