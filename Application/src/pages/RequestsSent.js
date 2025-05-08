import React, { useEffect, useState } from "react";
import axios from "axios";

const RequestsSent = () => {
  const [sentRequests, setSentRequests] = useState([]);
  const [error, setError] = useState("");
  
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchSent = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/requests-sent", {
          params: { recipient_id: userId },
        });
        
        // Check if response data is in correct format
        if (res.data && res.data.requests) {
          setSentRequests(res.data.requests);  // Assuming your backend returns an array of requests under "requests"
        } else {
          setError("No sent requests found.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch sent requests.");
      }
    };

    if (userId) fetchSent();
  }, [userId]);

  return (
    <div className="container">
      <h2>📤 Requests I've Sent</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {sentRequests.length === 0 ? (
        <p>No requests sent yet.</p>
      ) : (
        <ul>
          {sentRequests.map((req, index) => (
            <li key={index} style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
              <p><strong>To:</strong> {req.donor_name}</p>
              <p><strong>Email:</strong> {req.donor_email}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RequestsSent;
