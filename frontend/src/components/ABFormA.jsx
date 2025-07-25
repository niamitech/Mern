import React, { useState } from "react";
import axios from "axios";

function ABFormA() {
  const [form, setForm] = useState({ name: "", email: "", source: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting A:", form);
    await axios.post("http://localhost:5000/api/abtest/submit", {
      ...form,
      formVersion: "A",
    });
    alert("Submitted A");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Form Version A</h3>
      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <input
        placeholder="Email"
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />
      <input
        placeholder="Source"
        value={form.source}
        onChange={(e) => setForm({ ...form, source: e.target.value })}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default ABFormA;
