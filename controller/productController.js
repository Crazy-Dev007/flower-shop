const productmodel = require("../models/product");
const ordermodel = require("../models/order");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const destination = path.join(process.cwd() + "/public/upload");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, destination);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const createdoc = (req, res) => {
  console.log(req.body);
  const obj = {
    name: req.body.name,
    desc: req.body.desc,
    price: req.body.price,
    qty: req.body.qty,
    img: {
      data: fs.readFileSync(
        path.join(process.cwd() + "/public/upload/" + req.file.filename)
      ),
      contentType: "image/png",
    },
  };
  console.log(obj);
  productmodel.create(obj, (err, item) => {
    if (err) {
      console.log(err);
    } else {
      item.save();
      res.redirect("/");
    }
  });
};
const updatedoc = (req, res) => {
  console.log(req.body);
  const obj = {
    name: req.body.name,
    desc: req.body.desc,
    price: req.body.price,
    qty: req.body.qty,
    img: {
      data: fs.readFileSync(
        path.join(process.cwd() + "/public/upload/" + req.file.filename)
      ),
      contentType: "image/png",
    },
  };
  console.log(obj);
  productmodel
    .findByIdAndUpdate(req.params.id, obj)
    .then((data) => console.log("updated"))
    .catch((err) => console.log(err));
};

const editdoc = async (req, res) => {
  try {
    const data = await productmodel.findById(req.params.id);
    // console.log(data);
    res.render("editpage", { item: data });
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};

const getdoc = async (req, res) => {
  try {
    const data = await productmodel.find({});
    res.render("product", { items: data });
    // console.log(data);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};

const getdocid = async (req, res) => {
  try {
    const data = await productmodel.findById(req.params.id);
    res.render("productdetails", { item: data });
    // console.log(data);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};

const deldocid = async (req, res) => {
  try {
    const data = await productmodel.findByIdAndDelete(req.params.id);
    res.redirect("/user/dashboard");
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};

// GET
const orderpage = async (req, res) => {
  console.log(req.user);
  try {
    const product = await productmodel.findById(req.params.id);
    res.render("orderpage", { product });
  } catch (error) {
    console.log(`Error in Order ${error}`);
    res.status(404).redirect("/product/getproduct");
  }
};

const orderpagepost = async (req, res) => {
  console.log(req.user);
  try {
    const product = await productmodel.findById(req.params.id);
    const { qty, price, address } = req.body;
    const data = {
      userid: req.user._id,
      price: price,
      qty: qty,
      address: address,
    };

    ordermodel.create(data, (err, item) => {
      if (err) {
        console.log(err);
      } else {
        item.save();
      }
    });

    res.redirect("/product/getproduct");
  } catch (error) {
    console.log(`Error in Order ${error}`);
    res.status(404).redirect("/product/getproduct");
  }
};

module.exports = {
  createdoc,
  getdoc,
  getdocid,
  deldocid,
  editdoc,
  updatedoc,
  storage,
  orderpage,
  orderpagepost,
};
