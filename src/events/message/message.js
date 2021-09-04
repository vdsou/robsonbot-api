const fs = require("fs");
const path = require("path");
let commandsList = {};

const dir = path.join(__dirname, "/commands/");

const files = fs.readdirSync(dir);
for (let file of files) {
  if (file.endsWith(".js")) {
    let command = file.split(".")[0];
    commandsList[command] = require(dir + command);
  }
}

module.exports = async (msg) => {
  let command = msg.content.split(" ");
  if (command[0].startsWith("!")) {
    command = command[0].substring(1);
    if (commandsList.hasOwnProperty(command))
      return await commandsList[command](msg);
    else return;
  }
};
