import React, { useState } from "react";
import { toast } from "react-toastify";
import styles from "./kycall.module.css";
import axios from "axios";
let url = process.env.URL; url = url.replace(/\/undefined$/, "");

const KycCall = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [aadhaarCard, setAadhaarCard] = useState(null);
  const [passport, setPassport] = useState(null);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("aadhaar", aadhaarCard);
    formData.append("passport", passport);

    axios.post(`${url}/api/kyc`, formData).then((response) => {
      console.log(response.data);
      toast.success("KYC Submitted Successfully");
    }).catch((err) => {
      console.log(err.message);
      toast.error(`KYC Submission Failed: ${err.message}`);
    })
  };

  const handleAadhaarCardChange = (event) => {
    setAadhaarCard(event.target.files[0]);
  };

  const handlePassportChange = (event) => {
    setPassport(event.target.files[0]);
  };

  return (
    <form onSubmit={handleFormSubmit} className={styles.form}>
      <div>
        <label htmlFor="full-name" className={styles.label}>
          Full Name:
        </label>
        <input
          type="text"
          id="full-name"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          className={styles.input}
        />
      </div>
      <div>
        <label htmlFor="email" className={styles.label}>
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={styles.input}
        />
      </div>
      <div>
        <label htmlFor="phone" className={styles.label}>
          Phone:
        </label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          className={styles.input}
        />
      </div>
      <div>
        <label htmlFor="address" className={styles.label}>
          Address:
        </label>
        <textarea
          id="address"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          className={styles.input}
        />
      </div>
      <div>
        <label htmlFor="aadhaar-card" className={styles.label}>
          Aadhaar Card:
        </label>
        <input
          type="file"
          id="aadhaar-card"
          accept=".jpg,.jpeg,.png"
          onChange={handleAadhaarCardChange}
          className={styles.input}
        />
      </div>
      <div>
        <label htmlFor="passport" className={styles.label}>
          Passport:
        </label>
        <input
          type="file"
          id="passport"
          accept=".jpg,.jpeg,.png"
          onChange={handlePassportChange}
          className={styles.input}
        />
      </div>
      <button type="submit" className={styles.button}>
        Submit
      </button>
    </form>

  );
};

export default KycCall;
