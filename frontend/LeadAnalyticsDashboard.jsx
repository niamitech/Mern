import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const LeadAnalyticsDashboard = () => {
  const [total, setTotal] = useState(0);
  const [rate, setRate] = useState(0);
  const [daily, setDaily] = useState([]);

  useEffect(() => {
    axios.get("/api/analytics/total").then(res => setTotal(res.data.totalLeads));
    axios.get("/api/analytics/conversion-rate").then(res => setRate(res.data.conversionRate));
    axios.get("/api/analytics/daily").then(res => setDaily(res.data.dailyLeads));
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">📊 Lead Analytics Dashboard</h1>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white shadow p-4 rounded-2xl">
          <h2 className="text-xl font-semibold">Total Leads</h2>
          <p className="text-4xl">{total}</p>
        </div>
        <div className="bg-white shadow p-4 rounded-2xl">
          <h2 className="text-xl font-semibold">Conversion Rate</h2>
          <p className="text-4xl">{rate}%</p>
        </div>
      </div>

      <div className="bg-white shadow p-4 rounded-2xl">
        <h2 className="text-xl font-semibold mb-2">Leads Per Day (Last 7 Days)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={daily}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LeadAnalyticsDashboard;
