const express = require('express');
const app = express();
const userModel = require('./models/userModel.js');
// const authRouter = require('./Routers/authRouter.js');
const userRouter = require('./Routers/userRouter_new.js');
const planModel = require('./models/planModel.js');
const planRouter = require('./Routers/planRouter.js');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
    console.log("server is running on port 3000");
});

// base route , router to be used
// app.use('/auth', authRouter);

//base route, router to use
app.use('/user', userRouter);

app.use('/plans', planRouter);









