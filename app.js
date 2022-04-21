require("dotenv").config();
const express = require("express");
const expressSession = require("express-session");
const morgan = require("morgan");
const path = require("path");
const { connectdb } = require("./models/user");
const createAdmin = require("./seeder/admin");
const expressLayouts = require("express-ejs-layouts");
const { initpassport } = require("./config/passportConfig");
const passport = require("passport");
const app = express();

const port = process.env.PORT || 3000;

// function calling
connectdb();

//passport config
initpassport(passport);

// create Admin User For Project
createAdmin();

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
app.use(
  "/product/orderpage",
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

app.use(
  expressSession({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// route
app.use("/user", require("./routes/userRoutes")); // User Endpoints
app.use("/product", require("./routes/productRoutes")); // Product Endpoints
app.use("/", require("./routes/web")); // Other Endpoints

app.listen(port, () =>
  console.log(`Server listenning at http://localhost:${port}`)
);
