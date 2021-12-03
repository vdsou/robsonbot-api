const Ytdl = require("ytdl-core");

const servers = {
  server: {
    connection: null,
    dispatcher: null,
  },
};
const volume = process.env.VOLUME / 100;

module.exports = async (oldMember, newMember) => {
  if (newMember.channelID === process.env.JOKE_CHANNEL_ID) {
    if (newMember.member.voice.channel) {
      newMember.member.voice.channel.join();
      servers.server.connection = await newMember.member.voice.channel.join();

      const dispatcher = servers.server.connection.play(
        Ytdl(process.env.JOKE, {
          filter: "audioonly",
          quality: "highestaudio",
          requestOptions: {
            headers: {
              cookie: process.env.COOKIE,
            },
          },
        })
      );

      dispatcher.setVolume(volume);
      dispatcher.on("start", () => {
        console.log("audio's now playing");
      });
      dispatcher.on("finish", () => {
        console.log("audio finished");
        newMember.member.voice.channel.leave();
        ready = false;
      });
      dispatcher.on("error", console.error);
    }
  }
};
