const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;
const adminsSchema = Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = model("Admins", adminsSchema)