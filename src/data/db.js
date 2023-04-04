const mongoose = require("mongoose");
const { DB_NAME, DB_PASSWORD, DB_USER, DB_PROJECT, HOST } = process.env;
const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_PROJECT}.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connectDB = async () => {
  const result = await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
  if (mongoose.connection.readyState === 1) {
    console.log("Database is connected.");
  }
};

module.exports = connectDB;
