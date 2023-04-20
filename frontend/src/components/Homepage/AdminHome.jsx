import React from "react";
import "./adminhome.css";

function AdminHome() {
  return (
    <div className="container">
      <h1>Welcome, Admin!</h1>
      <div className="button-container">
        <button className="approve-kyc">Approve KYC</button>
        <button className="payment-approval">Payment Approval</button>
      </div>
    </div>
  );
}

export default AdminHome;
