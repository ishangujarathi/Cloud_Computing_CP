import React from "react";
import "./adminhome.css";

function AdminHome() {
  const role = sessionStorage.getItem("role");
  return (
    <>
      {role === "admin" ? (
        <div className="container">
          <h1>Welcome, Admin!</h1>
          <div className="button-container">
            <button
              className="approve-kyc"
              onClick={(e) => {
                e.preve();
                history.push("/kycApprove");
              }}
            >
              Approve KYC
            </button>
            <button
              className="payment-approval"
              onClick={(e) => {
                e.preve();
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
