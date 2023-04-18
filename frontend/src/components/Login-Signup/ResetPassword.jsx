import React, { useState } from "react";
import axios from "axios";
import "./ResetPassword.css"; // import CSS file for styling
let url;

process.env.NODE_ENV === 'production' ? url = process.env.URL : url = "http://localhost:8080";

function ResetPassword({ hash }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        "${url}/reset-password",
        { hash, password }
      );
      console.log(response.data); // log response from server
      setSuccess(true);
    } catch (error) {
      console.error(error);
      setError("Error resetting password.");
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Reset Password</h2>
      {!success ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="password">New Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
          />
          {error && <div className="error">{error}</div>}
          <button type="submit">Reset Password</button>
        </form>
      ) : (
        <div className="success-message">
          Your password has been successfully reset.
        </div>
      )}
    </div>
  );
}

export default ResetPassword;
