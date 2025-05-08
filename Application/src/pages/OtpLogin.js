import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./OtpLogin.css";

const OtpLogin = () => {
  const [email, setEmail] = useState("");
  const [emailOtp, setEmailOtp] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // ✅ Send OTP to Email
  const handleSendEmailOtp = async () => {
    setError("");
    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/otp/send-email-otp", { email });
      setEmailSent(true);
      alert("📨 OTP sent to your email!");
    } catch (error) {
      console.error("Email OTP error:", error);
      setError("Failed to send Email OTP.");
    }
  };

  // ✅ Verify Email OTP
  const handleVerifyEmailOtp = async () => {
    setError("");

    try {
      await axios.post("http://localhost:5000/api/otp/verify-email-otp", {
        email,
        otp: emailOtp,
      });

      setEmailVerified(true);
      alert("✅ Email Verified!");

      // ⏩ Redirect to Donor Registration
      navigate("/register/donor", { state: { verifiedEmail: email } });
    } catch (error) {
      setError("❌ Invalid Email OTP");
    }
  };

  return (
    <div className="otp-container">
      <h2>Email OTP Login</h2>

      <div className="form-group">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {!emailSent ? (
          <button onClick={handleSendEmailOtp}>Send OTP</button>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={emailOtp}
              onChange={(e) => setEmailOtp(e.target.value)}
              required
            />
            <button onClick={handleVerifyEmailOtp}>Verify OTP</button>
          </>
        )}

        {emailVerified && <p className="success">✅ Email Verified!</p>}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default OtpLogin;
