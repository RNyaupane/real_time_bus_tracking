import React, { useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import busIcon from "/bus-lane.png";
import busIcon3 from "/ambulance.png";
import L from "leaflet";
import "./LiveBus.css";

const LiveBus = (props) => {
  const routeName = props.data;
  console.log(routeName);
  const [busLocations, setBusLocations] = useState([
    { id: "", latitude: "", longitude: "", route: "" },
    { id: "", latitude: "", longitude: "", route: "" },
    { id: "", latitude: "", longitude: "", route: "" },
    { id: "", latitude: "", longitude: "", route: "" },
    { id: "", latitude: "", longitude: "", route: "" },
    { id: "", latitude: "", longitude: "", route: "" },
  ]);

  const [webSocketReady, setWebSocketReady] = useState(false);

  const customIcons = [
    new L.Icon({
      iconUrl: busIcon,
      iconSize: [35, 35],
      popupAnchor: [0, -32],
    }),
    new L.Icon({
      iconUrl: busIcon,
      iconSize: [35, 35],
      popupAnchor: [0, -32],
    }),
    new L.Icon({
      iconUrl: busIcon,
      iconSize: [35, 35],
      popupAnchor: [0, -22],
    }),
    new L.Icon({
      iconUrl: busIcon,
      iconSize: [35, 35],
    }),
    new L.Icon({
      iconUrl: busIcon,
      iconSize: [35, 35],
      popupAnchor: [0, -32],
    }),
    new L.Icon({
      iconUrl: busIcon,
      iconSize: [35, 35],
      popupAnchor: [0, -22],
    }),
  ];

  const updateBusLocation = (
    index,
    route,
    newId,
    newLongitude,
    newLatitude
  ) => {
    setBusLocations((prevBusLocations) => {
      const updatedBusLocations = [...prevBusLocations];
      updatedBusLocations[index] = {
        route: route,
        id: newId,
        latitude: newLatitude,
        longitude: newLongitude,
      };
      return updatedBusLocations;
    });
  };

  useEffect(() => {
    const webSocket = new WebSocket("ws://10.0.130.34:8081/ws");

    webSocket.onopen = () => {
      console.log("WebSocket connection opened");
      setWebSocketReady(true);
    };

    webSocket.onmessage = function (event) {
      const responseData = event.data;
      const [route, id, newLongitude, newLatitude] = responseData.split(",");

      const busIndex = [
        "65b3e89c2cd0b0c4679cb14c",
        "65b3e8962cd0b0c4679cb14a",
        "65b3e88b2cd0b0c4679cb146",
        "65b56ac2febe1de52a1fb279",
        "65b56c0dfebe1de52a1fb27b",
        "65b56e41febe1de52a1fb2a1",
      ].indexOf(id);

      if (busIndex !== -1) {
        updateBusLocation(
          busIndex,
          route,
          id,
          parseFloat(newLongitude),
          parseFloat(newLatitude)
        );
      }
    };

    webSocket.onerror = function (error) {
      console.error("WebSocket error:", error);
    };

    // Cleanup WebSocket on component unmount
    return () => {
      webSocket.close();
    };
  }, []);

  return (
    <>
      {routeName !== undefined &&
        busLocations
          .filter((bus) => routeName === bus.route)
          .map((bus, index) => (
            <Marker
              key={index}
              position={[bus.latitude, bus.longitude]}
              icon={customIcons[index]}
            >
              <Popup className="flex items-center justify-center ps-3">
                {webSocketReady
                  ? `Bus ${index + 1}`
                  : "Connecting to WebSocket..."}
              </Popup>
            </Marker>
          ))}

      {routeName === "" ||
        (routeName === "All" &&
          busLocations.map((bus, index) => (
            <Marker
              key={index}
              position={[bus.latitude, bus.longitude]}
              icon={customIcons[index]}
            >
              <Popup className="flex items-center justify-center ps-3 my-popup">
                {/* {webSocketReady
                ? `Bus ${index + 1}`
                : "Connecting to WebSocket..."} */}
                <div className="card-bus">
                  <h3>Bus Information</h3>
                  <img src="/busImage.jpg" alt="Bus Image" />
                  <strong>
                    BusNo: <span>KTM-123</span>
                  </strong>
                  <br />
                  <strong>
                    Speed: <span>43 km/hr</span>
                  </strong>
                  <br />
                </div>
              </Popup>
            </Marker>
          )))}
    </>
  );
};

export default LiveBus;
