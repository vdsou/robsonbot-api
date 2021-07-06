const express = require("express");
const app = express();
const token = process.env.token;
const Discord = require("discord.js");
const client = new Discord.Client();
const Ytdl = require("ytdl-core");
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
const { collection } = require("./models/command");
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
require("discord-buttons")(client);
client.on("message", async (msg) => {
  await getCommands();

  if (msg.content === "!comandos") {
    const commandsList = await commands.map(
      (ObjCommand) => ` !${ObjCommand.command}`
    );
    await msg.channel.send(
      `Total: ${commandsList.length} comandos. ${commandsList}.`
    );
  }

  if (msg.content === "!report") {
    msg.channel.send("reportado!");
    const embed = new Discord.MessageEmbed()
      .setTitle("Central Robson de Report")
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

  if (msg.content.startsWith("!kof")) {
    let embed = null;
    if (!msg.mentions.users.size) {
      return msg.channel.send(
        "Por favor, use o comando !kof marcando alguém. Ex.: !kof @leticia"
      );
    }
    const player1 = msg.author.username.toUpperCase();
    const player2 = msg.mentions.users.first().username.toUpperCase();
    let countP1 = 0;
    let countP2 = 0;
    embed = new Discord.MessageEmbed()
      .setTitle("Hora do show!")
      .setDescription(`FT: ${player1} vs ${player2}`)
      .setColor("BLUE")
      .setFooter("Adicione ou remova 1 ponto clicando nos botões.")
      .setImage(
        "https://cdn.discordapp.com/attachments/402972272870162435/860613813170077736/kofcollection.gif"
      );
    const { MessageButton, MessageActionRow } = require("discord-buttons");
    let button1Plus = new MessageButton()
      .setStyle("green")
      .setLabel("+1")
      .setID("p1_plus_1");

    let button1Minus = new MessageButton()
      .setStyle("red")
      .setLabel("-1")
      .setID("p1_minus_1");

    let button2Plus = new MessageButton()
      .setStyle("green")
      .setLabel("+1")
      .setID("p2_plus_1");

    let button2Minus = new MessageButton()
      .setStyle("red")
      .setLabel("-1")
      .setID("p2_minus_1");

    let buttonEnds = new MessageButton()
      .setStyle("blurple")
      .setLabel("Parar")
      .setID("stop");

    const buttons1 = new MessageActionRow()
      .addComponent(button1Plus)
      .addComponent(button2Plus);

    const buttons2 = new MessageActionRow()
      .addComponent(button1Minus)
      .addComponent(button2Minus);

    const button3 = new MessageActionRow().addComponent(buttonEnds);

    let m = await msg.channel.send("Placar:", {
      embed,
      components: [buttons1, buttons2, button3],
    });

    const filter = (button) => button;
    const collector = m.createButtonCollector(filter, { time: 60000 * 60 });
    collector.on("collect", async (button) => {
      button.defer();
      if (button.id === "p1_plus_1") {
        countP1 = countP1 + 1;
        let embed1 = new Discord.MessageEmbed()
          .setTitle(`${player1}: ${countP1} vs ${player2}: ${countP2}`)
          .setFooter("Adicione ou remova 1 ponto clicando nos botões.");
        await button.message.edit({
          embed: embed1,
          components: [buttons1, buttons2, button3],
        });
      } else if (button.id === "p1_minus_1") {
        if (countP1 > 0) countP1 = countP1 - 1;

        let embed2 = new Discord.MessageEmbed()
          .setTitle(`${player1}: ${countP1} vs ${player2}: ${countP2}`)
          .setFooter("Adicione ou remova 1 ponto clicando nos botões.");

        await button.message.edit({
          embed: embed2,
          components: [buttons1, buttons2, button3],
        });
      } else if (button.id === "p2_plus_1") {
        countP2 = countP2 + 1;

        let embed3 = new Discord.MessageEmbed()
          .setTitle(`${player1}: ${countP1} vs ${player2}: ${countP2}`)
          .setFooter("Adicione ou remova 1 ponto clicando nos botões.");

        await button.message.edit({
          embed: embed3,
          components: [buttons1, buttons2, button3],
        });
      } else if (button.id === "p2_minus_1") {
        if (countP2 > 0) countP2 = countP2 - 1;

        let embed4 = new Discord.MessageEmbed()
          .setTitle(`${player1}: ${countP1} vs ${player2}: ${countP2}`)
          .setFooter("Adicione ou remova 1 ponto clicando nos botões.");

        await button.message.edit({
          embed: embed4,
          components: [buttons1, buttons2, button3],
        });
      } else if (button.id === "stop") {
        let embed5 = new Discord.MessageEmbed()
          .setTitle(`${player1}: ${countP1} vs ${player2}: ${countP2}`)
          .setFooter("Resultado final");
        collector.stop();
        await button.message.edit({
          embed: embed5,
        });
      }
    });
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

  if (!msg.guild) return;
  if (msg.content === "!join") {
    console.log(msg.member.voice.channel);
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

  if (result) {
    if (result.audioYt) {
      // audio
      if (!msg.member.voice.channel) {
        msg.channel.send("Entre em algum canal de voz, por favor, meu anjo!");
      } else if (!ready)
        servers.server.connection = await msg.member.voice.channel.join();

      const video = result.audioYt;

      if (Ytdl.validateURL(video)) {
        const dispatcher = servers.server.connection.play(
          Ytdl(video, { quality: "highestaudio" })
        );

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
