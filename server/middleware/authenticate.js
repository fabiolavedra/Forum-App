const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = (req, res, next) => {
  jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY, (err, payload) => {
    if (err) {
      res.status(401).json({ verified: false });
    } else {
      req.user = payload;
      console.log("adeff", req.user);
      next();
    }
  });
};

module.exports = {
  authenticate,
};
