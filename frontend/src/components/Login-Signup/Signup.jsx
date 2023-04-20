import React, { useState } from "react";
import * as signupFunc from "./SignupFunctions";
import "./signup.css";
import { toast } from "react-toastify";

export default function Signup({ history }) {
  let [newUser, setnewUser] = useState({});
  const handleChangeEvent = (e, field) => {
    let fieldValue = e.target.value;
    setnewUser({ ...newUser, [field]: fieldValue });
  };

  // sign in
  const getToSignIn = (e) => {
    e.preventDefault();
    history.push("/login");
  };

  // submiting data to backend
  const submitData = (e) => {
    e.preventDefault();
    signupFunc.registerUser(newUser).then((response) => response.data);
    console.log(newUser);
    toast.success("User Registered Successfully");
    history.push("/login");
  };

  return (
    <div className="container">
      <div className="flex-container">
        <div className="row full">
          <div className="col-md-12">
            <div className="form-container">
              <div className="form-container-in"> </div>{" "}
              <div className="row sgnUp ">
                <div className="left-divider">
                  <div className="colcol">
                    <form onSubmit={(e) => submitData(e)}>
                      <section className="flexCont">
                        <section className="flexColR">
                          <div className="form-group2 sgnUpt">
                            <label htmlFor="name"> Name: </label>{" "}
                            <input
                              id="name"
                              type="text"
                              className="form-control sgnUp"
                              onChange={(e) => handleChangeEvent(e, "name")}
                            />{" "}
                          </div>{" "}
                          <div className="form-group2 sgnUpt">
                            <label htmlFor="email"> Email - ID: </label>{" "}
                            <input
                              required
                              id="email"
                              type="email"
                              className="form-control sgnUp"
                              onChange={(e) => handleChangeEvent(e, "email")}
                            />{" "}
                          </div>{" "}
                          <div className="form-group2 sgnUpt">
                            <label htmlFor="mob-number"> Mobile - No.: </label>{" "}
                            <input
                              required
                              id="mob-number"
                              type="text"
                              className="form-control sgnUp"
                              onChange={(e) => handleChangeEvent(e, "mobile")}
                            />{" "}
                          </div>{" "}
                        </section>
                        <section className="flexColL">
                          <div className="form-group2 sgnUpt">
                            <label htmlFor="password"> Password: </label>{" "}
                            <input
                              required
                              id="password"
                              type="password"
                              className="form-control sgnUp"
                              onChange={(e) => handleChangeEvent(e, "password")}
                            />{" "}
                          </div>{" "}
                          <div className="form-group2 sgnUpt">
                            <label htmlFor="question"> Question: </label>{" "}
                            <input
                              required
                              id="question"
                              type="text"
                              className="form-control sgnUp"
                              onChange={(e) => handleChangeEvent(e, "question")}
                            />{" "}
                          </div>{" "}
                          <div className="form-group2 sgnUpt">
                            <label htmlFor="answer"> Answer: </label>{" "}
                            <input
                              required
                              id="answer"
                              type="text"
                              className="form-control sgnUp"
                              onChange={(e) => handleChangeEvent(e, "answer")}
                            />{" "}
                          </div>{" "}
                        </section>
                      </section>
                      <div className="form-check form-check-inline rd">
                        <input
                          required
                          className="form-check-input"
                          type="radio"
                          id="Male"
                          name="gender"
                          value="Male"
                          onChange={(e) => handleChangeEvent(e, "gender")}
                        />{" "}
                        <label className="form-check-label" htmlFor="Male">
                          Male{" "}
                        </label>{" "}
                      </div>{" "}
                      <div className="form-check form-check-inline rd">
                        <input
                          required
                          className="form-check-input"
                          type="radio"
                          id="Female"
                          name="gender"
                          value="Female"
                          onChange={(e) => handleChangeEvent(e, "gender")}
                        />{" "}
                        <label className="form-check-label" htmlFor="Female">
                          Female{" "}
                        </label>{" "}
                      </div>{" "}
                      <div>
                        <br />
                        <small
                          className="form-text text-muted link-text"
                          style={{ fontSize: "1.2em" }}
                        >
                          Already a User ?
                        </small>{" "}
                        <span className="signuptext">
                          <a
                            href="/#"
                            onClick={(e) => getToSignIn(e)}
                            style={{ fontSize: "1.2em" }}
                          >
                            Sign - In{" "}
                          </a>{" "}
                        </span>{" "}
                      </div>{" "}
                      <div className="form-group2 sgnUpt">
                        <input
                          style={{ fontSize: "1.2em" }}
                          required
                          type="submit"
                          value="submit"
                          className="btn-primary btnn form-submit sub-btn sgnUp"
                        />
                      </div>{" "}
                    </form>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
