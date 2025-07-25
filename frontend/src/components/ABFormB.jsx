import React, { useState } from "react";
import axios from "axios";

function ABFormB() {
  const [form, setForm] = useState({ name: "", email: "", source: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting B:", form);
    await axios.post("http://localhost:5000/api/abtest/submit", {
      ...form,
      formVersion: "B",
    });
    alert("Submitted B");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Form Version B</h3>
      <label>Name</label>
      <input
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <label>Email</label>
      <input
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />
      <label>Source</label>
      <input
        value={form.source}
        onChange={(e) => setForm({ ...form, source: e.target.value })}
      />
      <button type="submit">Send</button>
    </form>
  );
}

export default ABFormB;
