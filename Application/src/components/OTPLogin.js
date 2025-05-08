// src/components/OtpLogin.js
import React, { useState } from "react";
import { app } from "../firebase";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const OtpLogin = ({ setPhoneNumber, setConfirmationResult }) => {
  const [phone, setPhone] = useState("");

  const configureRecaptcha = () => {
    const auth = getAuth(app);
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'invisible',
      callback: (response) => {
        console.log("reCAPTCHA verified");
      }
    });
  };

  const sendOtp = async () => {
    if (!phone) {
      alert("Enter phone number");
      return;
    }

    configureRecaptcha();
    const auth = getAuth(app);
    const appVerifier = window.recaptchaVerifier;

    try {
      const result = await signInWithPhoneNumber(auth, `+91${phone}`, appVerifier);
      setConfirmationResult(result);
      setPhoneNumber(phone);
      alert("OTP sent successfully!");
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Failed to send OTP.");
    }
  };

  return (
    <div>
      <h2>OTP Login</h2>
      <input
        type="text"
        placeholder="Enter phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button onClick={sendOtp}>Send OTP</button>
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default OtpLogin;
