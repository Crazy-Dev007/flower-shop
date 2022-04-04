const mongoose = require("mongoose");

exports.connectdb = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then((e) => console.log(`Mongodb Connected : ${e.connection.host}`))
    .catch((err) => console.log(err));
};

const userchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  address: {
    type: String,
    required: true,
  },
  username: {
    // FOr Email consider username for passport auth
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "customer",
    enum: ["customer", "admin"],
  },
  createdate: {
    type: Date,
    default: Date.now,
  },
});

exports.User = mongoose.model("user", userchema);
