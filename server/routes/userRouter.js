const express = require('express');
const {
  register,
  login,
} = require("../controllers/userController");

const userRouter = express.Router();

//Register
userRouter.post('/register', register);

//Login
userRouter.post('/login', login);

module.exports = userRouter;