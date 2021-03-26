const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const commandsSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  command: { type: String, required: true },
  cmdReturn: { type: String, required: true },
});

module.exports = model("Commands", commandsSchema);
