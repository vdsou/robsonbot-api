const express = require("express");
const app = express();
const token = process.env.token;
const Discord = require("discord.js");
const client = new Discord.Client();
const Ytdl = require("ytdl-core");
const connectDB = require("./data/db");
const commandsController = require("./controllers/commands");
const index = require("./routes/index");
const cors = require("cors");
app.use(cors());
const logger = require("morgan");
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let ready = false;
const servers = {
  server: {
    connection: null,
    dispatcher: null,
  },
};
require("discord-buttons")(client);

const volume = process.env.AUDIO_VOLUME / 100;

const messagesHandler = require("./events/message/message");
const guildMemberAdd = require("./events/guildMemberAdd/guildMemberAdd");
const voiceStateUpdate = require("./events/voiceStateUpdate/voiceStateUpdate");
client.on("message", messagesHandler);
client.on("guildMemberAdd", guildMemberAdd);
client.on("voiceStateUpdate", voiceStateUpdate);

const userJoke = process.env.USER_JOKE;
const userJokeMessage = process.env.USER_JOKE_MESSAGE;
client.on("typingStart", (channel, user) => {
  if (user.id === userJoke) {
    channel.send(`${userJokeMessage}`).then((message) => {
      message.delete({ timeout: 5000 });
    });
  }
});
client.on("message", async (msg) => {
  // this is temporary ONLY FOR DATABASE COMMANDS!
  let splitCmd = "";
  if (msg.content.match(/^!/)) {
    splitCmd = msg.content.slice(1, msg.content.length).split(" ");
  }

  splitCmd[0] =
    splitCmd[0] === "linda" || splitCmd[0] === "lindo" ? "lind" : splitCmd[0];
  const result = (await commandsController.getOneCommand(splitCmd[0]))
    ? await commandsController.getOneCommand(splitCmd[0])
    : "";

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

  if (result) {
    if (result.audioYt) {
      if (!msg.member.voice.channel) {
        msg.channel.send("Entre em algum canal de voz, por favor, meu anjo!");
      } else if (!ready) {
        servers.server.connection = await msg.member.voice.channel.join();
        ready = true;
      }

      const video = result.audioYt;
      const { COOKIE, YT_ID_TOKEN } = process.env;
      console.log(YT_ID_TOKEN)
      if (Ytdl.validateURL(video)) {
        if (msg.member.voice.channel) {
          await msg.member.voice.channel.join();
          const dispatcher = servers.server.connection.play(
            Ytdl(video, {
              filter: "audioonly",
              quality: "highestaudio",
              requestOptions: {
                headers: {
                  cookie: COOKIE,
                  'x-youtube-identity-token': YT_ID_TOKEN,
                },
              },
            })
          );
          dispatcher.setVolume(volume);
          dispatcher.on("start", () => {
            console.log("audio's now playing");
          });
          dispatcher.on("error", console.error);
        }
      } else {
        msg.channel.send("URL do áudio inválida :(");
        console.log("not a valid URL");
      }
      // audio ends
    } else {
      if (result.command === "lind") {
        msg.channel.send(msg.author.displayAvatarURL());
      }
      if (result.count !== undefined && result.count !== null) {
        await commandsController.updateCount(
          result.command,
          (result.count += 1)
        );
      }
      const strCount =
        result.count === undefined || result.count === null
          ? ""
          : ` ${result.count} vezes`;
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
client.login(token);
app.use(index);
app.get("/", (req, res) => {
  res.send("Hi 🤖 bip bop...");
});

module.exports = { app, connectDB, client };
