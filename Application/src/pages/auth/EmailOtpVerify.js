import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const EmailOtpVerify = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const role = location.state?.role || "donor"; // "donor" or "recipient"

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleOtpChange = (e) => setOtp(e.target.value);

  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("❌ Please enter your email.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/otp/send-email-otp", { email });
      if (response.data.success) {
        setIsOtpSent(true);
        setError("");
      } else {
        setError("❌ Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("OTP Send Error:", error);
      setError("❌ Could not connect to server. Make sure the backend is running.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp) {
      setError("❌ Please enter the OTP.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/otp/verify-email-otp", { email, otp });

      if (response.status === 200 && response.data.message) {
        // ✅ Redirect user to respective registration form
        const targetPath = role === "recipient" ? "/register/recipient" : "/register/donor";
        navigate(targetPath, { state: { verifiedEmail: email } });
      } else {
        setError("❌ OTP verification failed. Please try again.");
      }
    } catch (error) {
      console.error("OTP Verification Error:", error);
      setError("❌ Invalid OTP or server error. Please try again.");
    }
  };

  return (
    <div className="otp-verify-container">
      <h2>Verify OTP</h2>

      {!isOtpSent ? (
        <form onSubmit={handleSendOtp}>
          <label>Enter Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            required
          />
          <button type="submit">Send OTP</button>
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>Enter OTP:</label>
          <input
            type="text"
            value={otp}
            onChange={handleOtpChange}
            placeholder="Enter OTP"
            required
          />
          <button type="submit">Verify OTP</button>
        </form>
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default EmailOtpVerify;
