// you are not authorized
const mongoose = require("mongoose");
const Users = require("../models/users");

exports.addUser = async (req, res) => {
  const userName = req.body.userName.toString();
  const name = req.body.name.toString();
  const password = req.body.password.toString();
  try {
    const user = await new Users({
      _id: mongoose.Types.ObjectId(),
      userName,
      name,
      password,
    });
    const saveUser = await user.save();
    return res.status(201).json({
      saveUser,
    });
  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).json({
      message: "fail",
      success: false,
      error,
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await Users.find().select("id name userName password");
    return res.status(200).json({
      Total: users.length,
      users,
    });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({
      success: false,
      error,
    });
  }
};
exports.updateUser = async (req, res) => {
  const id = req.params.id.toString();
  try {
    const getById = await Users.find({ _id: id });
    if (getById.length === 0 || !getById) {
      console.log(error);
      return res.status().json({
        message: "User not found",
        success: false,
        error,
      });
    } else {
      const updates = {};
      for (const key in req.body) {
        if (req.body.hasOwnProperty(key)) {
          updates[key] = req.body[key];
        }
      }
      try {
        const updateUser = await Users.updateOne(
          { _id: id },
          { $set: updates }
        );
        return res.status(200).json({
          message: "update",
          success: true,
          updateUser,
        });
      } catch (error) {
        console.log("Error", error);
        return res.status(500).json({
          success: false,
          error,
        });
      }
    }
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({
      success: false,
      error,
    });
  }
};
exports.deleteUser = async (req, res) => {
  const id = req.params.id.toString();
  try {
    const deleteUser = await Users.findByIdAndDelete({ _id: id });
    return res.status(200).json({
      message: "delete user",
      success: true,
      deleteUser,
    });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({
      message: "update user",
      success: false,
      error,
    });
  }
  y;
};
