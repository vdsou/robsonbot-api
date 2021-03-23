const express = require("express");
const app = express();
const PORT = process.env.PORT | 3000;

app.get("/", (req, res) => {
    res.send("HI")
});

app.listen(PORT, () => {
  console.log("Connected to port: ", PORT);
});
