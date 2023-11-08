const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.json());

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

function getSignUp(req, res){
    console.log("get signup");
    res.sendFile('/public/index.html', {root : __dirname});
}

async function postSignUp(req, res) {
    /* find operation */
    // let allUsers = await userModel.find();
    /* findOne operation */
    // let reqUser = await userModel.findOne({name : "Prats"});
    /* insert operation */
    // let obj = req.body;
    // let dataToBeInserted = await userModel.create(obj);  // it returns a promise.
    /* update operation */
    // let data = req.body;
    // let userToBeUpdated = await userModel.findOneAndUpdate({name: "test"}, data);
    /* delete operation */
    // let data = req.body;
    // let userToBeDeleted = await userModel.findOneAndDelete(data);
    res.json({
        message: "post sign up",
        // data : obj,
        // Users: allUsers,
        // reqUser : reqUser,
        // dataToBeInserted : dataToBeInserted
        // userToBeUpdated : userToBeUpdated
        // userToBeDeleted : userToBeDeleted
    });
};

const db_link = 'mongodb+srv://Prats:Prats123@cluster0.iy4gzd4.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_link)
.then(function(db){
    // console.log(db);
    console.log('db connected');
})
.catch(function(err){
    console.log(err);
})

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    confirmPassword: {
        type: String, 
        required: true,
        minLength: 8
    }
});

// model
const userModel = mongoose.model('userModel', userSchema);

/*

// immediate invoking function - no need to call this function 
(async function createUser() {
    let user = {
        name: 'Pratyush1',
        email: 'abcd1@gmail.com',
        password: '12345678',
        confirmPassword: '12345678'
    };

    let data = await userModel.create(user);  // This line uses the Mongoose model, userModel, to create a new user document in the database. It takes the user object as the data to be inserted. The await keyword is used because create is an asynchronous operation that returns a Promise. This allows you to wait for the creation to complete before proceeding.
    console.log(data);
})();

*/

