const express = require('express');
const userRouter = express.Router();
const userModel = require('../models/userModel');
const protectRoute = require('./authHelper.js');

userRouter
.route('/')
.get(protectRoute,getUser)
.post(postUser)
.delete(deleteUser)


// get method - I am the server(dena har baar mujhe hi hai - in this case, server bann ke)
async function getUser(req, res){
    let data = await userModel.find({});
    return res.json({
        data: data
    }); 
}

// post method - I am the client (dena har baar mujhe hi hai - in this case, client bann ke)
async function postUser(req, res){
    let obj = req.body;
    let data = await userModel.create(obj);

    res.json({
        message: "post request has been implemented.",
        user : data
    });
}

// delete method
async function deleteUser (req, res) {
    let data = req.body;
    let obj = await userModel.findOneAndDelete({email: data.email});

    res.send({
        message : "delete request has been implemented",
        user : obj
    });
}

module.exports = userRouter;