const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userid: {
    type: String,
  },
  price: {
    type: String,
  },
  qty: {
    type: String,
  },
  address: {
    type: String,
  },
});

module.exports = new mongoose.model("order", orderSchema);
