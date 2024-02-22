import React, { useEffect, useRef, useState } from "react";
import "./style.css";

const OtpInput = ({
  length,
  onSubmit,
}) => {
  const [otp, setOtp] = useState(Array.from({ length }, () => ""));
  const inputRefs = useRef([]);

  // focus at first input 
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value;

    const newOtp = [...otp];
    const regex = /^\d+$/;

    //check number only
    if (!regex.test(value.substring(value.length - 1))) {
      return;
    }

    newOtp[index] = value.substring(value.length - 1);

    setOtp(newOtp);

    const combineOtp = newOtp.join("");

    //submit otp automatically while fill all input 
    if (combineOtp.length === length) {
      onSubmit(combineOtp);
      return;
    }

    //after add one input it can focus next empty input
    for (let i = 0; i < length; i++) {
        if (inputRefs.current[i].value === "") {
        if (inputRefs.current[i]) {
          inputRefs.current[i].focus();
        }
        break;
      }
    }
  };

  const handleClick = (index) => {
    //always add cursor at end of input when we click at input
    inputRefs.current[index].setSelectionRange(1, 1);

    //shift focus on previous input if previous input is empty
    if(index > 0 && !otp[index-1]){
        inputRefs.current[otp.indexOf("")].focus();
    }
  };

  const handleKeyDown = (e, index) => {

    if (e.key === "Backspace") {

      //when backspace is clicked remove input value if input value is exist otherwise it focus on previous input 
      
      if (otp[index] !== "") {
        setOtp((otp) => {
          return otp.map((value, i) => {
            if (i === index) {
              return "";
            } else {
              return value;
            }
          });
        });
      } else {
        if (index !== 0) {
          if (inputRefs.current[index - 1]) {
            inputRefs.current[index - 1].focus();
          }
        }
      }
    }
  };

  return (
    <div className="inputContainer">
      {otp?.map((value, index) => (
        <input
          type="text"
          ref={(input) => (inputRefs.current[index] = input)}
          value={value}
          onClick={() => handleClick(index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onChange={(e) => handleChange(e, index)}
          key={index}
        />
      ))}
    </div>
  );
};

export default OtpInput;
