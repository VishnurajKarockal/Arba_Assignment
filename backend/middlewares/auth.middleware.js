var jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    jwt.verify(token, "masai", async (err, decoded) => {
      if (err) {
        res.status(400).json({ msg: "Invalid token" });
      } else {
        console.log("eeeeeeeeeeeee", decoded);
        req.userID = decoded.userID;
        next();
      }
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = { auth };
