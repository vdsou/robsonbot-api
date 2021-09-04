module.exports = async (member) => {
  const channel = member.guild.channels.cache.find((ch) => {
    ch.id === "595427039830605845";
  });
  if (!channel) return;
  await channel.send(`Bem-vindo(a), ${member}! Isso aqui tá uma loucura, né?`, {
    files: [
      "https://media.tenor.com/images/799ed0a2c8870ebcceee8f61742a129d/tenor.gif?itemid=7911935!!!",
    ],
  });
};
// client.on("guildMemberAdd", async (member) => {
//   const channel = member.guild.channels.cache.find(
//     (ch) => ch.id === "402972272870162435"
//   );
//   if (!channel) return;

//   await channel.send(`Bem-vindo(a), ${member}! Isso aqui tá uma loucura, né?`, {
//     files: [
//       "https://media.tenor.com/images/799ed0a2c8870ebcceee8f61742a129d/tenor.gif?itemid=7911935!!!",
//     ],
//   });
// });
