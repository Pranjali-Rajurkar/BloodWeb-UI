import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./RecipientRegister.css";

const RecipientRegister = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const verifiedEmail = location.state?.verifiedEmail || "";

  useEffect(() => {
    if (!verifiedEmail) {
      navigate("/account-setup");
    }
  }, [verifiedEmail, navigate]);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    blood_type: "",
    location: "",
    contact: "",
    email: verifiedEmail,
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate contact number format (10 digits)
    if (!/^\d{10}$/.test(formData.contact)) {
      setErrorMessage("❌ Please enter a valid 10-digit contact number.");
      return;
    }

    setLoading(true); // Start loading

    // Submit data to backend
    try {
      const response = await fetch("http://localhost:5000/api/recipient/register", { // Fixed API endpoint
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("✅ Recipient registered successfully!");
        navigate("/login");
      } else {
        // Improved error message handling
        setErrorMessage(result.message || "❌ Something went wrong. Please try again.");
      }
    } catch (error) {
      setErrorMessage("❌ Something went wrong: " + error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="register-container">
      <h2>Recipient Registration</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          readOnly
        />

        <label>Full Name:</label>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Age:</label>
        <input
          type="number"
          name="age"
          placeholder="Age"
          min="1"
          value={formData.age}
          onChange={handleChange}
          required
        />

        <label>Blood Type:</label>
        <select
          name="blood_type"
          value={formData.blood_type}
          onChange={handleChange}
          required
        >
          <option value="">Select Blood Type</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select>

        <label>Location (City, State):</label>
        <input
          type="text"
          name="location"
          placeholder="Location (City, State)"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <label>Contact Number (10 digits):</label>
        <input
          type="tel"
          name="contact"
          placeholder="Contact Number (10 digits)"
          pattern="\d{10}"
          value={formData.contact}
          onChange={handleChange}
          required
        />

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default RecipientRegister;
