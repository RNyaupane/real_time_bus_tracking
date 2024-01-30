import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  LayerGroup,
  Polyline,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet/dist/leaflet.js";
import BusStationData from "../data/BusStation";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import "./mymap.css";

import { FaBus } from "react-icons/fa";
import LiveBus from "../components/LiveBus";
import Nav from "../container/Nav";
import * as busSimulator from "../../../server/utils/busData";
import BusRouteCard, { StyledRouteBox } from "./Card";
import { Box } from "@mui/material";

var greenIcon = L.icon({
  iconUrl: "/walking-icon-png.jpg",
  iconSize: [40, 40], // size of the icon
});

var busStopIcon = L.icon({
  iconUrl: "/bus_stop2.png",
  iconSize: [30, 30],
});

var toiletIcon = L.icon({
  iconUrl: "/toilets.png",
  iconSize: [30, 30],
});

const busIcon = L.icon({
  iconUrl: "/busIcon.png",
  iconSize: [30, 30],
});

const markerIcon = L.icon({
  iconUrl: "/marker3.png",
  iconSize: [45, 45],
});

greenIcon.setIconSize;

const MapContanter = (props) => {
  const [busPosition, setBusPosition] = useState({
    latitude: 27.694183956841236,
    longitude: 85.32127098355981,
  });

  const [curBusPosition, setCurBusPosition] = useState(null);
  const [busStops, setBusStops] = useState([]);
  const [busRoutes, setBusRoutes] = useState([]);
  const [desinationMarker, setDestinationMarker] = useState([]);
  const [routeName, setRouteName] = useState("");

  const greenOptions = { color: "green", fillColor: "green" };
  const APIS_URL = "http://10.0.130.52:3000";
  // const APIS_URL = "http://localhost:3000";

  // Simulate updating bus position every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Replace the following with your actual API call to get live tracking data
      const updatedBusPosition = {
        latitude: Math.random() * 0.01 + busPosition.latitude,
        longitude: Math.random() * 0.01 + busPosition.longitude,
      };

      setBusPosition(updatedBusPosition);
    }, 5000);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [busPosition]);

  useEffect(() => {
    // Function to handle bus position updates
    function handleBusPositionUpdate(position) {
      // console.log("Bus position updated:", position);
      setCurBusPosition(position);
      // You can perform any action with the updated position here
    }

    // Start the bus simulation
    // busSimulator.startBusSimulation(handleBusPositionUpdate);

    // Stop the simulation after some time (for demonstration purposes)
    setTimeout(() => {
      busSimulator.stopBusSimulation();
    }, 30000); // Stop after 30 seconds
  }, []);

  function getAllBusStopByRoute(routeId) {
    axios
      .get(APIS_URL + "/api/v1/routes/" + routeId)
      .then((response) => {
        const { stops: data } = response.data.data.data;
        const routeName = response.data.data.data.routeName;
        setBusStops(data);
        setRouteName(routeName);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getAllBusRoutes() {
    axios
      .get(APIS_URL + "/api/v1/routes")
      .then((res) => {
        const { data } = res.data.data.data;
        setBusRoutes(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getAllBusStop() {
    axios
      .get(APIS_URL + "/api/v1/busstops")
      .then((response) => {
        const { data } = response.data.data.data;
        setBusStops(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getAllToilets() {
    axios
      .get(APIS_URL + "/api/v1/busstops?type=Toilet")
      .then((response) => {
        const { data } = response.data.data.data;
        setBusStops(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    // getAllBusStopByRoute("65b4bcedbc3fc572ff06a31e");
    getAllBusStop();
    getAllBusRoutes();
  }, []);

  var polylinePoints = busStops.map((data) => {
    return [data.location.coordinates[0], data.location.coordinates[1]];
  });

  return (
    <div className="relative">
      {/* <div className="searchbar">
        <input type="text" name="search" placeholder="Search Destination" />
      </div> */}
      <MapContainer
        style={{ height: "100vh", position: "sticky" }}
        center={[27.704183956841236, 85.33127098355981]}
        zoom={13}
        zoomControl={false}
        // scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ZoomControl position="bottomright" />

        <StyledRouteBox>
          {busRoutes.map((busRoute, index) => (
            <BusRouteCard
              key={index}
              onClick={() => getAllBusStopByRoute(busRoute._id)}
              title={busRoute.routeName}
              duration={busRoute.estimatedTravelTime}
              type="Stop"
            >
              {" "}
            </BusRouteCard>
          ))}
          <BusRouteCard
            onClick={() => setRouteName("All")}
            title="View all buses"
            type="Toilets"
            // duration="50"
          />
        </StyledRouteBox>

        {/* <Polyline positions={polylinePoints} /> */}

        {curBusPosition && (
          <Marker
            icon={busIcon}
            position={[curBusPosition.latitude, curBusPosition.longitude]}
          ></Marker>
        )}

        <Marker
          icon={markerIcon}
          position={[27.69185349103717, 85.32517519465627]}
        >
          <Popup>
            <span className="text-base font-semibold">My Location</span>
          </Popup>
        </Marker>

        {busStops.map((data, index) => (
          <Marker
            key={index}
            icon={data.type === "Toilet" ? toiletIcon : busStopIcon}
            position={[
              data.location.coordinates[0],
              data.location.coordinates[1],
            ]}
          >
            <Popup>
              <span
                className="text-base font-semibold"
                title={data._id}
                data-id={data._id}
              >
                {data.stopName}
              </span>
              <br />
            </Popup>
          </Marker>
        ))}
        <LiveBus data={routeName} />
      </MapContainer>
    </div>
  );
};

export default MapContanter;
