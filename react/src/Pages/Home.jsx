import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import MapContanter from "../container/MapContanter";
import Nav from "../container/Nav";
import SideBar from "../container/SideBar";

const Home = () => {
  const [currentLocation, setCurrentLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [message, setMessage] = useState("Your Current Location");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  }, []);

  return (
    <>
      {/* <Navbar /> */}
      <Nav />
      {/* <SideBar /> */}
      <MapContanter data={currentLocation} message={message} />
    </>
  );
};

export default Home;
