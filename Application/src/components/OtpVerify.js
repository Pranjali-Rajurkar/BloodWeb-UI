// src/components/OtpVerify.js
import React, { useState } from "react";

const OtpVerify = ({ confirmationResult }) => {
  const [otp, setOtp] = useState("");

  const verifyOtp = async () => {
    try {
      const result = await confirmationResult.confirm(otp);
      console.log("User signed in successfully:", result.user);
      alert("OTP Verified Successfully!");
    } catch (error) {
      console.error("Invalid OTP:", error);
      alert("Invalid OTP");
    }
  };

  return (
    <div>
      <h2>Verify OTP</h2>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={verifyOtp}>Verify</button>
    </div>
  );
};

export default OtpVerify;
