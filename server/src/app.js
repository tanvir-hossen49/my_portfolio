const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDataBase = require("./config/dbconfig");
const { serverPort } = require("./secret");
const createError = require("http-errors");
const skillRouter = require("./routers/skillRouter");
const projectRouter = require("./routers/projectRouter");

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use(skillRouter);
app.use(projectRouter);

app.get("/", (_req, res) => {
  res.send("server is running");
});

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

app.listen(serverPort, async () => {
  console.log(`server is running at http://localhost:${serverPort}`);
  await connectDataBase();
});

module.exports = app;
