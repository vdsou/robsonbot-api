const mongoose = require("mongoose");
const HOST = process.env.HOST;
const DB_NAME = process.env.DB_NAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_USER = process.env.DB_USER;
const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@node-rest-shop.jg8pj.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connectDB = mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = connectDB;
