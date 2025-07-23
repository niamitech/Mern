import React, { useState, useEffect } from "react";
import ABFormA from "./components/ABFormA";
import ABFormB from "./components/ABFormB";

function App() {
  const [version, setVersion] = useState(null);

  useEffect(() => {
    // Only set once when component mounts
    const chosen = Math.random() < 0.5 ? "A" : "B";
    setVersion(chosen);
  }, []);

  if (!version) return <p>Loading A/B test...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>A/B Test Lead Capture</h2>
      {version === "A" ? <ABFormA /> : <ABFormB />}
    </div>
  );
}

export default App;
