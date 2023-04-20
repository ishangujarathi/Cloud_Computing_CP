import React, { useState } from "react";

const KycCall = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [aadhaarCard, setAadhaarCard] = useState(null);
  const [passport, setPassport] = useState(null);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // do something with the form data, such as send it to a server
  };

  const handleAadhaarCardChange = (event) => {
    setAadhaarCard(event.target.files[0]);
  };

  const handlePassportChange = (event) => {
    setPassport(event.target.files[0]);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="full-name">Full Name:</label>
        <input
          type="text"
          id="full-name"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="phone">Phone:</label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="address">Address:</label>
        <textarea
          id="address"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="aadhaar-card">Aadhaar Card:</label>
        <input
          type="file"
          id="aadhaar-card"
          accept=".jpg,.jpeg,.png"
          onChange={handleAadhaarCardChange}
        />
      </div>
      <div>
        <label htmlFor="passport">Passport:</label>
        <input
          type="file"
          id="passport"
          accept=".jpg,.jpeg,.png"
          onChange={handlePassportChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default KycCall;
