const express = require('express');
const app = express();
const userModel = require('./models/userModel.js');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());  // without this middleware, you will "undefined" in the console.log statement of the function "getCookie".

app.listen(3000, () => {
    console.log("server is running on port 3000");
});

const authRouter = express.Router();
// base url , router to be used
app.use('/auth', authRouter);

authRouter
.route('/signup')
.get(getSignUp)
.post(postSignUp);

authRouter
.route("/getcookie")
.get(getCookie);

authRouter
.route("/setcookie")
.get(setCookie);

function getSignUp(req, res){
    console.log("get signup");
    res.sendFile('/public/index.html', {root : __dirname});
}

async function postSignUp(req, res) {
    let obj = req.body;
    let data = await userModel.create(obj);
    console.log(data);

    // console.log(obj);
    res.json({
        message: "post sign up",
        data : data
    });
};

function setCookie(req, res) {
    res.cookie('isLoggedIn', true, {maxAge: 1000*60*60*24, secure: true, httpOnly: true});
    /*
    isLoggedIn -> a cookie is stored in the user's browser named as "isLoggedIn".

    true -> the cookie is set to true which means that the user has been logged in.

    maxAge -> this is the time(in milliseconds) after which the cookie expires. In this case, it set to 24 hrs. Means after a day, the cookie "isLoggedIn" will be deleted from the user's browser.

    secure -> this option indicates that the cookie will be sent over secure(https) connections.

    httpOnly -> If set to true, this cookie can only be accessed by the server. Else, it can be viewed by the client which is insecure, that is if we type in the console -> "document.cookie", it will provide us the cookie if "httpOnly" is set to false.
    */


    res.cookie('cookie1', true, {maxAge: 1000*60*60*24, secure: true});
    res.cookie('cookie2', true, {maxAge: 1000*60*60*24, secure: true});
    res.send("cookie has been set !!");
}

function getCookie(req, res) {
    let cookies = req.cookies;
    let c1 = req.cookies.cookie1;   // returns the value of cookie - true or false.
    console.log(cookies); 
    console.log(c1);
    res.send("Cookies received");
}