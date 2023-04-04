const path = require("path");
const commandsController = require("../../../controllers/commands");
async function getCommands() {
  commands = await commandsController.getCommands();
  return commands;
}
module.exports = async (msg) => {
  await getCommands();
  const commandsList = await commands.map((ObjCommand) => {
    if (ObjCommand.audioYt && ObjCommand.audioYt.length > 0) {
      return ` !${ObjCommand.command} 🔊️`;
    }
    if (ObjCommand.image && ObjCommand.image.length > 0) {
      return ` !${ObjCommand.command} 📸️`;
    }
    return ` !${ObjCommand.command} 🗒️`;
  });
  await msg.channel.send(
    `Total: ${commandsList.length} comandos ${commandsList}.`
  );
};
