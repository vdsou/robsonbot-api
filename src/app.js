const express = require("express");
const app = express();
const token = process.env.token;
const Discord = require("discord.js");
const Ytdl = require("ytdl-core");
const client = new Discord.Client();
const mongoose = require("mongoose");
const connectDB = require("./data/db");
const commandsController = require("./controllers/commands");
const index = require("./routes/index");
const cors = require("cors");
const logger = require("morgan");
const bodyParser = require("body-parser");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
let commands = {};
let ready = false;
app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

async function getCommands() {
  commands = await commandsController.getCommands();
  return commands;
}

const servers = {
  server: {
    connection: null,
    dispatcher: null,
  },
};

client.on("message", async (msg) => {
  await getCommands();

  if (msg.content === "!report") {
    msg.channel.send("reportado!");
    const embed = new Discord.MessageEmbed()
      .setTitle("Central de Report")
      .setColor("0xff0000")
      .setDescription("Por favor. Descreva a denúncia.");
    await msg.channel.send(embed);
    msg.edit("querida");
  }
  if (msg.content === "!gato") {
    axios
      .get("https://api.thecatapi.com/v1/images/search")
      .then((res) => {
        msg.channel.send(res.data[0].url);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  if (msg.content === "!fala") {
    msg.channel.send("Meow! I'm a baby loli kitten!", {
      tts: true,
    });
  }
  if (msg.content === "user") {
    console.log(msg.guild.channels);
  }
  if (msg.content === "!comandos") {
    msg.channel.send(commands.map((ObjCommand) => `!${ObjCommand.command}`));
  }
  // this is temporary
  let splitCmd = "";
  if (msg.content.match(/^!/)) {
    splitCmd = msg.content.slice(1, msg.content.length).split(" ");
  }

  splitCmd[0] =
    splitCmd[0] === "linda" || splitCmd[0] === "lindo" ? "lind" : splitCmd[0];
  const result = (await commandsController.getOneCommand(splitCmd[0]))
    ? await commandsController.getOneCommand(splitCmd[0])
    : "";

  if (result) {
    if (result.audioYt) {
      // audio
      if (!msg.guild) return;
      if (msg.content === "!join") {
        if (msg.member.voice.channel) {
          servers.server.connection = await msg.member.voice.channel.join();
          ready = true;
        } else {
          msg.channel.send("Entre em algum canal de voz, por favor, meu anjo!");
        }
      }
      if (msg.content === "!leave") {
        if (msg.member.voice.channel) {
          msg.member.voice.channel.leave();
          ready = false;
        } else {
          msg.channel.send("Entre em algum canal de voz, por favor, meu anjo!");
        }
      }

      if (!ready)
        servers.server.connection = await msg.member.voice.channel.join();
      // const video = "https://www.youtube.com/watch?v=l8dCq-tey70";
      const video = result.audioYt;
      // console.log(result);
      if (Ytdl.validateURL(video)) {
        const dispatcher = servers.server.connection.play(
          // path.join(__dirname, "/mist/geme.mp3")
          Ytdl(video, { quality: "highestaudio" })
        );
        // const dispatcher = servers.server.connection.play();

        dispatcher.on("start", () => {
          console.log("audio's now playing");
        });

        // dispatcher.on("speaking", (speaking) => {
        //   console.log("audio's now finished playing");
        //   if (!speaking) msg.member.voice.channel.leave();
        // });

        dispatcher.on("error", console.error);
      } else {
        msg.channel.send("URL do áudio inválida :(");
        console.log("not a valid URL");
      }
      // audio ends
    } else {
      if (result.command === "lind") {
        msg.channel.send(msg.author.displayAvatarURL());
      }
      if (result.count >= 0) {
        await commandsController.updateCount(
          result.command,
          (result.count += 1)
        );
      }

      const strCount = result.count ? ` ${result.count} vezes` : "";
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
  }
});
// client.on("debug", console.log)
client.login(token);
app.use(index);
app.get("/", (req, res) => {
  res.send("Hi 🤖 bip bop...");
});

module.exports = { app, connectDB, client };
