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
const axios = require("axios");
let commands = {};
app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

async function getCommands() {
  commands = await commandsController.getCommands();
  return commands;
}

client.on("message", async (msg) => {
  await getCommands();

  if (msg.content === "!comandos") {
    msg.channel.send(commands.map((ObjCommand) => `!${ObjCommand.command}`));
  }
  const splitCmd = msg.content.slice(1, msg.content.length).split(" ");

  splitCmd[0] =
    splitCmd[0] === "linda" || splitCmd[0] === "lindo"
      ? "lind"
      : splitCmd[0];
  const result = (await commandsController.getOneCommand(splitCmd[0]))
    ? await commandsController.getOneCommand(splitCmd[0])
    : "";

  if (result) {
    if(result.command === "lind") msg.channel.send(msg.author.displayAvatarURL());
    if (result.count)
      await commandsController.updateCount(result.command, (result.count += 1));

    const strCount = result.count ? ` ${result.count} vezes` : "";
    // msg.channel.send("");
    await msg.channel.send(
      result.cmdReturn === ""
        ? ""
        : result.cmdReturn +
            strCount +
            (!result.cmdReturn || /[...]$/.test(result.cmdReturn)
              ? ""
              : splitCmd[1]
              ? ", " + splitCmd[1] + "!"
              : "!"),
      result.image ? { files: [result.image] } : null
    );
  }
});
// client.on("debug", console.log)
client.login(token);
app.use(index);
app.get("/", (req, res) => {
  res.send("Hi 🤖 bip bop...");
});

module.exports = { app, connectDB, client };
