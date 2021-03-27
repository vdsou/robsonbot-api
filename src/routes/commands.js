const express = require("express");
const router = express.Router();
const commandsController = require("../controllers/commands");
router.get("/get", commandsController.getCommands);
router.post("/insert", commandsController.addCommand);
router.patch("/update/:id", commandsController.updateCommand);
router.delete("/delete/:id", commandsController.deleteCommand);
module.exports = router;
