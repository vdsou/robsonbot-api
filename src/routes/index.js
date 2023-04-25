const express = require("express");
const commands = require("./commands")
const users = require("./users")
const app = express();

app.get("/api", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Root! Hello, world! 🤖️",
  });
});
app.use("/api/commands/", commands);
app.use("/api/users/", users);


module.exports = app;
