import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthHeading from "../components/AuthHeading";
import AuthImage from "../components/AuthImage";
import { getSectionStyle } from "../data/Const";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export function formDataToJson(form) {
  const formData = new FormData(form);

  // Convert FormData to a JavaScript object
  const formDataObject = {};
  formData.forEach((value, key) => {
    formDataObject[key] = value;
  });

  // Convert JavaScript object to a JSON string
  const formDataJson = formDataObject;

  return formDataJson;
}

const Signup = () => {
  const sectionStyle = getSectionStyle();
  const navigate = useNavigate();

  // Function to handle form submission
  function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission

    const APIS_URL = "http://10.0.130.52:3000";
  // const APIS_URL = "http://localhost:3000";

    const form = event.target;
    const data = formDataToJson(form);

    // Send form data via Axios POST request
    axios
      .post(APIS_URL + "/api/v1/users/signup", data)
      .then((response) => {
        toast.success("Your account has been created!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((error) => {
        toast.error("Error submitting form!");
      });
  }

  return (
    <>
      <section
        className="lg:bg-cover lg:bg-center lg:bg-no-repeat"
        style={sectionStyle}
      >
        <div className="h-[85vh] bg-white flex relative top-[50px] lg:mx-32 xl:mx-52 lg:shadow-2xl lg:rounded-[50px] flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
          <AuthImage />
          <div className="md:w-1/3 max-w-sm ms-[-5px]">
            <AuthHeading heading="Create an Account" />
            <form onSubmit={handleSubmit}>
              <input
                className="text-sm w-full px-4 py-3 border focus:outline-blue-500 border-gray-300 rounded"
                type="text"
                placeholder="Full Name"
                name="fullname"
              />
              <input
                className="text-sm w-full px-4 py-3 border focus:outline-blue-500 border-gray-300 rounded mt-4"
                type="text"
                placeholder="Phone Number"
                name="phone"
              />
              <input
                className="text-sm w-full px-4 py-3 border focus:outline-blue-500 border-gray-300 rounded mt-4"
                type="password"
                placeholder="Password"
                name="password"
              />
              <div className="text-center md:text-left">
                <button
                  className="mt-6 bg-blue-600 hover:bg-blue-700 px-5 py-3 text-white uppercase rounded text-sm tracking-wider"
                  type="submit"
                >
                  Sign up
                </button>
              </div>
            </form>

            <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4 cursor-pointer"
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

export default Signup;
