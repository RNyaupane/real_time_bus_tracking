const express = require("express");
const busStopController = require("../controllers/busStopController");

const router = express.Router();

router
    .route("/")
    .get(busStopController.getAllBusStops)
    .post(busStopController.createBusStop);

router
    .route("/:id")
    .get(busStopController.getBusStop)
    .patch(busStopController.updateBusStop)
    .delete(busStopController.deleteBusStop);

module.exports = router;