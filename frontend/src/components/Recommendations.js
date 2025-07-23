import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Recommendations() {
  const [recs, setRecs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/ai/recommendations').then(res => setRecs(res.data.recommendations));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold">Top AI-Prioritized Leads</h2>
      <ul>
        {recs.map(r => (
          <li key={r._id}>{r.name} - Score: {r.score}</li>
        ))}
      </ul>
    </div>
  );
}
