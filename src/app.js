const express = require("express");
const app = express();
const connectDB = require("./data/db");
const routes = require("./routes/");
const cors = require("cors");
const logger = require("morgan");

app.use(cors());
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
app.get("/", (req, res) => {
  res.send("Hi 🤖 bip bop...");
});

module.exports = { app, connectDB };
