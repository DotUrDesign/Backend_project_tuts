const express = require('express');
const userRouter = express.Router();
const {getUser, updateUser,deleteUser, getAllUsers} = require('../controllers/userController_new.js');
const {signup, login, isAuthorized, protectRoute, forgetPassword, resetPassword, logout} = require('../controllers/authController_new.js');
const cookieParser = require('cookie-parser');
userRouter.use(cookieParser());

// options for the user => update, delete
userRouter
.route('/:id')   // for a particular user
.patch(updateUser)
.delete(deleteUser);

userRouter
.route('/signup')
.post(signup);

userRouter
.route('/login')
.post(login);

userRouter
.route('/forgetPassword')
.post(forgetPassword);

userRouter
.route('/resetPassword/:token')
.post(resetPassword);

userRouter
.route('/logout')
.get(logout);

// profile page
userRouter.use(protectRoute);
userRouter
.route('/userProfile')
.get(getUser);

// get all user information -> only possible for the admin.
userRouter.use(isAuthorized(['admin']));  // is the loggedIn user is admin.
userRouter
.route('/')
.get(getAllUsers);

module.exports = userRouter;


