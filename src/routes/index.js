const express = require("express");
const router = express.Router();
const commands = require("./commands")
const users = require("./users")
const app = express();

app.get("/app", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Hello, world! 🤖️",
  });
});
app.use("/app/commands/", commands);
app.use("/app/users/", users);


module.exports = app;
