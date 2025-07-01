const User = require("../models/user.model");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  console.log("user", { real: user, fe: req.body.password });
  if (user === null) {
    return res.sendStatus(400);
  }

  const correctPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );

  console.log("correctPass", { correctPassword, password: user.password });

  if (!correctPassword) {
    return res.sendStatus(400);
  }

  console.log();

  const userToken = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.SECRET_KEY
  );

  res
    .cookie("usertoken", userToken, {
      httpOnly: true,
    })
    .json({ msg: "success!" });
};

module.exports.register = (req, res) => {
  User.create(req.body)
    .then((user) => {
      const userToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
      res
        .cookie("usertoken", userToken, {
          httpOnly: true,
        })
        .json({ msg: "success!", user: user });
    })
    .catch((err) => res.status(500).json(err));
};

module.exports.logout = (req, res) => {
  res.clearCookie("usertoken");
  res.sendStatus(200);
};

module.exports.getMe = async (req, res) => {
  try {
    const user = (await User.findById(req.user.id)).toJSON();
    delete user.password;
    return res.json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports.addFavourite = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (user.favouritePosts.includes(req.params.id)) {
      return res
        .status(400)
        .json({ message: "You have already favourited this post!" });
    }
    user.favouritePosts.push(req.params.id);
    const newUser = (await user.save()).toJSON();
    delete newUser.password;
    return res.json(newUser);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};
module.exports.unfavourite = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user.favouritePosts.includes(req.params.id)) {
      return res
        .status(400)
        .json({ message: "You have already favourited this post!" });
    }
    user.favouritePosts.pull(req.params.id);
    const newUser = (await user.save()).toJSON();
    delete newUser.password;
    return res.json(newUser);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};

module.exports.getFavourites = async (req, res) => {
  try {
    const userId = req.user.id;
    const allFavouritePosts = await User.findById(userId).populate({
      path: "favouritePosts",
      populate: [{ path: "createdBy" }, { path: "replies.user" }],
    });
    const user = allFavouritePosts.toJSON();
    delete user.password;
    return res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
