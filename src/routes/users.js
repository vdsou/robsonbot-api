const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");

router.get("/get", usersController.getUsers);
router.post("/insert", usersController.addUser);
router.patch("/update/:id", usersController.updateUser);
router.delete("/delete/:id", usersController.deleteUser);

module.exports = router;
