import React from "react";
import { useHistory } from "react-router-dom";
import "./adminhome.css";

function AdminHome() {
  const role = localStorage.getItem("role");
  const history = useHistory();
  return (
    <>
      {role === "admin" ? (
        <div className="container">
          <h1>Welcome, Admin!</h1>
          <div className="button-container">
            <button
              className="approve-kyc"
              onClick={(e) => {
                e.preventDefault();
                history.push("/kycList");
              }}
            >
              Approve KYC
            </button>
            <button
              className="payment-approval"
              onClick={(e) => {
                e.preventDefault();
                history.push("/paymentApprove");
              }}
            >
              Payment Approval
            </button>
          </div>
        </div>
      ) : (
        <h1>Not Authorized</h1>
      )}
    </>
  );
}

export default AdminHome;
