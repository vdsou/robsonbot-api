const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const commandSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: {
    ref: "User",
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  command: { type: String, required: true },
  image: String,
  cmdReturn: String,
  count: Number,
  audioYt: String,
  createdAt: { type: Date, default: new Date() },
});

module.exports = model("Command", commandSchema);
