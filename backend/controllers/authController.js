const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let refreshTokens = [];

const authController = {
  createAccessToken: (user) => {
    return jwt.sign(
      { id: user.id, admin: user.isAdmin },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "20s" }
    );
  },
  createRefreshToken: (user) => {
    return jwt.sign(
      { id: user.id, admin: user.isAdmin },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "1d" }
    );
  },

  //REGISTER
  registerUser: async (req, res) => {
    try {
      //Create hashed password
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);

      //Create new user
      const newUser = await new User({
        username: req.body.username,
        email: req.body.email,
        password: hashed,
      });

      //Save user to DB
      const user = await newUser.save();
      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        return res.status(404).json("Wrong username");
      }

      const validPassword = bcrypt.compare(req.body.password, user.password);

      if (!validPassword) {
        return res.status(404).json("Wrong password");
      }

      if (user && validPassword) {
        const accessToken = authController.createAccessToken(user);
        const refreshToken = authController.createRefreshToken(user);

        refreshTokens.push(refreshToken);

        //save refreshtoken in cookie
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });

        const { password, ...other } = user._doc;

        return res.status(200).json({ other, accessToken });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  requestRefreshToken: async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    console.log(refreshTokens);

    if (!refreshToken) {
      return res.status(401).json("You are not authenticated");
    }

    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json("Request token is not valid");
    }

    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
      if (err) {
        console.log(err);
      }
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
      const newAccessToken = authController.createAccessToken(user);
      const newRefreshToken = authController.createRefreshToken(user);

      refreshTokens.push(newRefreshToken);

      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });

      return res.status(200).json({ accessToken: newAccessToken });
    });
  },
  userLogout: async (req,res)=>{
    res.clearCookie("refreshToken");
    refreshTokens = refreshTokens.filter(token => token !== req/cookies.refreshToken);
    return res.status(200).json("Logged out")
  }
};

module.exports = authController;
