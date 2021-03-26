const mongoose = require("mongoose");
const Commands = require("../models/commands");

exports.getCommands = async (req, res) => {
  try {
    const commands = await Commands.find().select("command cmdReturn");
    if (req || res) {
      
      res.status(200).json({
        commands,
      });
    }
    return commands;
  } catch (error) {
    console.log("Error: ", error);
  }
};

exports.addCommand = async (req, res) => {
  try {
    const command = req.body.command.toString();
    const cmdReturn = req.body.cmdReturn.toString();
    const insertCommands = await new Commands({
      _id: mongoose.Types.ObjectId(),
      command,
      cmdReturn,
    });
    const saveCommand = await insertCommands.save();
    res.status(201).json({
      command,
      cmdReturn,
      saveCommand,
    });
  } catch (error) {
    console.log("Error: ", error);
  }
};
