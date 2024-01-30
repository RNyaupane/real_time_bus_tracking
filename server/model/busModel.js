const mongoose = require("mongoose");

const busSchema = new mongoose.Schema(
  {
    busNumber: {
      type: String,
      required: true,
    },
    speed: {
      type: Number,
      required: true,
      default: 0, // Default bus speed
    },
    currentLocation: {
      type: { type: String },
      coordinates: {
        type: [Number],
        default: [85.324, 27.717], // Default coordinates for Kathmandu, Bus Park
      },
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Index for geospatial queries on currentLocation
busSchema.index({ currentLocation: "2dsphere" });

const Bus = mongoose.model("Bus", busSchema);

module.exports = Bus;
