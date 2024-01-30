// Define key points along Chakrapath
const chakrapathCoordinates = [
    { latitude: 27.715330, longitude: 85.330501 }, // Starting point
    { latitude: 27.714890, longitude: 85.333248 },
    { latitude: 27.714450, longitude: 85.335200 },
    { latitude: 27.713910, longitude: 85.337866 },
    { latitude: 27.713390, longitude: 85.340526 },
    { latitude: 27.712900, longitude: 85.343191 },
    { latitude: 27.712450, longitude: 85.345898 }, // Ending point
  ];
  
  let currentIndex = 0;
  
  function getNextPosition() {
    const { latitude, longitude } = chakrapathCoordinates[currentIndex];
    currentIndex = (currentIndex + 1) % chakrapathCoordinates.length;
    return {
      latitude: latitude.toFixed(6),
      longitude: longitude.toFixed(6),
      timestamp: new Date().toISOString()
    };
  }
  
  let intervalId;
  
  function startBusSimulation(callback) {
    // Simulate bus movement every 5 seconds
    intervalId = setInterval(() => {
      const position = getNextPosition();
      callback(position);
    }, 5000);
  }
  
  function stopBusSimulation() {
    // Stop the simulation
    clearInterval(intervalId);
  }
  
  
  export {startBusSimulation, stopBusSimulation};