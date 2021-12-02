const Discord = require("discord.js");
const client = new Discord.Client();

module.exports = async (msg) => {
  console.log(client.guilds);
  msg.channel.send(`Currently in ${client.guilds.cache.size} servers`);
};