import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const CampaignsDashboard = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await axios.get('/api/campaigns');
        setCampaigns(res.data);
      } catch (err) {
        console.error('Error fetching campaigns:', err);
      }
    };
    fetchCampaigns();
  }, []);

  return (
    <div style={{ width: '90%', margin: 'auto', paddingTop: '20px' }}>
      <h2>Social Media Campaign Analytics</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={campaigns}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="impressions" fill="#8884d8" />
          <Bar dataKey="clicks" fill="#82ca9d" />
          <Bar dataKey="leadsGenerated" fill="#ffc658" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CampaignsDashboard;
