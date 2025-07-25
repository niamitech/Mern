import { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/analytics`)
      .then(response => setAnalytics(response.data))
      .catch(error => console.error('Error fetching analytics:', error));
  }, []);

  const data = analytics.map(item => ({
    name: item.variantId.name,
    impressions: item.impressions,
    submissions: item.submissions,
    conversionRate: item.conversionRate.toFixed(2),
  }));

  return (
    <div>
      <h2>A/B Testing Analytics</h2>
      <BarChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="impressions" fill="#8884d8" />
        <Bar dataKey="submissions" fill="#82ca9d" />
        <Bar dataKey="conversionRate" fill="#ffc658" />
      </BarChart>
    </div>
  );
}

export default AnalyticsDashboard;