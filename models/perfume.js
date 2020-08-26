const mongoose = require("mongoose");

let perfumeschema = new mongoose.Schema(
  {
    image: {
      data: Buffer,
      contentType: String,
    },
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("perfume", perfumeschema);
