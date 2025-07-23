import React, { useState } from "react";
import axios from "axios";

function ABFormB() {
  const [form, setForm] = useState({ name: "", email: "", source: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      <input onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <label>Email</label>
      <input onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <label>Source</label>
      <input onChange={(e) => setForm({ ...form, source: e.target.value })} />
      <button type="submit">Send</button>
    </form>
  );
}

export default ABFormB;
