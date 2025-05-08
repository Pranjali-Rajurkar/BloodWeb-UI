import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");
  const role = localStorage.getItem("role"); // 'donor', 'recipient', or 'user'
  const userEmail = localStorage.getItem("email");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="logo">
          <img src={logo} alt="BloodWave Logo" height="50" />
        </Link>

        {/* Navigation Links */}
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>

          {/* Not Logged In: Show Register & Login */}
          {!isLoggedIn && (
            <>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/login">Login / Sign In</Link></li>
            </>
          )}

          {/* Donor Logged In */}
          {isLoggedIn && role === "donor" && userEmail && (
            <>
              <li><Link to={`/profile/donor?email=${userEmail}`}>My Profile</Link></li>
              <li><Link to="/my-requests">My Requests</Link></li>
            </>
          )}

          {/* Recipient Logged In */}
          {isLoggedIn && role === "recipient" && userEmail && (
            <>
              <li><Link to={`/profile/recipient?email=${userEmail}`}>My Profile</Link></li>
              <li><Link to="/requests-sent">Requests Sent</Link></li>
            </>
          )}

          {/* Generic User Role (optional handling) */}
          {isLoggedIn && role === "user" && (
            <>
              <li><Link to="/profile">My Profile</Link></li>
            </>
          )}

          {/* Logout Button */}
          {isLoggedIn && (
            <li>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
