import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

// 🌐 Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Register from "./pages/Register";
import Login from "./components/Login";

// 🧩 Registration Flow Pages
import EmailOtpVerify from './pages/auth/EmailOtpVerify';
import DonorRegister from './pages/DonorRegister';
import RecipientRegister from './pages/RecipientRegister';

// 🔐 OTP Login
import OtpLogin from "./pages/OtpLogin";

// 📥 Requests Pages
import MyRequests from "./pages/MyRequests";
import RequestsSent from "./pages/RequestsSent";

// 🧑‍⚕️ Profile Pages
import ProfileDonor from "./components/ProfileDonor";  // Donor Profile
import ProfileRecipient from "./components/ProfileRecipient";  // Recipient Profile

// 🛑 Not Found Page
import NotFound from "./pages/NotFound"; // A simple 404 page

// Helper for route protection (for example: check if user is logged in)
const ProtectedRoute = ({ children, isLoggedIn }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return children;
};

const App = () => {
  const isLoggedIn = Boolean(localStorage.getItem("token")); // You could use context or redux for a more robust solution

  return (
    <div>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Registration Flow */}
        <Route path="/email-otp/verify" element={<EmailOtpVerify />} />
        <Route path="/register/donor" element={<DonorRegister />} />
        <Route path="/register/recipient" element={<RecipientRegister />} />

        {/* OTP Login */}
        <Route path="/otp-login" element={<OtpLogin />} />

        {/* Requests Pages */}
        <Route path="/my-requests" element={<ProtectedRoute isLoggedIn={isLoggedIn}><MyRequests /></ProtectedRoute>} />
        <Route path="/requests-sent" element={<ProtectedRoute isLoggedIn={isLoggedIn}><RequestsSent /></ProtectedRoute>} />

        {/* Profile Pages */}
        <Route path="/profile/donor" element={<ProtectedRoute isLoggedIn={isLoggedIn}><ProfileDonor /></ProtectedRoute>} />
        <Route path="/profile/recipient" element={<ProtectedRoute isLoggedIn={isLoggedIn}><ProfileRecipient /></ProtectedRoute>} />

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
