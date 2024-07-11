const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
/**
 name: 'siri',
 email: 'siri@apple.com',
 password: 'steve',
 role: "admin"
 */
const register = async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.send({
        success: false,
        message: "User already exists, please sign in instead."
      });
    }

    const newUser = new User(req.body);
    await newUser.save();

    res.send({
      success: true,
      message: "User registered successfully"
    });
  } catch (e) {
    console.log("Error in userControllers: ", e);
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.send({
        success: false,
        message: "User doesn't exist, please register instead."
      });
    }

    if (user.password != req.body.password) {
      return res.send({
        success: false,
        message: "Invalid Password, please try again."
      });
    }

    const jwtToken = jwt.sign({ userid: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });
    res.send({
      success: true,
      message: "User logged in successfully",
      data: jwtToken
    });
  } catch (e) {
    console.log("Error in userControllers: ", e);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error"
    });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    let userId = req.body.userId;
    const user = await User.findById(userId).select("-password");
    res.send({
      success: true,
      data: user,
      message: "You are authorized to go to protected route",
    });
  } catch (e) {
    console.log("Error in userControllers: ", e);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error"
    });
  }
}

module.exports = { register, login, getCurrentUser };