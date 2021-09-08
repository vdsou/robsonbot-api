const express = require("express");
const router = express.Router();
const commandsController = require("../controllers/commands");
const checkAuth = require("../middlewares/checkAuth")
router.get("/get", commandsController.getCommands);
router.get("/getcommand/:id", commandsController.getCommandById);
router.post("/insert", checkAuth, commandsController.addCommand);
router.patch("/update/:id", checkAuth ,commandsController.updateCommand);
router.delete("/delete/:id", checkAuth, commandsController.deleteCommand);
module.exports = router;
