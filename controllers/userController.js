const userModel = require('../models/userModel');

// get method - I am the server(dena har baar mujhe hi hai - in this case, server bann ke)
module.exports.getUser = async function getUser(req, res){
    let data = await userModel.find({});
    return res.json({
        data: data
    }); 
}

// post method - I am the client (dena har baar mujhe hi hai - in this case, client bann ke)
module.exports.postUser = async function postUser(req, res){
    let obj = req.body;
    let data = await userModel.create(obj);

    res.json({
        message: "post request has been implemented.",
        user : data
    });
}

// delete method
module.exports.deleteUser = async function deleteUser (req, res) {
    let data = req.body;
    let obj = await userModel.findOneAndDelete({email: data.email});

    res.send({
        message : "delete request has been implemented",
        user : obj
    });
}