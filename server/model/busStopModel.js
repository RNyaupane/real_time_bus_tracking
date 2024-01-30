const mongoose = require('mongoose');

const busStopSchema = new mongoose.Schema({
  stopName: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Toilet', 'Cycle', 'Parkings', 'Stop'],
    default: "Stop",
  },
  location: {
    type: {
      type: String,
      enum: ['Point', ],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true // [longitude, latitude]
    }
  }
});

busStopSchema.index({ location: '2dsphere' }); // Index for geospatial queries

const BusStop = mongoose.model('BusStop', busStopSchema);

module.exports = BusStop;
