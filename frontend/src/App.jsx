import React, { useEffect, useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Homepage from "./components/Homepage/Homepage";
import RouteSelection from "./components/RouteSelection/RouteSelection";
import LogOrsign from "./components/Login-Signup/LogOrsign";
import Signup from "./components/Login-Signup/Signup";
import Profile from "./components/Profile/Profile";
import TicketPage from "./components/TicketPage/TicketPage";
import ForgotPassword from "./components/Login-Signup/ForgotPassword";
import ResetPassword from "./components/Login-Signup/ResetPassword";
import AdminHome from "./components/Homepage/AdminHome";
import PreviousHistory from "./components/PrevHist/PreviousHistory";
import KycApprovalList from "./components/KYC/KycApprovalList";
import KycApproval from "./components/KYC/KycApproval";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import KycCall from "./components/KYC/KycCall";

function App({ user }) {
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Router>
        <Switch>
          <Route path="/" exact render={(props) => <Homepage {...props} />} />
          <Route path="/login" render={(props) => <LogOrsign {...props} />} />
          <Route path="/register" render={(props) => <Signup {...props} />} />
          <Route path="/prevHist" render={(props) => <PreviousHistory {...props} />} />
          <Route
            path="/routes"
            exact
            render={(props) => <RouteSelection {...props} />}
          />

          <Route
            path="/adminhome"
            exact
            render={(props) => <AdminHome {...props} />}
          />

          <Route
            path="/kycList"
            exact
            render={(props) => <KycApprovalList {...props} />}
          />

          <Route
            path="/kycApproval"
            exact
            render={(props) => <KycApproval {...props} />}
          />

          <Route
            path="/kyc"
            exact
            render={(props) => <KycCall {...props} />}
          />

          <Route
            path="/profile"
            exact
            render={(props) => <Profile {...props} />}
          />
          <Route
            path="/getTicket"
            exact
            render={(props) => <TicketPage {...props} />}
          />
          <Route
            path="/forgot"
            exact
            render={(props) => <ForgotPassword {...props} />}
          />
          <Route
            path="/reset"
            exact
            render={(props) => <ResetPassword {...props} />}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
