import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Card from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { toast } from "react-toastify";
import axios from "axios";
import useKycStatus from "../../hooks/useKycStatus";
import jwt_decode from "jwt-decode";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from "./utils";
let url = process.env.URL; url = url.replace(/\/undefined$/, "");
import "./PaymentTab.css";

const PaymentTab = () => {
  useKycStatus();
  const email = localStorage.getItem("email");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [issuer, setIssuer] = useState("");
  const [focused, setFocused] = useState("");
  const [formData, setFormData] = useState("");
  const [token, setToken] = useState("");
  const history = useHistory();
  const formRef = useRef(null);

  useEffect(() => {
    const tok = localStorage.getItem("authToken");
    const decoded = jwt_decode(tok);
    setToken(decoded.user);
  }, []);

  const handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      setIssuer(issuer);
    }
  };

  const handleInputFocus = ({ target }) => {
    setFocused(target.name);
  };

  const handleInputChange = ({ target }) => {
    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
      setNumber(target.value);
    } else if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
      setExpiry(target.value);
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value);
      setCvc(target.value);
    } else {
      setName(target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { issuer } = issuer;
    const formData = [...formRef.current.elements]
      .filter((d) => d.name)
      .reduce((acc, d) => {
        acc[d.name] = d.value;
        return acc;
      }, {});
    setFormData(formData);
    toast.success("Payment Successful");
    formRef.current.reset();
  };

  const moveToTicketPage = async (e) => {
    e.preventDefault();
    localStorage.setItem("paymentData", JSON.stringify(token));
    await axios.put(`${url}/api/login/bookings/?email=${email}`).then((res) => { history.push("/getTicket"); }).catch((err) => { console.log(err) });
  }

  const renderNamesOfPassenger = () => {
    let passArray = localStorage.getItem("nameData");
    if (passArray) {
      let nameArray = JSON.parse(passArray);
      return nameArray.map((name, idx) => {
        return <p key={idx}> {name} </p>;
      });
    }
  };

  const renderSeatNumbers = () => {
    let seatArray = localStorage.getItem("reservedSeats");
    if (seatArray) {
      let seaArr = JSON.parse(seatArray);
      return seaArr.map((seat, idx) => {
        return <p key={idx}> {seat} </p>;
      });
    }
  };

  const getSumTotal = () => {
    let count = 0;
    let tax = 150;
    let seatArray = localStorage.getItem("reservedSeats");
    if (seatArray) {
      let seaArr = JSON.parse(seatArray);
      for (let i = 0; i < seaArr.length; i++) {
        count++;
      }
      return (
        <div>
          <hr className="hr3" />
          <p> {1000 * count} </p> <p> +{tax} </p> <p> {1000 * count + tax} </p>{" "}
        </div>
      );
    }
  };

  return (
    <div className="paym">
      <div className="row" style={{ marginLeft: 0 }}>
        <div key="Payment">
          <div className="App-payment cl-1">
            <p className="pPayment"> Enter Credit card details </p>{" "}
            <Card
              number={number}
              name={name}
              expiry={expiry}
              cvc={cvc}
              focused={focused}
              callback={handleCallback}
            />{" "}
            <form
              className="credit-form"
              ref={(c) => setFormData(c)}
              onSubmit={handleSubmit}
            >
              <div className="form-group">
                <input
                  type="tel"
                  name="number"
                  className="frm-ctrl"
                  placeholder="Card Number"
                  pattern="[\d| ]{16,22}"
                  required
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />{" "}
              </div>{" "}
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  className="frm-ctrl"
                  placeholder="Name"
                  required
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />{" "}
              </div>{" "}
              <div className="form-group">
                <input
                  type="tel"
                  name="expiry"
                  className="frm-ctrl"
                  placeholder="Valid Thru"
                  pattern="\d\d/\d\d"
                  required
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />{" "}
              </div>{" "}
              <div className="form-group">
                <input
                  type="tel"
                  name="cvc"
                  className="frm-ctrl cvc"
                  placeholder="CVC"
                  pattern="\d{3,4}"
                  required
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />{" "}
              </div>{" "}
              <input type="hidden" name="issuer" value={issuer} />{" "}
              <div className="">
                <button
                  onClick={(e) => moveToTicketPage(e)}
                  className="btn btn-light btCustom"
                >
                  PAY{" "}
                </button>{" "}
              </div>{" "}
            </form>{" "}
          </div>{" "}
        </div>{" "}
        <div className="columnTwo">
          <h3> Pristine Travels </h3>{" "}
          <div>
            <p> BOOKING DETAILS </p>{" "}
            <div className="row" style={{ marginLeft: 0 }}>
              <div className="col-6 pt">
                <p className="hdng"> Username </p> <hr className="hr3" />
                <p className="hdng"> Date </p> <p className="hdng"> From </p>
                <p className="hdng"> To </p> <hr className="hr3" />
                <p className="hdng">
                  {" "}
                  Passengers{" "}
                </p> {renderNamesOfPassenger()} <hr className="hr3" />
                <p className="hdng"> Ticket price </p>{" "}
                <p className="hdng"> Tax </p> <p className="hdng"> Toal Sum </p>{" "}
              </div>{" "}
              <div className="col-6">
                <hr className="hr3" />
                <p className="usrName"> {localStorage.getItem("date")} </p>{" "}
                <p className="usrName"> {localStorage.getItem("start")} </p>{" "}
                <p className="usrName">
                  {" "}
                  {localStorage.getItem("destination")}{" "}
                </p>{" "}
                <hr className="hr3" />
                <p className="hdng">Seat No </p> {renderSeatNumbers()}{" "}
                <p> {getSumTotal()} </p>
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default PaymentTab;
