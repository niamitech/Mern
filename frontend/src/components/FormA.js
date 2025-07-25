import { useState } from 'react';
import axios from 'axios';

function FormA({ variantId }) {
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
    <div className="form-container form-a">
      <h2>Sign Up Now!</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FormA;