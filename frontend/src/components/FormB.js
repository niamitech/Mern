import { useState } from 'react';
import axios from 'axios';

function FormB({ variantId }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/submit`, { variantId, name, email });
      alert('Submission successful!');
      setName('');
      setEmail('');
    } catch (error) {
      alert('Error submitting form');
    }
  };

  return (
    <div className="form-container form-b">
      <h2>Join Our Community!</h2>
      <p>Fill out the form below to get exclusive updates and offers.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Get Started</button>
      </form>
    </div>
  );
}

export default FormB;