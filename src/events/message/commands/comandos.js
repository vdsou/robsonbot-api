const path = require("path");
console.log(path.join(__dirname, "..", "controllers"))
const commandsController = require("../../../controllers/commands");
async function getCommands() {
  commands = await commandsController.getCommands();
  return commands;
}
module.exports = async (msg) => {
  await getCommands();
  const commandsList = await commands.map(
    (ObjCommand) => ` !${ObjCommand.command}`
  );
  await msg.channel.send(
    `Total: ${commandsList.length} comandos. ${commandsList}.`
  );
};
