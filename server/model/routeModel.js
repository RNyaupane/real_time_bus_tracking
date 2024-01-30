const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  routeName: {
    type: String,
    required: true
  },
  stops: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BusStop'
  }],
  estimatedTravelTime: {
    type: Number,
    required: true // In minutes
  }
});

routeSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'stops',
    select: '-__v',
  });
  next();
});

const Route = mongoose.model('Route', routeSchema);

module.exports = Route;