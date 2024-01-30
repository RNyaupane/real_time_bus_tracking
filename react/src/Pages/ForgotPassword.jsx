import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthHeading from "../components/AuthHeading";
import AuthImage from "../components/AuthImage";
import { getSectionStyle } from "../data/Const";

const ForgotPassword = () => {
  const sectionStyle = getSectionStyle();

  return (
    <>
      <section
        className="lg:bg-cover lg:bg-center lg:bg-no-repeat"
        style={sectionStyle}
      >
        <div className="h-[85vh] bg-white flex relative top-[50px] lg:mx-32 xl:mx-52 lg:shadow-2xl lg:rounded-[50px] flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
          <AuthImage />

          <div className="md:w-1/3 max-w-sm ms-[-5px]">
            <AuthHeading heading="Forgot Password" />
            <form>
              <input
                className="text-sm w-full px-4 py-3 border focus:outline-blue-500 border-gray-300 rounded mt-4"
                type="email"
                placeholder="Email Address"
              />
            </form>

            <div className="text-center md:text-left">
              <button
                className="mt-7 bg-blue-600 hover:bg-blue-700 px-10 py-3 text-white uppercase rounded text-sm tracking-wider"
                type="submit"
              >
                Send otp
              </button>
            </div>
            <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
              Remember Password?{" "}
              <Link
                to="/login"
                className=" text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4 cursor-pointer"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;
