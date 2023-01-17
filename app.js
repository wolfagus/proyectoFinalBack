require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
console.log("primera conexión");
const dbConnectMenu = require("./config/db2");
dbConnectMenu();
const userRouter = require("./routes/users");
const productsRouter = require("./routes/products");
const cors = require("cors");
const app = express();
app.use(logger("dev"));
const paymentRouter = require("./routes/payments");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.ORIGIN_URL);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use(cors({ origin: process.env.ORIGIN_URL }));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/api", userRouter);
app.use("/api", paymentRouter);

module.exports = app;
