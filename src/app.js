const express = require("express");
const app = express();
const token = process.env.token;
const Discord = require("discord.js");
const client = new Discord.Client();
const mongoose = require("mongoose");
const connectDB = require("./data/db");
const commandsController = require("./controllers/commands");
const index = require("./routes/index");
const cors = require("cors");
const logger = require("morgan");
const bodyParser = require("body-parser");
let commands = {};
async function getCommands() {
  commands = await commandsController.getCommands();
  return commands;
}

app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

client.on("message", async (msg) => {
  await getCommands();
    commands.map((objCommand) => {
    if (msg.content === "!" + objCommand.command) {
      msg.channel.send(objCommand.cmdReturn);
    }
  });
});
// client.on("debug", console.log)
client.login(token);
app.use(index);
app.get("/", (req, res) => {
  res.send("HI");
});

module.exports = { app, connectDB, client };
