const mongoose = require("mongoose");
const Users = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../models/user");

exports.addUser = async (req, res, next) => {
  const userName = req.body.userName.toString();
  const name = req.body.name.toString();
  const password = req.body.password.toString();

  try {
    const getUsername = await Users.find({ userName });
    if (getUsername.length >= 1) {
      return res.status(409).json({
        message: "Conflit",
      });
    } else {
      try {
        bcrypt.hash(password, 10, async (err, hash) => {
          if (err) {
            return res.status(500).json({
              error,
            });
          } else {
            const user = await new Users({
              _id: mongoose.Types.ObjectId(),
              userName,
              name,
              password: hash,
            });
            const saveUser = await user.save();
            return res.status(201).json({
              message: "User created successfully",
              saveUser,
            });
          }
        });
      } catch (error) {
        console.log("Error: ", error);
        return res.status(500).json({
          message: "fail",
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
exports.getUsers = async (req, res, next) => {
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
exports.userLogin = async (req, res, next) => {
  const userName = req.body.userName.toString();
  const password = req.body.password.toString();

  try {
    const getUser = await Users.findOne({ userName: userName });
    // console.log(getUser, password, userName);
    if (getUser) {
      bcrypt.compare(password, getUser.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Authentication faild",
            success: false,
            pass: false,
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              userId: getUser._id,
              userName: getUser.userName,
            },
            process.env.JWT_KEY,
            { expiresIn: "1h" }
          );
          return res.status(200).json({
            message: "Authentication done successfully",
            success: true,
            token,
          });
        }
        return res.status(401).json({
          message: "Authentication failed",
        });
      });
    } else {
      return res.status(401).json({ message: "Auth failed" });
    }
  } catch (error) {
    console.log("Error. User not found", error);
    return res.status(500).json({
      error,
    });
  }
};
exports.deleteUser = async (req, res, next) => {
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
