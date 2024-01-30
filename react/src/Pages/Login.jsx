import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthHeading from "../components/AuthHeading";
import AuthImage from "../components/AuthImage";
import { getSectionStyle } from "../data/Const";
import { formDataToJson } from "./Signup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { LocalStorageManager } from "./utils";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const sectionStyle = getSectionStyle();
  const location = useLocation();
  const navigate = useNavigate();

  // Function to handle form submission
  async function handleSubmit(event) {
    const mystorage = new LocalStorageManager();
    event.preventDefault(); // Prevent default form submission

    const APIS_URL = "http://10.0.130.52:3000";
  // const APIS_URL = "http://localhost:3000";

    const form = event.target;
    const data = formDataToJson(form);

    // Send form data via Axios POST request
    await axios
      .post(APIS_URL + "/api/v1/users/login", data)
      .then((response) => {
        const {
          data: { user },
          token,
        } = response.data;

        if (user) {
          toast.success("Welcome to SmartMove!");
          LocalStorageManager.setValue("user", user);
          LocalStorageManager.setValue("token", token);
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      })
      .catch((error) => {
        console.log(error);
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
            <AuthHeading heading="Login" />
            <form onSubmit={handleSubmit}>
              <input
                className="text-sm w-full px-4 py-3 border focus:outline-blue-500 border-gray-300 rounded mt-4"
                placeholder="Phone Number"
                name="phone"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="text-sm w-full px-4 py-3 border focus:outline-blue-500 border-gray-300 rounded mt-4"
                type="password"
                placeholder="Password"
                value={password}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="text-center md:text-left">
                <button
                  className="mt-7 bg-blue-600 hover:bg-blue-700 px-10 py-3 text-white uppercase rounded text-sm tracking-wider"
                  type="submit"
                >
                  Login
                </button>
              </div>
            </form>
            <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className=" text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4 cursor-pointer"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
