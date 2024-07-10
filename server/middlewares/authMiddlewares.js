const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = verifiedToken.userid;
    next();
  } catch (e) {
    return res.status(401).json({ success: false, message: "Token is invalid!" });
  }
}

module.exports = auth;