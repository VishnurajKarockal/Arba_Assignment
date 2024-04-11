const express = require("express");

const userRouter = express.Router();
userRouter.use(express.json());
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { userModel } = require("../model/user.model");
const { auth } = require("../middlewares/auth.middleware");

// Register new user
userRouter.post("/register", async (req, res) => {
  const { fullName, userName, email, password, avatar } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.status(400).json({ err });
      }
      const user = new userModel({
        fullName,
        userName,
        email,
        password: hash,
        avatar,
      });
      await user.save();
      res.status(200).json({ msg: "New user has been added!" });
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// User login
userRouter.post("/login", async (req, res) => {
  const { userName, password } = req.body;
  const user = await userModel.findOne({ userName });
  try {
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          // console.log("fffffffffffff", user);
          var token = jwt.sign({ userID: user._id }, "masai");
          res.status(200).json({ msg: "Logged in successful", token });
        } else {
          res.status(400).json({ msg: "Invalid password" });
        }
      });
    } else {
      res.status(400).json({ msg: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

//Update fullName avatar and password
userRouter.patch("/update", auth, async (req, res) => {
  const { userName, email, password } = req.body;
  const { userID } = req.body;
  try {
    await userModel.findByIdAndUpdate(userID, { userName, email, password });
    res.status(200).json({ msg: `User details has been updated!` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = { userRouter };
