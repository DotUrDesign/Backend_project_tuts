const express = require('express');
const app = express();

/*
There are two types of middleware -
1) global middleware
2) path specific middleware
*/

app.use(express.json());  // global middleware

app.listen(3000, () => {
    console.log("server is running on port 3000");
});

const authRouter = express.Router();
// base url, router to be used
app.use('/auth', authRouter);  // global middleware

authRouter
.route('/signup')
.get(middleware1, getSignUp, middleware2)   
.post(postSignUp);   // path specific middleware

function middleware1(req, res, next) {
    console.log("middleware1 encountered");
    next();
}

function middleware2(req, res){
    console.log("middleware2 encountered");
    console.log("middleware2 ended");
    res.sendFile('/public/index.html', {root : __dirname});
}

function getSignUp(req, res,next) {
    console.log("get signed up");
    next();
}

function postSignUp(req, res) {
    console.log(req.body);
    let obj = req.body;
    res.json({
        message : "post signed up",
        data : obj
    });
};