import React, { useState } from "react";
import "./home.css";
import OtpInput from "../../component/OtpInput";

const Home = () => {
  const [showOtp, setShowOtp] = useState(false);
  const [error, setError] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(null);

  const handleChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const regex = /[^0-9]/g;
    if (phoneNumber.length < 10 || regex.test(phoneNumber)) {
      setError(true);
      return;
    }
    setError(false);
    setShowOtp(true);
  };

  return (
    <div className="container">
      <h3 className="title">Login With Phone</h3>
      {!showOtp ? (
        <>
          <input
            type="number"
            className="phoneInput"
            placeholder="Enter Phone Number"
            value={phoneNumber}
            onChange={handleChange}
          />
          {error && <span className="error">Enter 10 digit phoneNumber</span>}
          <button onClick={handleSubmit} className="send">
            Send Otp
          </button>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <span>Enter Otp sent To {phoneNumber}</span>
          <OtpInput
            length={4}
            phoneNumber={phoneNumber}
            onSubmit={(otp) => setOtp(otp)}
          />
          {otp && <span> Your Otp {otp}</span>}
        </div>
      )}
    </div>
  );
};

export default Home;
