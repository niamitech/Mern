// backend/models/Lead.js
const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
  name: String,
  email: String,
  source: String,
  status: { type: String, enum: ["new", "converted", "lost"], default: "new" },
}, { timestamps: true });

module.exports = mongoose.model("Lead", leadSchema);


// backend/routes/analytics.js
const express = require("express");
const router = express.Router();
const Lead = require("../models/Lead");

router.get("/total", async (req, res) => {
    const count = await Lead.countDocuments();
    res.json({ totalLeads: count });
});

router.get("/conversion-rate", async (req, res) => {
    const total = await Lead.countDocuments();
    const converted = await Lead.countDocuments({ status: "converted" });
    const rate = total === 0 ? 0 : ((converted / total) * 100).toFixed(2);
    res.json({ conversionRate: rate });
});

router.get("/daily", async (req, res) => {
    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 6);

    const leads = await Lead.aggregate([
        { $match: { createdAt: { $gte: last7Days } } },
        {
            $group: {
                _id: {
                    $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
                },
                count: { $sum: 1 }
            }
        },
        { $sort: { _id: 1 } }
    ]);

    res.json({ dailyLeads: leads });
});

module.exports = router;


// frontend/src/components/LeadAnalyticsDashboard.jsx
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


// frontend/src/App.jsx
import React from "react";
import LeadAnalyticsDashboard from "./components/LeadAnalyticsDashboard";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <LeadAnalyticsDashboard />
    </div>
  );
}

export default App;
