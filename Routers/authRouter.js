const userModel = require('../models/userModel.js');
const express = require('express');
const authRouter = express.Router();
const {signup, login} = require('../controllers/authController_new.js');

authRouter
.route('/signup')
.get(getSignUp)
// .post(postSignUp);

// authRouter
// .route('/login')
// .post(postlogin);

// I am the server.
function getSignUp(req, res){
    console.log("get signup");
    res.sendFile('public/index.html', {root : __dirname});
}

module.exports = authRouter;