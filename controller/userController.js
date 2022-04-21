const { User } = require("../models/user");
const product = require("../models/product");
const { redirect } = require("express/lib/response");

const account = (req, res) => {
  res.render("account");
};

// TO-DO joi Validation require
const registerpost = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (user) return res.status(400).send("User already Registed");
  const newuser = await User.create(req.body);
  newuser.save();
  console.log(newuser);
  res.redirect("/");
};

const dashboard = (req, res) => {
  product
    .find({})
    .then((products) => res.render("dashboard", { products }))
    .catch((err) => res.status(404).send("error" + err));
};

const logout = (req, res) => {
  // check current logged user and logout
  console.log(`${req.user.name} is logged out`);
  logout();

  redirect("/");
};

module.exports = {
  account,
  registerpost,
  logout,
  dashboard,
};
