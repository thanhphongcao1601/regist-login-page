const jwt = require("jsonwebtoken");

const middlewareController = {
  //Verify Token
  verifyToken: (req, res, next) => {
    const accessToken = req.headers.token;
    if (accessToken) {
      jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
        if (err) {
          return res.status(403).json("Token is not valid");
        }
        req.user = user;
        next();
      });
    } else {
      return res.status(401).json("You are not authenticated");
    }
  },
  verifyTokenAndAdmin: (req, res, next) => {
    verifyToken(req, res, () => {
      if (req.user.isAdmin) {
        next();
      } else {
        return res.status(403).json("You're not allowed to do that!");
      }
    });
  }
};

module.exports = middlewareController;
