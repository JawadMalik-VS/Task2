import React, { useState } from "react";
import { generateOTP, authenticateUser } from "../ethereumService";

const AuthenticateComponent = () => {
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleGenerateOTP = async () => {
    const otp = await generateOTP();
    if (otp) {
      setGeneratedOtp(otp);
      alert(`OTP generated: ${otp}`);
    } else {
      alert("Failed to generate OTP.");
    }
  };

  const handleAuthenticate = async () => {
    const result = await authenticateUser(otp);
    setIsAuthenticated(result);
    alert(result ? "Authentication successful!" : "Authentication failed!");
  };

  return (
    <div>
      <h2>Authenticate</h2>
      <button onClick={handleGenerateOTP}>Generate OTP</button>
      {generatedOtp && <p>Your OTP: {generatedOtp}</p>}
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={handleAuthenticate}>Authenticate</button>
      {isAuthenticated && <p>User authenticated successfully!</p>}
    </div>
  );
};

export default AuthenticateComponent;
