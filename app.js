require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const { connectdb } = require("./models/user");
const expressLayouts = require("express-ejs-layouts");
const app = express();

const port = process.env.PORT || 3000;

// function calling
connectdb();

// static files
app.use("/user", express.static(path.join(process.cwd(), "public")));
app.use("/product", express.static(path.join(process.cwd(), "public")));
app.use(
  "/product/getproduct",
  express.static(path.join(process.cwd(), "public"))
);
app.use(
  "/product/editproduct",
  express.static(path.join(process.cwd(), "public"))
);
app.use("/", express.static(path.join(process.cwd(), "public")));

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(expressLayouts);

// setting template Engine
app.set("view engine", "ejs");
app.set("layout", "layouts/layout");

// logger
app.use(morgan("tiny"));

// route
app.use("/user", require("./routes/userRoutes")); // User Endpoints
app.use("/product", require("./routes/productRoutes")); // Product Endpoints
app.use("/", require("./routes/web")); // Other Endpoints

app.listen(port, () =>
  console.log(`Server listenning at http://localhost:${port}`)
);
