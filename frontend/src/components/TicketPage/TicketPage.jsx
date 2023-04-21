import React from "react";
import "./TicketPage.css";
import axios from "axios";
import { toast } from "react-toastify";
import useKycStatus from "../../hooks/useKycStatus";

export default function TicketPage({ history }) {
  useKycStatus();
  const handleSignOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("authToken");
    localStorage.removeItem("reservedSeats");
    localStorage.removeItem("nameData");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("numOfBookings");
    localStorage.clear();
    toast.success("Logged Out");
    history.push("/");
  };
  const handleBookAgainIcon = (e) => {
    e.preventDefault();
    history.push("/routes");
  };



  const email = localStorage.getItem("email");
  let from = localStorage.getItem("start");
  let to = localStorage.getItem("destination");
  let nameArray = localStorage.getItem("nameData");
  let names = JSON.parse(nameArray);
  let noArray = localStorage.getItem("reservedSeats");
  let arr = JSON.parse(noArray);
  let tokenData = localStorage.getItem("selectedBusId");
  let dat = localStorage.getItem("date");

  const handleClick = async (e) => {
    e.preventDefault();

    const data = {
      email: email,
      start: from,
      destination: to,
      namesData: names,
      reservedSeats: arr,
      selectedBusId: tokenData,
      date: dat,
    }

    axios.post("http://localhost:8080/api/ticket", data).then((res) => { toast.success(res.data.message) }).catch((err) => { toast.error(err) });
  }

  return (
    <div className="container" style={{ color: "black" }}>
      <div>
        <nav
          className="mb-4 navbar navbar-expand-lg navbar-dark bg-unique hm-gradient"
          style={{ marginTop: "-17%" }}
        >
          <a href="/#" className="navbar-brand Company-Log">
            UT
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent-3"
            aria-controls="navbarSupportedContent-3"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent-3"
          >
            <ul className="navbar-nav ml-auto nav-flex-icons ic">
              <li className="nav-item">
                <a
                  href="/#"
                  className="nav-link waves-effect waves-light"
                  onClick={(e) => handleBookAgainIcon(e)}
                >
                  Book Again
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="/#"
                  className="nav-link waves-effect waves-light"
                  onClick={(e) => handleSignOut(e)}
                >
                  Sign-Out
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="tpMain">
        <article className="ticket">
          <header className="ticket__wrapper">
            <div className="ticket__header">1 🎟 PRISTINE TRAVELS</div>
          </header>
          <div className="ticket__divider">
            <div className="ticket__notch"></div>
            <div className="ticket__notch ticket__notch--right"></div>
          </div>
          <div className="ticket__body">
            <section className="ticket__section">
              <div>
                <p>From: {from}</p>
                <p>To: {to}</p>
              </div>
              {arr.map((element, idx) => (
                <div key={idx}>
                  <p className="seatNo">{element}</p>
                </div>
              ))}
              <p>
                Your seats are together <span><p>On: {dat}, 10 AM (Hourly commute)</p></span>
              </p>
            </section>
            <section className="ticket__section">
              <h3>Passenger Names</h3>
              {names.map((name, idx) =>
                <div key={idx}>
                  <p className="names">{name}</p>
                </div>
              )}
            </section>
            <section className="ticket__section">
              <h3>Payment Method</h3>
              <p>Credit Card</p>
            </section>
          </div>
          <footer className="ticket__footer">
            <p>Transaction-ID</p>
            <p className="idData">{tokenData}</p>;
          </footer>
          <button style={{ padding: "1vw", borderRadius: "2vw", fontSize: "larger" }} onClick={handleClick}>LOCK KIYA JAE</button>
        </article>
      </div>
    </div>
  );
}
