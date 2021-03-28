const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");
const checkAuth = require("../middlewares/checkAuth")

router.get("/get", usersController.getUsers);
router.post("/signup", usersController.addUser);
router.post("/login", usersController.userLogin);
router.delete("/delete/:id", checkAuth, usersController.deleteUser);

module.exports = router;
