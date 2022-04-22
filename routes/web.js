const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { layout: "layouts/simpleLayout" });
});

router.get("/about", (req, res) => {
  res.render("about", { layout: "layouts/simpleLayout" });
});

router.get("/contact", (req, res) => {
  res.render("contact", { layout: "layouts/simpleLayout" });
});

module.exports = router;
