import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link, useNavigate } from "react-router-dom";
import AuthHeading from "../components/AuthHeading";
import AuthImage from "../components/AuthImage";
import { getSectionStyle } from "../data/Const";

const ChangePassword = () => {
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
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
            <AuthHeading heading="Change Password" />
            <form>
              <input
                className="text-sm w-full px-4 py-3 border focus:outline-blue-500 border-gray-300 rounded mt-4"
                type="password"
                placeholder="New Password"
              />
              <input
                className="text-sm w-full px-4 py-3 border focus:outline-blue-500 border-gray-300 rounded mt-4"
                type="password"
                placeholder="Confirm Password"
              />

              <div className="text-center md:text-left">
                <button
                  className="mt-7 bg-blue-600 hover:bg-blue-700 px-10 py-3 text-white uppercase rounded text-sm tracking-wider"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ChangePassword;
