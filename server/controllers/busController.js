const Bus = require("../model/busModel");
const factory = require("./handlerFactory");

// Do not update user password here
exports.getAllBuses = factory.getAll(Bus);
exports.getBus = factory.getOne(Bus);
exports.updateBus = factory.updateOne(Bus);
exports.deleteBus = factory.deleteOne(Bus);
exports.createBus = factory.createOne(Bus);