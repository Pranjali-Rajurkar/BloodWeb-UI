import React, { useState } from "react";
import { auth } from "../firebaseConfig";

const VerifyToken = () => {
  const [idToken, setIdToken] = useState("");

  const getToken = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken();
        setIdToken(token);
      }
    } catch (error) {
      console.error("Error getting token", error);
    }
  };

  const verifyToken = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/verify_token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      const data = await response.json();
      alert(data.success ? "User Verified!" : "Verification Failed!");
    } catch (error) {
      console.error("Error verifying token", error);
    }
  };

  return (
    <div>
      <button onClick={getToken}>Get Token</button>
      <button onClick={verifyToken}>Verify Token</button>
    </div>
  );
};

export default VerifyToken;
