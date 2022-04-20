const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  createdoc,
  storage,
  getdoc,
  getdocid,
  deldocid,
  editdoc,
  updatedoc,
} = require("../controller/productController");

const upload = multer({ storage: storage });

router.post("/createproduct", upload.single("image"), createdoc);
router.post("/updateproduct/:id", upload.single("image"), updatedoc);
router.get("/editproduct/:id", editdoc);

router.get("/getproduct", getdoc);

router.get("/getproduct/:id", getdocid);
router.get("/delproduct/:id", deldocid);

router.get("/orderpage", (req, res) => {
  console.log(req.user);
  res.render("orderpage");
});

module.exports = router;
