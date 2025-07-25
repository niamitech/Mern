import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [variant, setVariant] = useState(null);

  useEffect(() => {
    // Randomly assign variant A or B
    const assignedVariant = Math.random() < 0.5 ? "A" : "B";
    setVariant(assignedVariant);

    // Send variant to backend
    axios
      .post("http://localhost:5000/api/abtest", { variant: assignedVariant })
      .then((res) => console.log(res.data.message))
      .catch((err) => console.error("Axios Error:", err.message));
  }, []);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Welcome to Variant {variant}</h1>
      {variant === "A" ? (
        <p>This is Version A of the page.</p>
      ) : (
        <p>This is Version B of the page.</p>
      )}
    </div>
  );
}

export default App;
