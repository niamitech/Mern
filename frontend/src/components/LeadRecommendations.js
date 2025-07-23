import React, { useEffect, useState } from "react";

function LeadRecommendations() {
  const [recommendation, setRecommendation] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/ai/recommendations")
      .then(res => res.json())
      .then(data => setRecommendation(data));
  }, []);

  return (
    <div>
      <h2>🤖 AI Recommendations</h2>
      {recommendation && (
        <div>
          <p>{recommendation.message}</p>
          <h4>Top 5 Leads</h4>
          <ul>
            {recommendation.topLeads.map((lead, i) => (
              <li key={i}>
                {lead.name} ({lead.email}) - Score: {lead.score}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default LeadRecommendations;
