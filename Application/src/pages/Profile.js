import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [requests, setRequests] = useState([]);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileUrl =
          role === "donor"
            ? `http://localhost:5000/api/donor/profile/${username}`
            : `http://localhost:5000/api/recipient/profile/${username}`;
        const requestsUrl =
          role === "donor"
            ? `http://localhost:5000/api/donor/requests/${username}`
            : `http://localhost:5000/api/recipient/requests/${username}`;

        const [profileRes, requestsRes] = await Promise.all([
          axios.get(profileUrl, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(requestsUrl, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setProfileData(profileRes.data);
        setFormData(profileRes.data);
        setRequests(requestsRes.data || []);
      } catch (error) {
        console.error("Error loading profile or requests:", error);
      }
    };

    if (role && username) {
      fetchData();
    }
  }, [role, username, token]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    try {
      const updateUrl =
        role === "donor"
          ? `http://localhost:5000/api/donor/profile/${username}`
          : `http://localhost:5000/api/recipient/profile/${username}`;

      await axios.put(updateUrl, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setProfileData(formData);
      setEditing(false);
      alert("✅ Profile updated successfully.");
    } catch (error) {
      console.error("Update failed:", error);
      alert("❌ Failed to update profile.");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>{role === "donor" ? "Donor" : "Recipient"} Profile</h2>

      {profileData ? (
        <div>
          {Object.keys(profileData).map((key) => (
            <div key={key} style={{ marginBottom: "1rem" }}>
              <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{" "}
              {editing ? (
                <input
                  type="text"
                  name={key}
                  value={formData[key] || ""}
                  onChange={handleChange}
                />
              ) : (
                profileData[key]
              )}
            </div>
          ))}

          {editing ? (
            <>
              <button onClick={handleSave}>💾 Save</button>
              <button onClick={() => setEditing(false)}>❌ Cancel</button>
            </>
          ) : (
            <button onClick={() => setEditing(true)}>✏️ Edit Profile</button>
          )}

          <hr />
          <h3>{role === "donor" ? "My Requests" : "Requests Sent"}</h3>
          {requests.length > 0 ? (
            <ul>
              {requests.map((req, idx) => (
                <li key={idx}>
                  <p><strong>From:</strong> {req.requester_username}</p>
                  <p><strong>Blood Type:</strong> {req.donor_blood_type}</p>
                  <p><strong>City:</strong> {req.donor_city}</p>
                  <p><strong>Contact:</strong> {req.donor_contact}</p>
                  <hr />
                </li>
              ))}
            </ul>
          ) : (
            <p>No requests available.</p>
          )}
        </div>
      ) : (
        <p>Loading profile data...</p>
      )}
    </div>
  );
};

export default Profile;
