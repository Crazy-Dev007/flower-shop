const express = require("express");
const router = express.Router();
const multer = require("multer");
const { isAuth } = require("../config/passportConfig");
const {
  createdoc,
  storage,
  getdoc,
  getdocid,
  deldocid,
  editdoc,
  updatedoc,
  orderpage,
} = require("../controller/productController");

const upload = multer({ storage: storage });

router.post("/createproduct", upload.single("image"), createdoc);
router.post("/updateproduct/:id", upload.single("image"), updatedoc);
router.get("/editproduct/:id", editdoc);

router.get("/getproduct", getdoc);

router.get("/getproduct/:id", getdocid);
router.get("/delproduct/:id", deldocid);

router.get("/orderpage/:id", isAuth, orderpage);

module.exports = router;
