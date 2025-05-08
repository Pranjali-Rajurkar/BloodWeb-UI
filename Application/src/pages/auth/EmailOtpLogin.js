// src/components/EmailOtpLogin.js
import React, { useState } from "react";
import axios from "axios";

const EmailOtpLogin = () => {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [verified, setVerified] = useState(false);

  const sendOtp = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/otp/send-email-otp", { email });
      console.log(response.data);
      setOtpSent(true);
      alert("OTP sent to your email!");
    } catch (error) {
      console.error("Failed to send OTP:", error);
      alert("Error sending OTP");
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/otp/verify-email-otp", { email, otp });
      console.log(response.data);
      setVerified(true);
      alert("OTP Verified!");
    } catch (error) {
      console.error("Invalid OTP:", error);
      alert("OTP verification failed");
    }
  };

  return (
    <div>
      <h2>Email OTP Login</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={sendOtp}>Send OTP</button>

      {otpSent && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={verifyOtp}>Verify OTP</button>
        </>
      )}

      {verified && <p style={{ color: "green" }}>✅ Email verified!</p>}
    </div>
  );
};

export default EmailOtpLogin;
