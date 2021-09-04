module.exports = async (msg) => {
  console.log(msg.guild.systemChannel.id);
  return await msg.channel.send("tests!!!!");
};
