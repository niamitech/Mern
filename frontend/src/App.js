import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormA from './components/FormA';
import FormB from './components/FormB';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [variant, setVariant] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/variant`)
      .then(response => setVariant(response.data))
      .catch(error => console.error('Error fetching variant:', error));
  }, []);

  return (
    <Router>
      <div className="container">
        <h1>Lead Generation A/B Testing</h1>
        <Routes>
          <Route path="/" element={
            variant ? (
              variant.name === 'Variant A' ? <FormA variantId={variant._id} /> : <FormB variantId={variant._id} />
            ) : (
              <p>Loading...</p>
            )
          } />
          <Route path="/analytics" element={<AnalyticsDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;