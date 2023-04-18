import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./ForgotPassword.css";

let url;

process.env.NODE_ENV === "production"
  ? (url = process.env.URL)
  : (url = "http://localhost:8080");

function ForgotPassword() {
  const history = useHistory();
  const [answer, setAnswer] = useState("");
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(
        `${url}/login/answer/?answer=${answer}&email=${email}`
      );
      if (response.data.response === true) {
        history.push({pathname: "/reset", state:  email });
        console.log(`Response is : ${JSON.stringify(response)}`);
      } else {
        alert("Incorrect answer");
        console.log(`Response is : ${JSON.stringify(response)}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEmailSubmit = async (event) => {
    event.preventDefault();

    const res = await axios.get(`${url}/login/question/?email=${email}`);

    setQuestion(res.data.question);

    console.log(`The response is: ${JSON.stringify(res)}`);
  };

  return (
    <div className="form-container">
      {!question ? (
        <form onSubmit={handleEmailSubmit} className="glassmorphic-form">
          <h2>Forgot Password</h2>
          <label htmlFor="email">Email: </label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <button type="submit">Proceed</button>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className="glassmorphic-form">
          <h2>Forgot Password</h2>
          <label htmlFor="answer">{question}</label>
          <input
            id="answer"
            type="text"
            value={answer}
            onChange={(event) => setAnswer(event.target.value)}
            required
          />
          <button type="submit">Reset Password</button>
        </form>
      )}
    </div>
  );
}

export default ForgotPassword;
