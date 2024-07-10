const express = require('express');
const {
  register,
  login,
  getCurrentUser,
} = require("../controllers/userController");
const auth = require('../middlewares/authMiddlewares');

const userRouter = express.Router();

//Register
userRouter.post('/register', register);

//Login
userRouter.post('/login', login);

//Get current user
userRouter.get('/get-current-user', auth, getCurrentUser);

module.exports = userRouter;