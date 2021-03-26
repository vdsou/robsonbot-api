const express = require("express");
const router = express.Router();
const commands = require("./commands")
// const admins = require("./admins")
const app = express();

app.get("/app", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Hello, world!",
  });
});
app.use("/app/commands/", commands);
// app.use("/app/admins/", admins);


module.exports = app;
