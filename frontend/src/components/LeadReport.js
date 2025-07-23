import React, { useState, useEffect } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

const LeadReport = () => {
  const [leads, setLeads] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [source, setSource] = useState("");

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const params = {};
        if (startDate) params.startDate = startDate;
        if (endDate) params.endDate = endDate;
        if (source) params.source = source;

        const res = await axios.get(`${API}/api/reports`, { params });
        setLeads(res.data);
      } catch (err) {
        console.error("Failed to fetch lead report", err);
      }
    };

    fetchLeads();
  }, [startDate, endDate, source]);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>📊 Real-time Lead Report</h2>
      <div style={{ marginBottom: "1rem" }}>
        <label>Start Date: </label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        &nbsp;&nbsp;
        <label>End Date: </label>
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        &nbsp;&nbsp;
        <label>Source: </label>
        <input type="text" value={source} onChange={(e) => setSource(e.target.value)} />
      </div>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Source</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {leads.length === 0 ? (
            <tr>
              <td colSpan="4">No leads found.</td>
            </tr>
          ) : (
            leads.map((lead) => (
              <tr key={lead._id}>
                <td>{lead.name}</td>
                <td>{lead.email}</td>
                <td>{lead.source}</td>
                <td>{new Date(lead.createdAt).toLocaleDateString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LeadReport;
