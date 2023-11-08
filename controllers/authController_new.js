const express = require('express');
const userModel = require('../models/userModel.js');
const jwt = require('jsonwebtoken');
const {JWT_KEY} = require('../secrets.js');

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
            let existingUser = userModel.findOne({email : data.email});
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
    return function (req, res){
        if(roles.includes(req.body.role) == true)
        {
            next();
        }
        else{
            res.json({
                message : "You are not the admin"
            })
        }
    }
}

module.exports.protectRoute  = async function protectRoute(req, res, next){
    try {
        let token;
        if(req.cookies.login)
        {
            token = req.cookies.login;
            let payload = jwt.verify(token, JWT_KEY);
            if(payload)
            {
                const user = await userModel.findById(payload.payload);
                req.role = user.role;
                req.id = user.id;
                next();
            }
            else{
                return res.json({
                    message : "User not verified"
                })
            }
        }
    } catch (error) {
        console.log(error.message);
    }
}