const userModel = require('../models/userModel.js');

// getUser
module.exports.getUser = async function getUser(req, res){
    let id = req.id;
    // console.log(id);
    let userInfo = await userModel.findById(id);
    try {
        if(userInfo)
        {
            res.json({
                message: "User information",
                userInfo : userInfo
            });
        }
        else{
            res.json({
                message: "User not found!!"
            });
        }
    } catch (error) {
        console.log(error.message);
    }
}

// getAllUsers
module.exports.getAllUsers = async function getAllUsers(req, res){
    try {
        allUsers = await userModel.find();
        if(allUsers)
        {
            res.json({
                message: "All user information",
                allUsers : allUsers
            })
        }
    } catch (error) {
        console.log(error.message);
    }
}

// updateUser
module.exports.updateUser = async function updateUser(req, res){
    try {
        /*
        -> Use req.body for data sent in the request body (e.g., in POST or PUT requests).
        -> Use req.params for route parameters (like :id in the URL).
        -> Use req.query for query parameters (e.g., ?key=value in the URL).
         */
        let id = req.params.id;
        let user = await userModel.findById(id);
        console.log(user);
        let dataToBeUpdated = req.body;
        console.log(dataToBeUpdated);
        if(user)
        {
            let keys = [];
            // the array now consists of fields that are to be updated.
            for(let key in dataToBeUpdated)
                keys.push(key);

            console.log(keys);

            for(let i=0;i<keys.length;i++)
                user[keys[i]] = dataToBeUpdated[keys[i]];

            // console.log(user);
            let updatedData = await user.save();  // saving into the db.
            // console.log(updatedData);
            res.json({
                message: "User Info has been updated",
                userInfo: updatedData
            })
        }
        else
        {
            res.json({
                message: "User not found"
            })
        }
    } catch (error) { 
        console.log(error.message);
    }
}

// deleteUser
module.exports.deleteUser = async function deleteUser(req, res){
    try {
        let id = req.params.id;
        let deletedUser = await userModel.findByIdAndDelete(id);
        if(user)
        {
            res.json({
                message: "User has been deleted.",
                deletedUser: deletedUser
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