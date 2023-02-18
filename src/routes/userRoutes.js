const express = require('express');
const { signup, signin, signout } = require('../controllers/userController');
const userRouter = express.Router();


userRouter.post("/signup",signup);
userRouter.post("/signin",signin);
userRouter.get("/signout",signout)

module.exports = userRouter