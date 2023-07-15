const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const createError = require("http-errors");
const skillRouter = require("./routers/skillRouter");

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/skill", skillRouter);

//client error handle
app.use((_req, _res, next) => {
  next(createError(404, "route not found"));
});

//server error handle
app.use((error, _req, res, _next) => {
  return res.status(error.status).json({
    success: false,
    message: error.message,
  });
});

module.exports = app;
