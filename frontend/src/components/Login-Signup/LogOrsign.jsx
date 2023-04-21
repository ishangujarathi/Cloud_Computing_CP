import React, { useState } from "react";
import "./logOrsign.css";
import axios from "axios";
import { toast } from "react-toastify";
let url;

process.env.NODE_ENV === "production"
  ? (url = process.env.URL)
  : (url = "http://localhost:8080");

export default function LogOrsign({ history }) {
  let [userData, setUserData] = useState({});

  const getToSignUp = (e) => {
    e.preventDefault();
    history.push("/register");
  };
  const handleChangeEvent = (e, title) => {
    let value = e.target.value;
    setUserData({ ...userData, [title]: value });
  };

  const submitData = async (e) => {
    e.preventDefault();
    // console.log(userData)
    try {
      let apiUrl = `${url}/api/login`;
      const res = await axios.post(apiUrl, userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { token, role, email, name, bookings, kycStatus } = res.data;
      console.log(`Role is: ${JSON.stringify(res)}`);
      localStorage.setItem("authToken", token);
      localStorage.setItem("role", role);
      localStorage.setItem("email", email);
      localStorage.setItem("name", name);
      localStorage.setItem("numOfBookings", bookings);
      localStorage.setItem("kycStatus", kycStatus);
      toast.success("Login Successful");
      if (kycStatus === false && role === "user") {
        history.push("/kyc");
      }
      else {
        role === "user" ? history.push("/routes") : history.push("/adminhome");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleForgot = (e) => {
    history.push("/forgot");
  };

  return (
    <div className="container">
      <section className="myform-area">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="form-area login-form">
                <div className="form-content">
                  <h2>Login</h2>
                </div>
                <div className="form-input">
                  <h2>Enter Credentials</h2>
                  <form
                    onSubmit={(e) => {
                      submitData(e);
                    }}
                  >
                    <div className="form-group">
                      <input
                        className="loginInfo"
                        type="email"
                        name="name"
                        required
                        onChange={(e) => handleChangeEvent(e, "email")}
                      />
                      <label>Email-Id</label>
                    </div>
                    <div className="form-group">
                      <input
                        className="loginInfo"
                        type="password"
                        name="password"
                        required
                        onChange={(e) => handleChangeEvent(e, "password")}
                      />
                      <label>password</label>
                    </div>
                    <div className="myform-button">
                      <button type="submit" className="myform-btn">
                        Login
                      </button>
                    </div>
                    <div>
                      <small
                        className="form-text text-muted signup-text"
                        style={{ fontSize: "1.1rem" }}
                      >
                        Already a User?
                      </small>
                    </div>
                    &nbsp;&nbsp;&nbsp;
                    <span className="signUPtext">
                      <a
                        href="/#"
                        onClick={(e) => getToSignUp(e)}
                        className="signup-a"
                        style={{ fontSize: "1.1rem" }}
                      >
                        Sign-Up
                      </a>
                    </span>
                  </form>
                  <button
                    className="forgotPassword"
                    onClick={handleForgot}
                    style={{ fontSize: "1em", marginLeft: "10px" }}
                  >
                    Forgot Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
