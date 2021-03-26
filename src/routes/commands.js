const express = require("express");
const router = express.Router();
const commandsController = require("../controllers/commands");
router.get("/getCommands", commandsController.getCommands);
router.post("/insert", commandsController.addCommand);

module.exports = router;
