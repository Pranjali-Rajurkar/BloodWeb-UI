import React, { useEffect, useState } from "react";
import axios from "axios";

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");

  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/my-requests", {
          params: { donor_id: userId },
        });

        // Check if response data is in correct format
        if (res.data && res.data.requests) {
          setRequests(res.data.requests); // Assuming your backend returns an array of requests under "requests"
        } else {
          setError("No requests received.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch requests.");
      }
    };

    if (userId) fetchRequests();
  }, [userId]);

  return (
    <div className="container">
      <h2>📥 My Requests (Received)</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {requests.length === 0 ? (
        <p>No requests received yet.</p>
      ) : (
        <ul>
          {requests.map((req, index) => (
            <li key={index} style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
              <p><strong>From:</strong> {req.recipient_name}</p>
              <p><strong>Email:</strong> {req.recipient_email}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyRequests;
