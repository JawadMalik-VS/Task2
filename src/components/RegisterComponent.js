// src/components/RegisterComponent.js
import React, { useState } from "react";
import { registerUser } from "../ethereumService";

const RegisterComponent = () => {
  
    const [username, setUsername] = useState("");
    const [useraddress, setUserAddress] = useState("");

  const [publicKey, setPublicKey] = useState("");
  const [otpSeed, setOtpSeed] = useState();

  const handleRegister = async () => {
    try {
      await registerUser(useraddress,username, publicKey, otpSeed);
      alert("User registered successfully!");
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Error registering user: " + error.message);
    }
  };
  return (
    <div>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="UserAddress"
        value={useraddress}
        onChange={(e) => setUserAddress(e.target.value)}
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Public Key"
        value={publicKey}
        onChange={(e) => setPublicKey(e.target.value)}
      />
 <input
        type="number"
        placeholder="OTP Seed"
        value={otpSeed}
        onChange={(e) => setOtpSeed(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default RegisterComponent;
