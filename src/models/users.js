const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;
const usersSchema = Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userName: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = model("Users", usersSchema)