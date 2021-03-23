require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT | 3000;
const token = process.env.token;
const Discord = require("discord.js");
const client = new Discord.Client();
const mongoose = require("mongoose");
const db = require("./data/db");

db.connectDB

client.on("ready", () => {
  console.log("Logged in as", client.user.tag);
});

client.on("message", (msg) => {
  if (msg.content === "!ping") {
    msg.reply("bico!");
  }
});
// client.on("debug", console.log)
client.login(token);

app.get("/", (req, res) => {
  res.send("HI");
});

app.listen(PORT, () => {
  console.log("Connected to port: ", PORT);
});
