const express = require("express");
const busController = require("../controllers/busController");

const router = express.Router();

router
    .route("/")
    .get(busController.getAllBuses)
    .post(busController.createBus);

router
    .route("/:id")
    .get(busController.getBus)
    .patch(busController.updateBus)
    .delete(busController.deleteBus);

module.exports = router;