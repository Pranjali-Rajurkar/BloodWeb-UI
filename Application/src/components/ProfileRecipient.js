import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProfileRecipient.css"; // Optional: for styling

const ProfileRecipient = () => {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [requestsSent, setRequestsSent] = useState([]);
  const userEmail = localStorage.getItem("email");  // Get email from localStorage

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/profile?email=${userEmail}`, {
        withCredentials: true,
      });
      if (res.data.success && res.data.role === "recipient") {
        setProfile(res.data.profile);
      } else {
        console.error("Failed to fetch recipient profile or not a recipient.");
      }
    } catch (err) {
      console.error("Failed to load recipient profile:", err);
    }
  };

  const fetchRequestsSent = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/requests/sent?email=${userEmail}`, {
        withCredentials: true,
      });
      setRequestsSent(res.data.requests_sent || []);
    } catch (err) {
      console.error("Failed to fetch sent requests:", err);
    }
  };

  useEffect(() => {
    if (userEmail) {
      fetchProfile();
      fetchRequestsSent();
    }
  }, [userEmail]);

  const handleInputChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const saveChanges = async () => {
    try {
      const res = await axios.put("http://localhost:5000/api/profile/recipient", profile, {
        withCredentials: true,
      });
      if (res.data.success) {
        setEditMode(false);
        alert("Profile updated successfully.");
      } else {
        console.error("Error saving changes:", res.data.message);
      }
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="profile-container">
      <h2>Recipient Profile</h2>
      {editMode ? (
        <>
          <input name="name" value={profile.name} onChange={handleInputChange} />
          <input name="age" value={profile.age} onChange={handleInputChange} />
          <input name="blood_type" value={profile.blood_type} onChange={handleInputChange} />
          <input name="location" value={profile.location} onChange={handleInputChange} />
          <input name="contact" value={profile.contact} onChange={handleInputChange} />
          <button onClick={saveChanges}>Save</button>
        </>
      ) : (
        <>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Age:</strong> {profile.age}</p>
          <p><strong>Blood Type:</strong> {profile.blood_type}</p>
          <p><strong>Location:</strong> {profile.location}</p>
          <p><strong>Contact:</strong> {profile.contact}</p>
          <button onClick={() => setEditMode(true)}>Edit</button>
        </>
      )}

      <hr />
      <h3>Requests Sent</h3>
      {requestsSent.length > 0 ? (
        <ul>
          {requestsSent.map((req, index) => (
            <li key={index}>
              To: {req.donor_name} | Status: {req.status} | Date: {new Date(req.created_at).toLocaleString()}
            </li>
          ))}
        </ul>
      ) : (
        <p>No requests sent yet.</p>
      )}
    </div>
  );
};

export default ProfileRecipient;
