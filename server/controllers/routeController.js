const Route = require("../model/routeModel");
const factory = require("./handlerFactory");

// Do not update user password here
exports.getAllRoutes = factory.getAll(Route);
exports.getRoute = factory.getOne(Route);
exports.updateRoute = factory.updateOne(Route);
exports.deleteRoute = factory.deleteOne(Route);
exports.createRoute = factory.createOne(Route);