// src/App.js
import React from "react";
import RegisterComponent from "./components/RegisterComponent";
import AuthenticateComponent from "./components/AuthenticateComponent";

function App() {
  return (
    <div className="App">
      <h1>Ethereum Smart Wallet</h1>
      <RegisterComponent />
      <AuthenticateComponent />
    </div>
  );
}

export default App;
