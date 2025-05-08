import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "../styles/home.css";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const isLoggedIn = !!localStorage.getItem("token");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError("Please enter a search term.");
      setResults([]);
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/search/search_donor_api",
        {
          params: { query: searchQuery },
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      if (res.data.success && res.data.donors.length > 0) {
        setResults(res.data.donors);
        setError("");
      } else {
        setError("No matching donors found.");
        setResults([]);
      }
    } catch (err) {
      console.error("Search error:", err);
      setError("Failed to fetch donors. Please check your backend server.");
      setResults([]);
    }
  };

  const handleSendRequest = async (donor) => {
    const token = localStorage.getItem("token");
    const requester_username = localStorage.getItem("username");

    if (!requester_username) {
      alert("❌ You must be logged in to send a request.");
      return;
    }

    try {
      console.log("Sending request to donor ID:", donor.id);  // Debug line

      const res = await axios.post(
        "http://localhost:5000/api/send-request",
        {
          requester_username,
          donor_id: donor.id, // ✅ Ensure donor.id is sent
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        alert(`✅ Request sent to ${donor.name}`);
      } else {
        alert("❌ " + res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Server error while sending request.");
    }
  };

  return (
    <div className="home" style={{ padding: "2rem", maxWidth: "1000px", margin: "auto" }}>
      <section className="hero" style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1>Welcome to BloodWave</h1>
        <h2>Save Lives with Every Drop</h2>
        <p>Join the movement to make a difference in your community. Donate blood today and help save lives.</p>
        <button className="btn" onClick={handleSearch}>
          Find Donors
        </button>
      </section>

      <section className="search-bar" style={{ marginBottom: "2rem", textAlign: "center" }}>
        <h2>Search for Donors</h2>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by name, blood type, or location"
          style={{ padding: "0.5rem", width: "60%" }}
        />
        <button className="btn" onClick={handleSearch} style={{ marginLeft: "1rem" }}>
          Search
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </section>

      <div className="register-buttons" style={{ display: "flex", gap: "1rem", justifyContent: "center", margin: "2rem 0" }}>
        <Link to="/email-otp/verify" state={{ role: "donor" }}>
          <button className="donor-btn">Register as Donor</button>
        </Link>
        <Link to="/email-otp/verify" state={{ role: "recipient" }}>
          <button className="recipient-btn">Register as Recipient</button>
        </Link>
      </div>

      {/* Added content about blood donation */}
      <section className="about-blood-donation" style={{ marginBottom: "2rem", textAlign: "center" }}>
        <h2>Why Donate Blood?</h2>
        <p>Blood donation is a life-saving act that can help those in need, whether it’s for accident victims, people undergoing surgery, or those with medical conditions. Here’s why donating blood is crucial:</p>
        <ul>
          <li><strong>Saves Lives:</strong> A single donation can save up to three lives.</li>
          <li><strong>Helps Those in Need:</strong> Blood donations are vital for surgeries, trauma victims, and people battling serious illnesses.</li>
          <li><strong>Easy and Quick:</strong> The process of donating blood is safe, quick, and usually takes less than an hour.</li>
          <li><strong>Boosts Community Health:</strong> Regular blood donations ensure a stable and sufficient supply for medical needs.</li>
        </ul>
        <p><strong>Join the movement</strong> — donate blood and become a hero in someone’s life.</p>
      </section>

      <section>
        <h2>Who Can Donate?</h2>
        <p>Most healthy adults can donate blood. To be eligible, you must:

1. Be at least 17 years old (or 16 with parental consent).
2. Weigh at least 50 kg (110 lbs).
3. Be in good health.
4. Meet certain medical requirements.</p>
      </section>
      
      <section>
        <h2>Benefits of Blood Donation</h2>
        <p>1. Save Lives: Your donation can help save up to three lives.
2. Improve Health: Blood donation can help reduce iron levels and lower the risk of heart disease.
3. Sense of Satisfaction: Experience the joy of giving back to your community.
4. Free Health Checkup: Get a free mini-physical, including blood pressure and hemoglobin checks.
</p>
      </section>
    </div>
  );
};

export default Home;
