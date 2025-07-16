import React, { useState } from 'react';
import axios from 'axios';

const LeadForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    source: ''
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/leads`, formData);
      alert('Lead submitted successfully!');
    } catch (err) {
      alert('Submission failed.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Submit a Lead</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required /><br />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required /><br />
        <textarea name="message" placeholder="Message" onChange={handleChange} /><br />
        <input type="text" name="source" placeholder="Source (e.g., Website)" onChange={handleChange} /><br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LeadForm;
