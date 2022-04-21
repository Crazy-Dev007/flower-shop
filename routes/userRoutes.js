const express = require("express");
const userController = require("../controller/userController");
const router = express.Router();
const passport = require("passport");
const { isAuth, isAdmin } = require("../config/passportConfig");
const { redirect } = require("express/lib/response");

// @decs    Login and Register Page
// @route   GET /user/account
router.get("/account", userController.account);

// @decs    get data from Login Page
// @route   POST /user/login
router.post(
  "/login",
  passport.authenticate("local", {
    failureMessage: "invalid Login Check Username And Password",
    failureRedirect: "/user/account",
  }),
  (req, res) => {
    if (req.user.role == "admin") {
      res.redirect("/user/dashboard");
    } else {
      res.redirect("/product/getproduct");
    }
  }
);

// @decs    get data from register Page
// @route   POST /user/register
router.post("/register", userController.registerpost);

// @decs    Dashboard Page for Admin Only
// @route   GET /user/Dashboard
// @Auth    isAdmin
router.get("/dashboard", isAuth, userController.dashboard);

// @decs    logout endpoint redirect to login page
// @route   GET /user/logout
router.get("/logout", userController.logout);

module.exports = router;
