import React, { useEffect, useState } from "react";
import axios from "axios";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
import ABTestForm from "./components/ABTestForm";

function App() {
  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>Welcome to A/B Lead Test</h1>
      <ABTestForm />
      <AnalyticsDashboard />
    </div>
  );
}

export default App;
