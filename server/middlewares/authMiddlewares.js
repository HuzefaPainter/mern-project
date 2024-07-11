const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');

const getUserIdFromAuthHeader = (req) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    return verifiedToken.userid;
  } catch (e) {
    throw (new Error(e));
  }
}

const auth = (req, res, next) => {
  try {
    // const token = req.headers.authorization.split(" ")[1];
    // const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = getUserIdFromAuthHeader(req);
    next();
  } catch (e) {
    return res.status(401).json({ success: false, message: "Token is invalid!" });
  }
}

const partnerAuth = async (req, res, next) => {
  try {
    req.body.userId = getUserIdFromAuthHeader(req);
    const user = await User.findOne({ _id: req.body.userId });
    if (user.role === "user") {
      return res.status(403).json({ success: false, message: "Not authenticated for this action!" });
    }
    next();
  } catch (e) {
    return res.status(401).json({ success: false, message: "Token is invalid!" });
  }
}

const adminAuth = async (req, res, next) => {
  try {
    req.body.userId = getUserIdFromAuthHeader(req);
    const user = await User.findOne({ _id: req.body.userId });
    if (user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Not authenticated for this action!" });
    }
    next();
  } catch (e) {
    return res.status(401).json({ success: false, message: "Token is invalid!" });
  }
}
module.exports = { auth, adminAuth, partnerAuth };