const userModel = require('../models/userModel.js');

// getUser
module.exports.getUser = async function getUser(req, res){
    let id = req.params.id;
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
        let id = req.params.id;
        let user = await userModel.findById(id);
        let dataToBeUpdated = req.body;
        if(user)
        {
            let keys = [];
            // the array now consists of fields that are to be updated.
            for(let key in dataToBeUpdated)
                keys.push(key);

            for(let i=0;i<keys.length;i++)
                user[keys[i]] = dataToBeUpdated[keys[i]];

            let updatedData = await user.save();  // saving into the db.
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