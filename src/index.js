require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT | 3000;
const token = process.env.token;
const Discord = require("discord.js");
const client = new Discord.Client();
const mongoose = require("mongoose");
const db = require("./data/db");
const commandsController = require("./controllers/commands");
let commands = {};

async function getCommands() {
  commands = await commandsController.getCommands();
  return commands;
}

client.on("ready", async () => {
  console.log("Logged in as", client.user.tag);
});

client.on("message", async (msg) => {
  await getCommands()
  if (msg.content === "!" + commands[0].command) {
    msg.channel.send(commands[0].return);
  }
});
// client.on("debug", console.log)
client.login(token);

app.get("/", (req, res) => {
  res.send("HI");
});

app.listen(PORT, async () => {
  console.log("Connected to port: ", PORT);
});
