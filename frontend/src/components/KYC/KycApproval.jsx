import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import styles from "./kycapproval.module.css";

let url = 'https://bussp.azurewebsites.net'; url = url.replace(/\/undefined$/, "");

const KycApproval = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [imagePopupUrl, setImagePopupUrl] = useState(null);
  const location = useLocation();
  const email = location.state.email;

  useEffect(() => {
    // fetch user information from the server
    const fetchUserInfo = async () => {
      try {
        await axios.get(`${url}/api/kyc/?email=${email}`).then((res) => {
          toast.success("KYC Request Loaded");
          setUserInfo(res.data);
        }).catch((err) => {
          console.log(`Error is: ${err}`);
          toast.error("Error in loading KYC Request" + err)
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserInfo();
  }, []);

  const handleImageClick = (url) => {
    setImagePopupUrl(url);
  };

  const handlePopupClose = () => {
    setImagePopupUrl(null);
  };

  const handleApprove = async (e) => {
    e.preventDefault();

    await axios.put(`${url}/api/kyc/approve`, { email }).then((res) => {
      toast.success("KYC Request Approved");
      setUserInfo(res.data);
    }).catch((err) => {
      console.log(`Error is: ${err}`);
      toast.error("Error in approving KYC Request" + err)
    });
  }

  return (
    <div className={styles.container}>
      {userInfo ? (
        <div className={styles.userInfoContainer}>
          <h1>KYC Approval</h1>
          <div className={styles.userInfo}>
            <p>Name: {userInfo.fullName}</p>
            <p>Email: {userInfo.email}</p>
            <p>Address: {userInfo.address}</p>
            <p>Phone: {userInfo.phone}</p>
          </div>
          <div className={styles.imageButtonContainer}>
            <button onClick={() => handleImageClick(userInfo.aadhaarUrl)}>
              View Aadhaar
            </button>
            <button onClick={() => handleImageClick(userInfo.passportUrl)}>
              View Passport
            </button>
            <button onClick={(e) => handleApprove(e)}>Approve</button>
          </div>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
      {imagePopupUrl &&
        createPortal(
          <div className={styles.popup} onClick={handlePopupClose}>
            <img src={imagePopupUrl} alt="Popup" className={styles.popupImage} />
          </div>,
          document.body
        )}
    </div>
  );
};

export default KycApproval;
