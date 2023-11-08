const express = require('express');
const userRouter = express.Router();
// const userModel = require('../models/userModel');
const protectRoute = require('./authHelper.js');
const {getUser, postUser, deleteUser} = require('../controllers/userController.js');

userRouter
.route('/')
.get(protectRoute,getUser)
.post(postUser)
.delete(deleteUser)

module.exports = userRouter;