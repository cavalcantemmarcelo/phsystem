const mongoose = require("mongoose");

const PlacesSchema = new mongoose.Schema({
  name: String,
  image: String,
  link: String,
  description: String,
  location: String,
  category: String,
  tags: [String],
  location: {
    lat: Number,
    long: Number,
  },
  facilities: [
    {
      item: Number,
      status: Boolean,
    },
  ],
  capacity: Number,
  destack: Boolean,
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cities",
  },
});

module.exports = mongoose.model("Places", PlacesSchema);
