const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
const cors =require("cors");

app.use(cors({
  //origin:"http://localhost:3000",
  methods:["GET","PUT","POST","DELETE"],
  credentials:true
}))

const errorMiddleware = require("./middleware/error");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Route Imports
const category =require("./routes/categoryRoute");
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");

app.use("/api/v1", category);
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

app.use(express.static(path.join(__dirname, "../toolkit/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../toolkit/build/index.html"));
});

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
