import React from "react";
import { Link } from "react-router-dom";
import "./Register.css"; // Optional: your styling file

const Register = () => {
  return (
    <div className="register-container">
      <h1>Register</h1>
      <p className="register-subtext">
        Please choose your role to continue registration:
      </p>

      <div className="register-options">
        {/* Donor Registration */}
        <Link
          to="/email-otp/verify"
          state={{ role: "donor" }}
          className="register-link"
        >
          <button className="register-btn donor-btn">Register as Donor</button>
        </Link>

        {/* Recipient Registration */}
        <Link
          to="/email-otp/verify"
          state={{ role: "recipient" }}
          className="register-link"
        >
          <button className="register-btn recipient-btn">Register as Recipient</button>
        </Link>
      </div>
    </div>
  );
};

export default Register;
