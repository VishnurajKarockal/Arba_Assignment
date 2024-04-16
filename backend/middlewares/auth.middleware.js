var jwt = require("jsonwebtoken");
const { blacklist } = require("../blacklist");
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    if (token) {
      if (blacklist.includes(token)) {
        res.status(400).json({ msg: "Please login again" });
      } else {
        jwt.verify(token, "masai", async (err, decoded) => {
          if (err) {
            res.status(400).json({ msg: "Invalid token" });
          } else {
            console.log("eeeeeeeeeeeee", decoded);
            req.userID = decoded.userID;
            next();
          }
        });
      }
    } else {
      res.status(400).json({ msg: "Please pass the token" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = { auth };
