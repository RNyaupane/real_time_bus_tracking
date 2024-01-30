import React, { useState } from "react";
import OTPInput, { ResendOTP } from "otp-input-react";
import AuthHeading from "../components/AuthHeading";
import AuthImage from "../components/AuthImage";
import { getSectionStyle } from "../data/Const";

const maskEmail = (email) => {
  const [username, domain] = email.split("@");
  const maskedUsername = `${username.slice(0, 3)}***${username.slice(-2)}`;

  return `${maskedUsername}@${domain}`;
};

const OtpVerification = () => {
  const [OTP, setOTP] = useState("");
  const sectionStyle = getSectionStyle();
  const maskedEmail = maskEmail("neupaner590@gmail.com");

  return (
    <>
      <section
        className="lg:bg-cover lg:bg-center lg:bg-no-repeat"
        style={sectionStyle}
      >
        <div className="h-[85vh] bg-white flex relative top-[50px] lg:mx-32 xl:mx-52 lg:shadow-2xl lg:rounded-[50px] flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
          <AuthImage />

          <div className="md:w-1/3 max-w-sm ms-[-5px]">
            <AuthHeading heading="Enter OTP" />
            <form>
              <OTPInput
                value={OTP}
                onChange={setOTP}
                autoFocus
                className="otp__code__container mb-5"
                OTPLength={4}
                otpType="number"
                disabled={false}
              // secure
              />
              <ResendOTP
                className=" "
                handelResendClick={() => console.log("Resend clicked")}
              />

              <div className="text-center md:text-left">
                <button
                  className="mt-7 bg-blue-600 hover:bg-blue-700 px-10 py-3 text-white uppercase rounded text-sm tracking-wider"
                  type="submit"
                >
                  Verify
                </button>
              </div>
            </form>
            <div className="mt-4 font-semibold text-center text-sm text-slate-500 text-center md:text-left">
              One Time Password (OTP) has been sent to{" "}
              <p className=" text-gray-700 underline cursor-pointer">
                {maskedEmail}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OtpVerification;
