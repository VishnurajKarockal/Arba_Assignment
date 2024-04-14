const express = require("express");
const multer = require("multer");
const userRouter = express.Router();
userRouter.use(express.json());
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { userModel } = require("../model/user.model");
const { auth } = require("../middlewares/auth.middleware");

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/users"); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Set the filename for uploaded files
  },
  createParentPath: true, // This option will create parent directories if they don't exist
});
const upload = multer({ storage: storage });

// Register new user with file upload
userRouter.post("/register", upload.single("image"), async (req, res) => {
  const { fullName, userName, email, password } = req.body;
  const avatar = req.file ? req.file.path : null; // Get the file path if uploaded, or set to null

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

      res.status(200).send({ msg: "New user has been added!" });
    });
  } catch (error) {
    res.status(500).json({ msg: error.data.message });
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
          res.status(200).json({ msg: "Logged in successful", token, user });
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
userRouter.patch("/update", auth, upload.single("image"), async (req, res) => {
  const { userName, email, password } = req.body;
  const { userID } = req.body;

  try {
    const user = await userModel.findById(userID);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Delete previous avatar image if exists
    if (req.file && user.avatar) {
      fs.unlinkSync(user.avatar); // Delete the previous avatar image
    }

    // Update user details
    user.userName = userName || user.userName;
    user.email = email || user.email;
    user.password = password ? await bcrypt.hash(password, 5) : user.password;
    user.avatar = req.file ? req.file.path : user.avatar;

    await user.save();

    res.status(200).json({ msg: "User details have been updated!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = { userRouter };
