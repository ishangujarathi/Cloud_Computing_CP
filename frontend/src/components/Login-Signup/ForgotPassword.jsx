import React, { useState } from "react";
import axios from "axios";
import "./ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/forgot-password",
        { email }
      );
      console.log(response.data); // log response from server
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="glassmorphic-form">
        <h2>Forgot Password</h2>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}

export default ForgotPassword;