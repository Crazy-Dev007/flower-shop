const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  desc: { type: String, required: true },
  price: { type: String, required: true },
  qty: { type: String, min: 1, max: 1000 },
  img: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = new mongoose.model("product", productSchema);
