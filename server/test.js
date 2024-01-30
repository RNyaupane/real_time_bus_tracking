const WebSocket = require("ws");

// Create a WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

// Simulated bus locations
const busLocations = [
  { busId: 1, latitude: 27.717, longitude: 85.324 },
  { busId: 2, latitude: 27.731, longitude: 85.311 },
  // Add more bus locations as needed
];

// Function to send bus locations to clients
function sendBusLocations() {
  // Randomly select a bus location
  const randomIndex = Math.floor(Math.random() * busLocations.length);
  const randomBusLocation = busLocations[randomIndex];

  // Broadcast the bus location to all connected clients
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(randomBusLocation));
    }
  });
}

// Send bus locations to clients every 5 seconds
setInterval(sendBusLocations, 5000);

// Event handler for WebSocket connections
wss.on("connection", (ws) => {
  console.log("Client connected");

  // Event handler for WebSocket messages
  ws.on("message", (message) => {
    console.log(`Received message: ${message}`);
  });

  // Event handler for WebSocket disconnections
  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

console.log("WebSocket server started on port 8080");
