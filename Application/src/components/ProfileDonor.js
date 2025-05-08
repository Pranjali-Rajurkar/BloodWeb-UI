import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProfileDonor.css"

const ProfileDonor = () => {
  const [profile, setProfile] = useState(null);
  const [requests, setRequests] = useState([]);
  const userEmail = localStorage.getItem("email");  // Get email from localStorage

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/profile?email=${userEmail}`);
        
        if (response.data.success) {
          setProfile(response.data.profile);
          if (response.data.requests_received) {
            setRequests(response.data.requests_received);
          }
        } else {
          console.error("Error fetching profile:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching donor profile:", error);
      }
    };

    if (userEmail) fetchProfile();
  }, [userEmail]);

  return (
    <div className="p-4">
      {profile ? (
        <>
          <h2 className="text-xl font-bold mb-2">Donor Profile</h2>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Blood Type:</strong> {profile.blood_type}</p>
          <p><strong>City:</strong> {profile.city}</p>
          <p><strong>Contact:</strong> {profile.contact}</p>

          <h3 className="text-lg font-semibold mt-6 mb-2">My Requests</h3>
          {requests.length > 0 ? (
            <ul className="space-y-2">
              {requests.map((req, idx) => (
                <li key={idx} className="border p-2 rounded shadow">
                  <p><strong>From:</strong> {req.recipient_name}</p>
                  <p><strong>Message:</strong> {req.message}</p>
                  <p><strong>Date:</strong> {new Date(req.created_at).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No requests received.</p>
          )}
        </>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default ProfileDonor;
