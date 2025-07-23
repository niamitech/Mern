import React, { useState } from 'react';
import axios from 'axios';

export default function LeadForm() {
  const [form, setForm] = useState({ name: '', email: '', source: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/leads', form);
    setForm({ name: '', email: '', source: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-x-2">
      <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Source" value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })} />
      <button type="submit">Submit</button>
    </form>
  );
}
