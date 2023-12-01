const express = require('express');
const userRouter = express.Router();
const {getUser, updateUser,deleteUser, getAllUsers, updateProfileImage} = require('../controllers/userController_new.js');
const {signup, login, isAuthorized, protectRoute, forgetPassword, resetPassword, logout} = require('../controllers/authController_new.js');
const multer = require('multer');
const cookieParser = require('cookie-parser');
userRouter.use(cookieParser());

// options for the user => update, delete
userRouter
.route('/:id')   // for a particular user
.patch(updateUser)
.delete(deleteUser);

userRouter
.route('/signup')
.post(signup);

userRouter
.route('/login')
.post(login);

userRouter
.route('/forgetPassword')
.post(forgetPassword);

userRouter
.route('/resetPassword/:token')
.post(resetPassword);

// this function will store the uploaded files.
const multerStorage = multer.diskStorage({ 
    destination: function(req, file, callback){
        callback(null, 'public/images')  // whichever file is uploaded by the client, will be stored in the backend/server in the destination - public/images
    },
    filename: function(req, file, callback){
        callback(null, `user-${Date.now()}.jpeg`)
    }
});

// this function will validate the type of file uploaded by the client.
const filter = function(req, file, callback){
    if(file.mimetype.startsWith("image")) {
        callback(null, true);
    }
    else{
        callback(new Error("Not an Image! Please upload an Image"), false)
    }
}

// upload -> storage, filter
// storage -> destination and filename
// filter -> validation of the uploaded file
const upload = multer({
    storage: multerStorage,
    fileFilter: filter,
    limits: {
        fileSize: 1024 * 1024 * 5, // 5MB limit
    }
});

userRouter.post("/ProfileImage", upload.single('photo'), updateProfileImage);
// get request
userRouter.get('/ProfileImage', (req, res) => {
    res.sendFile("/Users/PRATYUSH/Desktop/Backend Tutorial Project/multer.html")
})

// profile page
userRouter.use(protectRoute);
userRouter
.route('/userProfile')
.get(getUser);

userRouter
.route('/logout')
.get(logout);

// get all user information -> only possible for the admin.
userRouter.use(isAuthorized(['admin']));  // is the loggedIn user is admin.
userRouter
.route('/')
.get(getAllUsers);

module.exports = userRouter;


