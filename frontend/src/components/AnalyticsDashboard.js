import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/abtest/analytics")
      .then((res) => setAnalytics(res.data))
      .catch((err) => console.error("Error fetching analytics:", err));
  }, []);

  const data = analytics.map((item) => ({
    variant: item.variant,
    impressions: item.impressions,
    submissions: item.submissions,
    conversionRate: +(item.conversionRate * 100).toFixed(2),
  }));

  return (
    <div>
      <h2>A/B Test Analytics</h2>
      <BarChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="variant" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="impressions" fill="#8884d8" />
        <Bar dataKey="submissions" fill="#82ca9d" />
        <Bar dataKey="conversionRate" fill="#ffc658" name="Conv Rate (%)" />
      </BarChart>
    </div>
  );
}

export default AnalyticsDashboard;
