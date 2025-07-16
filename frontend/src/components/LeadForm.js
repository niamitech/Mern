// frontend/src/components/LeadForm.js
import React, { useState } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

const LeadForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/api/leads`, formData);
      setResponse(res.data.message);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setResponse('Submission failed.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Submit a Lead</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required /><br /><br />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required /><br /><br />
        <textarea name="message" placeholder="Message" value={formData.message} onChange={handleChange} required /><br /><br />
        <button type="submit">Submit</button>
      </form>
      {response && <p>{response}</p>}
    </div>
  );
};

export default LeadForm;
