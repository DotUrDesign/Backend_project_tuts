const emailValidator = require('email-validator');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


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
        unique: true,
        validate: function(){
            return emailValidator.validate(this.email);
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    confirmPassword: {
        type: String, 
        required: true,
        minLength: 8,
        validate: function(){
            return this.confirmPassword == this.password;
        }
    },
    role: {
        type : String,
        enum: ['admin', 'user', 'restaurantowner', 'deliveryboy'],
        default: 'user'
    },
    profileImage: {
        type: String,
        dafault: 'img/users/default.jpeg'
    }
});

/*

// before save event occurs in the database
userSchema.pre('save', function(){
    console.log("before saving into the db",this);
})

// after save event occurs in the database
userSchema.post('save', function(doc) {
    console.log("after saving into the db",doc);
})

*/

// I dont want to save the confirmPassword attribute into the database. Preventing data-redundancy
userSchema.pre('save', function(){
    this.confirmPassword = undefined;
})

// Before the password is saved into the db, we have to hash the password.
// userSchema.pre('save', async function(){
//     let salt = await bcrypt.genSalt();
//     let hashedString = await bcrypt.hash(this.password, salt);
//     // console.log(hashedString);
//     this.password = hashedString;
// });

// model
const userModel = mongoose.model('userModel', userSchema);
module.exports = userModel;

/*

// immediate invoking function - no need to call this function 
(async function createUser() {
    let users = {
        name : "test8",
        email: "test8@gmail.com",
        password: "test1234",
        confirmPassword: "test1234"
    };

    // let users = [
    //     {
    //         name : "test1",
    //         email: "test1@gmail.com",
    //         password: "test1234",
    //         confirmPassword: "test1234"
    //     },
    //     {
    //         name : "test2",
    //         email: "test2@gmail.com",
    //         password: "test1234",
    //         confirmPassword: "test1234"
    //     },
    //     {
    //         name : "test3",
    //         email: "test3@gmail.com",
    //         password: "test1234",
    //         confirmPassword: "test1234"
    //     }
    // ]

    let data = await userModel.create(users);  // This line uses the Mongoose model, userModel, to create a new user document in the database. It takes the user object as the data to be inserted. The await keyword is used because create is an asynchronous operation that returns a Promise. This allows you to wait for the creation to complete before proceeding.
    
    
    console.log(data);
})();


*/

