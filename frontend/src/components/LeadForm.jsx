import React, { useState } from 'react';
import axios from 'axios';

export default function LeadForm() {
  const [form, setForm] = useState({ name: '', email: '', source: '', tags: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tagsArray = form.tags.split(',').map(t => t.trim());
    await axios.post('/api/leads', { ...form, tags: tagsArray });
    setForm({ name: '', email: '', source: '', tags: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input type="text" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
      <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="text" placeholder="Source" value={form.source} onChange={e => setForm({ ...form, source: e.target.value })} />
      <input type="text" placeholder="Tags (comma-separated)" value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} />
      <button type="submit">Submit Lead</button>
    </form>
  );
}
