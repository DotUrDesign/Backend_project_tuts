const express = require('express');
const userRouter = express.Router();
const protectRoute = require('./authHelper.js');
const {getUser, updateUser,deleteUser, getAllUsers} = require('../controllers/userController.js');


// options for the user => update, delete
userRouter
.route('/:id')   // for a particular user
.patch(updateUser)
.delete(deleteUser);

// profile page
app.use(protectRoute);
userRouter
.route('/userProfile')
.get(getUser);

// get all user information -> only possible for the admin.
app.use(isAuthourized(['admin']));  // is the loggedIn user is admin.
userRouter
.route('')
.get(getAllUsers);

