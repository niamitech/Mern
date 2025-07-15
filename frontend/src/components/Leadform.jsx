import React, { useState } from 'react';
import axios from 'axios';
const API = process.env.REACT_APP_API_URL;

function LeadForm() {
  const [lead, setLead] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    source: 'Website'
  });

  const handleChange = (e) => {
    setLead({
      ...lead,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!lead.name || !lead.email) {
      alert('Please fill name and email.');
      return;
    }

    try {
      const response = await axios.post(`${API}/api/leads`, lead);
      if (response.data.success) {
        alert('Lead submitted');
        setLead({ name: '', email: '', phone: '', message: '', source: 'Website' });
      } else {
        alert('Submission failed');
      }
    } catch (error) {
      alert('Server error');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Submit a Lead</h2>
      <form onSubmit={handleSubmit}>
        <div><label>Name:</label><br /><input type="text" name="name" value={lead.name} onChange={handleChange} /></div>
        <div><label>Email:</label><br /><input type="email" name="email" value={lead.email} onChange={handleChange} /></div>
        <div><label>Phone:</label><br /><input type="text" name="phone" value={lead.phone} onChange={handleChange} /></div>
        <div><label>Message:</label><br /><textarea name="message" value={lead.message} onChange={handleChange} /></div>
        <div><label>Source:</label><br />
          <select name="source" value={lead.source} onChange={handleChange}>
            <option>Website</option>
            <option>Ad Campaign</option>
            <option>Referral</option>
            <option>Social Media</option>
          </select>
        </div>
        <br />
        <button type="submit">Submit Lead</button>
      </form>
    </div>
  );
}

export default LeadForm;
