const express = require("express");
const router = express.Router();
const orderController = require("../controller/orderController");

router.post("/", orderController.placeorder);

module.exports = router;
