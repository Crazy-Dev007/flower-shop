const express = require("express");
const userController = require("../controller/userController");
const router = express.Router();

// @decs    Login and Register Page
// @route   GET /user/account
router.get("/account", userController.account);

// @decs    get data from Login Page
// @route   POST /user/login
router.post("/login", userController.loginpost);

// @decs    get data from register Page
// @route   POST /user/register
router.post("/register", userController.registerpost);

// @decs    Dashboard Page for Admin Only
// @route   GET /user/Dashboard
// @Auth    isAdmin
router.get("/dashboard", userController.dashboard);

// @decs    logout endpoint redirect to login page
// @route   GET /user/logout
router.get("/logout", userController.logout);

module.exports = router;
