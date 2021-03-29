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
  if (msg.content === "!comandos") {
    msg.channel.send(commands.map(ObjCommand => `!${ObjCommand.command}`))
  }
  const splitCmd = msg.content.split(" ");
  splitCmd[0] =
    splitCmd[0] === "!linda" || splitCmd[0] === "!lindo"
      ? "!lind"
      : splitCmd[0];
  commands.map((objCommand) => {
    if (splitCmd[0] === "!" + objCommand.command) {
      if (objCommand.command === "lind") msg.channel.send(msg.author.displayAvatarURL());        
      msg.channel.send(objCommand.cmdReturn.match(/https:\/\//) ? objCommand.cmdReturn :
        objCommand.cmdReturn +
          (splitCmd[1] === undefined ? "!" : ", " + splitCmd[1] + "!")
      );
    }
  });
});
// client.on("debug", console.log)
client.login(token);
app.use(index);
app.get("/", (req, res) => {
  res.send("Hi 🤖 bip bop...");
});

module.exports = { app, connectDB, client };
