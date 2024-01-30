import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { LocalStorageManager } from "./utils";
import { formDataToJson } from "./Signup";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // Function to handle form submission
  async function handleSubmit(event) {
    const mystorage = new LocalStorageManager();
    event.preventDefault(); // Prevent default form submission

    const APIS_URL = "http://10.0.130.137:3000";

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
        console.log(user);

        if (user.role === "admin") {
          toast.success("Login successfully!");
          LocalStorageManager.setValue("user", user);
          LocalStorageManager.setValue("token", token);
          setTimeout(() => {
            navigate("/admin");
          }, 2000);
        } else {
          toast.error("You are not an Admin!");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Login Failed!");
      });
  }
  return (
    <>
      <div className="flex items-center min-h-screen justify-center p-6 bg-gray-50 dark:bg-gray-900">
        <div className="flex items-center shadow-xl w-[500px] justify-center p-6 sm:p-12 ">
          <div className="w-full">
            {/* Add the photo here */}
            <img
              className="mb-5  mx-auto rounded-full h-20 w-20"
              src="/admin.png"
              alt="Your Photo"
            />

            <h1 className="mb-4 text-4xl text-center font-semibold text-gray-700 dark:text-gray-200">
              Login
            </h1>
            <form onSubmit={handleSubmit}>
              <label className="block text-base">
                <span className="text-gray-700 dark:text-gray-400">Email</span>
                <input
                  className="text-sm w-full px-4 py-3 border focus:outline-blue-500 border-gray-300 rounded mt-2"
                  placeholder="Phone Number"
                  name="phone"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label className="block my-6 text-sm">
                <span className="text-gray-700 dark:text-gray-400">
                  Password
                </span>
                <input
                  className="text-sm w-full px-4 py-3 border focus:outline-blue-500 border-gray-300 rounded mt-2"
                  type="password"
                  placeholder="Password"
                  value={password}
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <button
                type="submit"
                className="flex w-full mt-10 justify-center bg-blue-600 hover:bg-blue-700 px-10 py-3 text-white uppercase rounded text-sm tracking-wider cursor-pointer"
              >
                Log in
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
