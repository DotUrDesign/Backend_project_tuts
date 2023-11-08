const userModel = require('../models/userModel.js');
const express = require('express');
const authRouter = express.Router();
const jwt = require('jsonwebtoken');
const JWT_KEY = 'duchdaoifuc2382e273jhsbdcku';

authRouter
.route('/signup')
.get(getSignUp)
.post(postSignUp);

authRouter
.route('/login')
.post(postlogin);

// I am the server.
function getSignUp(req, res){
    console.log("get signup");
    res.sendFile('public/index.html', {root : __dirname});
}

// I am the client.
function postSignUp(req, res) {
    console.log()
    let data = req.body;

    // console.log(obj);
    res.json({
        message: "user is signed up",
        data : data
    });
};

async function postlogin(req, res){
    let data = req.body;
    try {
        if(data.email)
        {
            let _data = await userModel.findOne({email : data.email});
            if(_data)
            {
                if(_data.password == data.password)
                {
                    /* via creating cookies */
                    // res.cookie('isLoggedIn', true,{httpOnly: true});

                    /* via JSON web token */
                    let uid = _data['id'];
                    let token = jwt.sign({payload:uid}, JWT_KEY);  // payload, secret key and algorithm(not defining it means default algorithm)
                    res.cookie('isLoggedIn', token);
                    return res.json({
                        message : "User is logged in",
                        data : data
                    })
                }
                else 
                {
                    return res.json({
                        message : "Wrong credentials"
                    })
                }
            }
            else
            {
                return res.json({
                    message : "user not found"
                })
            }
        }
        else
        {
            return res.json({
                message : "field missing"
            })
        }
    }  
    catch (err) {
        console.log(err.message);
    }
}

module.exports = authRouter;