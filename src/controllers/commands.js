const mongoose = require("mongoose");
const Commands = require("../models/commands");

// exports.getCommands = Commands.find()
//   .select("command return")
//   .exec()
//   .then((result) => {
//     // console.log(result);
//     // return {
//     //   command: result.command,
//     //   return: result.return
//     // };
//     return result
//   })
//   .catch((err) => {
//     console.log(err);
//   });

exports.getCommands = async () => {
  try {
    const commands = await Commands.find().select("command return")
    return commands
  } catch (error) {
    console.log("error", error)
  }
};
