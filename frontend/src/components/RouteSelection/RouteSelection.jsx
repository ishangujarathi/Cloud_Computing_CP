import React from "react";
import RouteSelector from "../routeSelector/Routeselector";
import SeatSelection from "../SeatSelection/SeatSelection";
import PaymentTab from "../PaymentTab/PaymentTab";
import { toast } from "react-toastify";
import useKycStatus from "../../hooks/useKycStatus";

export default function RouteSelection({ history }) {
  useKycStatus();
  const handleUserIcon = (e) => {
    e.preventDefault();
    history.push("/profile");
  };

  const handleSignOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("authToken");
    localStorage.removeItem("reservedSeats");
    localStorage.removeItem("nameData");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("numOfBookings");
    localStorage.clear();
    toast.success("Logged Out Successfully");
    history.push("/");
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    history.push("/routes");
  };

  return (
    <div className="container">
      <div style={{ marginTop: "10%" }}>
        <nav className="mb-4 navbar navbar-expand-lg navbar-dark bg-unique hm-gradient">
          <a
            href="/#"
            className="navbar-brand Company-Log"
            onClick={(e) => handleLogoClick(e)}
          >
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
                  onClick={(e) => handleUserIcon(e)}
                >
                  <i className="fa fa-user user"></i>
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
      <div>
        <ul className="nav nav-pills">
          <li className="nav-item">
            <a className="nav-link active" data-toggle="pill" href="#home">
              Select Bus
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link " data-toggle="pill" href="#menu1">
              Select Seat
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="pill" href="#menu2">
              Payment
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" style={{ cursor: "pointer" }} data-toggle="pill" onClick={(e) => { e.preventDefault(); history.push("/prevHist") }}>
              My Passes
            </a>
          </li>
        </ul>

        <div className="tab-content">
          <div className="tab-pane container active mn-box" id="home">
            <RouteSelector />
          </div>
          <div className="tab-pane container fade mn-box" id="menu1">
            <SeatSelection />
          </div>
          <div className="tab-pane container fade mn-box" id="menu2">
            <PaymentTab />
          </div>
        </div>
      </div>
    </div>
  );
}
