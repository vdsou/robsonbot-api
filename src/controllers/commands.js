const mongoose = require("mongoose");
const Commands = require("../models/command");

exports.getOneCommand = async (command) => {
  const update = await Commands.findOne({ command });
  return update;
};
exports.getCommandById = async (req, res) => {
  try {
    const id = req.params.id.toString();
    const command = await Commands.findOne({ _id: id });
    return res.status(200).json(command);
  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).json({
      success: false,
      error,
    });
  }
};
exports.getCommands = async (req, res) => {
  try {
    const commands = await Commands.find().select(
      "command cmdReturn image count audioYt"
    );
    if (req || res) {
      return res.status(200).json({
        Total: commands.length,
        commands,
      });
    }
    return commands;
  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).json({
      success: false,
      error,
    });
  }
};
exports.addCommand = async (req, res) => {
  try {
    const {command, image, cmdReturn, count, audioYt} = req.body;
    const insertCommand = await new Commands({
      _id: mongoose.Types.ObjectId(),
      command,
      image,
      cmdReturn,
      count,
      audioYt,
    });
    const saveCommand = await insertCommand.save();
    return res.status(201).json({
      command,
      image,
      cmdReturn,
      count,
      audioYt,
    });
  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).json({
      message: "fail",
      success: false,
      error,
    });
  }
};
exports.updateCommand = async (req, res) => {
  const id = req.params.id.toString();
  try {
    const getById = await Commands.find({ _id: id });
    if (getById.length === 0 || !getById) {
      return res.status(404).json({
        message: "Not found",
        success: false,
      });
    } else {
      const updates = {};
      for (const key in req.body) {
        if (req.body.hasOwnProperty(key)) {
          updates[key] = req.body[key];
        }
      }
      try {
        const update = await Commands.updateOne({ _id: id }, { $set: updates });
        return res.status(200).json({
          message: "update",
          success: true,
          updates,
        });
      } catch (error) {
        console.log("Error", err);
        return res.status(500).json({
          message: "update",
          success: false,
          error: err,
        });
      }
    }
  } catch (error) {
    console.log("Error: commands not found!", error);
    return res.status(500).json({
      error,
    });
  }
};
exports.deleteCommand = async (req, res) => {
  const id = req.params.id.toString();
  try {
    const deleteCommand = await Commands.findOneAndDelete({ _id: id });
    if (!deleteCommand) {
      return res.status(404).json({
        message: "Not found",
        success: false,
        deleted: deleteCommand,
      });
    }
    return res.status(200).json({
      message: "delete",
      success: true,
      deleted: deleteCommand,
    });
  } catch (error) {
    return res.status(500).json({
      message: "delete",
      success: false,
      error,
    });
  }
};
exports.updateCount = async (command, newCount) => {
  const updateCount = await Commands.findOneAndUpdate(
    { command },
    { count: newCount }
  );
  return updateCount;
};
