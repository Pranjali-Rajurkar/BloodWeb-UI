import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError("❌ Passwords do not match");
      return;
    }

    try {
      if (isLogin) {
        // LOGIN request
        const res = await axios.post(
          "http://localhost:5000/api/login",
          {
            username: formData.username,
            password: formData.password,
          },
          { withCredentials: true }
        );

        if (res.data.success) {
          localStorage.setItem("token", res.data.token || "sample_token");
          localStorage.setItem("username", res.data.username);

          if (res.data.role) {
            localStorage.setItem("role", res.data.role); // Save role: donor or recipient
          } else {
            console.warn("⚠️ No role returned from backend!");
          }

          console.log("✅ Logged in as:", res.data.role);
          alert("✅ Login successful!");
          navigate("/");
        } else {
          setError(res.data.message || "Invalid credentials");
        }
      } else {
        // SIGN UP request
        const res = await axios.post(
          "http://localhost:5000/api/register",
          {
            username: formData.username,
            password: formData.password,
          },
          { withCredentials: true }
        );

        if (res.data.success) {
          alert("✅ Account created successfully!");
          navigate("/register", { state: { email: formData.username } });
        } else {
          setError(res.data.message || "Registration failed");
        }
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 409) {
        setError("⚠️ Email or Username already exists.");
      } else {
        setError("❌ Server error. Please try again later.");
      }
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>

        <label>Username:</label>
        <input
          type="text"
          name="username"
          placeholder="Enter your email or username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {!isLogin && (
          <>
            <label>Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </>
        )}

        <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>

        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

        <p style={{ marginTop: "10px" }}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
