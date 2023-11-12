const express = require('express');
const userModel = require('../models/userModel.js');
const jwt = require('jsonwebtoken');
const JWT_KEY = require('../secrets.js');

module.exports.signup = async function signup(req, res){
    try {
        let data = req.body;
        let newUser = await userModel.create(data);
        if(newUser)
        {
            res.json({
                message: "You have successfully signed up",
                newUser : newUser
            })
        }
        else{
            res.json({
                message: "Fill your credentials carefully."
            })
        }   
    } catch (error) {
        console.log(error.message);
    }
}

module.exports.login = async function login(req, res){
    try {
        let data = req.body;
        if(data.email)
        {
            let existingUser = await userModel.findOne({email : data.email});
            if(existingUser)
            {
                // bcrypt -> compare
                if(existingUser.password == data.password)
                {
                    let uid = existingUser['id'];
                    let token = jwt.sign({payload : uid}, JWT_KEY);
                    res.cookie('isLoggedIn', token);
                    res.json({
                        message: "You are logged in",
                        data : existingUser
                    })
                }
                else{
                    res.json({
                        message: "Wrong credentials"
                    })
                }
            }
            else{
                res.json({
                    message : "User not found"
                })
            }
        }
        else{
            res.json({
                message: "Fill the email first"
            })
        }
    } catch (error) {
        console.log(error.message);
    }
}

module.exports.isAuthorized = function isAuthorized(roles){
    return function (req, res, next){ 
        // console.log(req);
        if(roles.includes(req.role) == true){
            next();
        }
        else{
            res.status(401).json({
                message : "You are not the admin"
            })
        }
    }
}

module.exports.protectRoute  = async function protectRoute(req, res, next){
    try {
        if(req.cookies.isLoggedIn)
        {
            let token = req.cookies.isLoggedIn;
            let payload = await jwt.verify(token, JWT_KEY);
            if(payload)
            {
                const user = await userModel.findById(payload.payload);
                // console.log(user);
                // console.log(req);
                req.role = user.role;
                req.id = user.id;
                // console.log(req);
                next();
            }
            else{
                return res.json({
                    message : "User not verified"
                })
            }
        }
        else{
            // browser -> redirect the user back to login.
            let clients = req.get('User-Agent');
            if(clients.includes("Mozilla") == true){
                return res.redirect('/login');
            }
            // postman 
            else{
                res.json({
                    message: "Please login !!"
                })
            }
        }
    } catch (error) {
        console.log(error.message);
    }
}

module.exports.forgetPassword = async function forgetPassword(req, res){
    try {
        const {email} = req.body.email;
        const user = await userModel.find({email : email});
        if(user)
        {
            // createResetToken - function to create a new token - yet to built
            const resetToken = user.createResetToken();
            /* http://abc.com/resetPassword/resetToken 
                To maintain a unique link to reset password and sending it to the user to their mail, we actually append the unique token at the end of the link.
            */
            
            // console.log(this.resetToken);
            // console.log(user.resetToken);
        
            let resetPasswordLink = `${req.protocol}://${req.get('host')}/resetPassword/${resetToken}`;
    
            // send email -> nodemailer
        }
        else{
            res.json({
                message: "Please register first"
            })
        }
    } catch (error) {
        console.log(error.message);
    }
}

module.exports.resetPassword = async function resetPassword(req, res){
    try {
        let {password, confirmPassword} = req.body;
        let token = req.params.token;
        let user = await userModel.findOne({resetToken: token});
        if(user)
        {   
            // resetPasswordHandler - checks if password == confirmPassword - yet to built
            user.resetPasswordhandler(password, confirmPassword);
            await user.save();
            res.json({
                message: "User Password has been updated."
            })
        }
        else{
            res.json({
                message: "User not found"
            })
        }
    } catch (error) {
        console.log(error.message);
    }
}

module.exports.logout = function logout(req, res){
    res.cookie('isLoggedIn',' ', {maxAge: 1});
    res.json({
        message: "user logged out successfully"
    })
}

