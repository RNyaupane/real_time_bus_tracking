const BusStop = require("../model/busStopModel");
const factory = require("./handlerFactory");

// Do not update user password here
exports.getAllBusStops = factory.getAll(BusStop);
exports.getBusStop = factory.getOne(BusStop);
exports.updateBusStop = factory.updateOne(BusStop);
exports.deleteBusStop = factory.deleteOne(BusStop);
exports.createBusStop = factory.createOne(BusStop);