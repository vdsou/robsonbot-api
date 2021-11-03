const Discord = require("discord.js");
// const client = new Discord.Client();
// require("discord-buttons")(client);
module.exports = async (msg) => {
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
    .setTitle("Hora do combate!")
    .setDescription(`FT: ${player1} vs ${player2}`)
    .setColor("BLUE")
    .setFooter("Adicione ou remova 1 ponto clicando nos botões.")
    .setImage(
      "https://cdn.discordapp.com/attachments/402972272870162435/860613813170077736/kofcollection.gif"
    );
  const { MessageButton, MessageActionRow } = require("discord-buttons");
  let button1Plus = new MessageButton()
    .setStyle("green")
    .setLabel(`${player1} +1`)
    .setID("p1_plus_1");

  let button1Minus = new MessageButton()
    .setStyle("red")
    .setLabel(`${player1} -1`)
    .setID("p1_minus_1");

  let button2Plus = new MessageButton()
    .setStyle("green")
    .setLabel(`${player2} +1`)
    .setID("p2_plus_1");

  let button2Minus = new MessageButton()
    .setStyle("red")
    .setLabel(`${player2} -1`)
    .setID("p2_minus_1");

  let buttonEnds = new MessageButton()
    .setStyle("blurple")
    .setLabel("Parar")
    .setID("stop");

  let buttonResets = new MessageButton()
  .setStyle("gray")
  .setLabel("Zerar")
  .setID("reset");

  const buttons1 = new MessageActionRow()
    .addComponent(button1Plus)
    .addComponent(button2Plus);

  const buttons2 = new MessageActionRow()
    .addComponent(button1Minus)
    .addComponent(button2Minus);

  const buttons3 = new MessageActionRow()
    .addComponent(buttonEnds)
    .addComponent(buttonResets);

  let m = await msg.channel.send("Placar:", {
    embed,
    components: [buttons1, buttons2, buttons3],
  });

  const filter = (button) => button;
  const collector = m.createButtonCollector(filter, { time: 60000 * 120 });
  collector.on("collect", async (button) => {
    button.defer();
    if(button.id === "reset"){
      countP1 = 0;
      countP2 = 0;
      let embedZero = new Discord.MessageEmbed()
        .setTitle(`${player1}: ${countP1} vs ${player2}: ${countP2}`)
        .setFooter("Adicione ou remova 1 ponto clicando nos botões.");
        await button.message.edit({
          embed: embedZero,
          components: [buttons1, buttons2, buttons3],
        });
    }
    else if (button.id === "p1_plus_1") {
      countP1 = countP1 + 1;
      let embed1 = new Discord.MessageEmbed()
        .setTitle(`${player1}: ${countP1} vs ${player2}: ${countP2}`)
        .setFooter("Adicione ou remova 1 ponto clicando nos botões.");
      await button.message.edit({
        embed: embed1,
        components: [buttons1, buttons2, buttons3],
      });
    } else if (button.id === "p1_minus_1") {
      if (countP1 > 0) countP1 = countP1 - 1;

      let embed2 = new Discord.MessageEmbed()
        .setTitle(`${player1}: ${countP1} vs ${player2}: ${countP2}`)
        .setFooter("Adicione ou remova 1 ponto clicando nos botões.");

      await button.message.edit({
        embed: embed2,
        components: [buttons1, buttons2, buttons3],
      });
    } else if (button.id === "p2_plus_1") {
      countP2 = countP2 + 1;

      let embed3 = new Discord.MessageEmbed()
        .setTitle(`${player1}: ${countP1} vs ${player2}: ${countP2}`)
        .setFooter("Adicione ou remova 1 ponto clicando nos botões.");

      await button.message.edit({
        embed: embed3,
        components: [buttons1, buttons2, buttons3],
      });
    } else if (button.id === "p2_minus_1") {
      if (countP2 > 0) countP2 = countP2 - 1;

      let embed4 = new Discord.MessageEmbed()
        .setTitle(`${player1}: ${countP1} vs ${player2}: ${countP2}`)
        .setFooter("Adicione ou remova 1 ponto clicando nos botões.");

      await button.message.edit({
        embed: embed4,
        components: [buttons1, buttons2, buttons3],
      });
    } else if (button.id === "stop") {
      let embed5 = new Discord.MessageEmbed()
        .setTitle(`${player1}: ${countP1} vs ${player2}: ${countP2}`)
        .setFooter(
          `Resultado final: ${
            countP1 === countP2
              ? "ninguém venceu 🤭"
              : countP1 > countP2
              ? player1 + "🏆"
              : player2 + "🏆"
          }`
        );
      collector.stop();
      await button.message.edit({
        embed: embed5,
      });
    }
  });
};
