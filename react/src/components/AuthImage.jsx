import React from "react";
import authBg from "../assets/authBg.jpg";

const AuthImage = () => {
  return (
    <>
      <div className="md:w-[75%] hidden md:block max-w-sm">
        <img src={authBg} alt="Sample image" />
      </div>
    </>
  );
};

export default AuthImage;
