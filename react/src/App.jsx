import { useState } from "react";
import "./App.css";
import Button from "@mui/material/Button";
import Signup from "./Pages/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import ForgotPassword from "./Pages/ForgotPassword";
import OtpVerification from "./Pages/otpVerification";
import ChangePassword from "./Pages/ChangePassword";
import Home from "./Pages/Home";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminLogin from "./Pages/AdminLogin";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          <Route path="/otp-verification" element={<OtpVerification />}></Route>
          <Route path="/change-password" element={<ChangePassword />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/:name" element={<Home />}></Route>
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
