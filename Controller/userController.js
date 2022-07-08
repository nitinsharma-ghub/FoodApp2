const userModel = require("../Model/userModel");
const jwt = require("jsonwebtoken");
const JWT_KEY = 'nkslngkd02j3fnkdngkfng0weo';

// module.exports.getSignIn = function getSignIn(req,res){
//     res.sendFile('LogIn.html', {root:__dirname});
// }

module.exports.updateUser =  async function updateUser(req,res){
    try{
        let id = req.params.id;
        let user = await userModel.findById(id);
        let dataToBeUpdated = req.body;
        if(user){
            let keys = [];
            for(key in dataToBeUpdated){
                keys.push(key);
            }
            for(let i = 0;i<keys.length;i++){
                user[keys[i]] = dataToBeUpdated[keys[i]];
            }
            const updatedData = await user.save();
            res.json({
                message: "Data Updated Successfully",
                data: updatedData
            });
        }
        else{
            res.json({
                message: "User not found"
            })
        }
    }
    catch(err){
        res.json({
            message: err.message
        });
    }
}

module.exports.protectRoute = async function protectRoute(req,res,next){
    try{
        let token;
        if(req.cookies.isLoggedIn){
            token = req.cookies.isLoggedIn;
            let payload = jwt.verify(token,JWT_KEY);
            if(payload){
                const user = await userModel.findById(payload.payload);
                req.role = user.role;
                console.log(req.role);
                req.id = user.id;
                next();
            }
            else{
                res.json({
                    message: "User not verified"
                });
            }
        }
        else{
            res.json({
                message: "Please LogIn"
            });        
        }
    }
    catch(err){
        res.json({
            d: "pr",
            message: err.message
        });
    }
}

module.exports.getUser = async function getUser(req,res){
    try{
        let id = req.id;
        let user = await userModel.findById(id);
        if(user){
            res.json(user);
        }
        else{
            res.json({
                message: "User not found"
            });
        }
    }
    catch(err){
        res.json({
            message: err.message
        });
    }
}

module.exports.deleteUser = async function deleteUser(req,res){
    try{
        let id = req.params.id;
        let user = await userModel.findByIdAndDelete(id);
        if(user){
            res.json({
                message: "User deleted Successfully",
                data: user
            });
        }
        else{
            res.json({
                message: "User not found"
            });
        }
    }
    catch(err){
        res.json({
            message: err.message
        });
    }
}

module.exports.getAllUser = async function getAllUser(req,res){
    try{
        let users = await userModel.find();
        if(users){
            res.json({
                message: "Data Retrieved",
                data: users,
                NumberOfUsers: users.length
            });
        }
        else{
            res.json({
                message: "No users"
            })
        }
    }
    catch(err){
        res.json({
            message: err.message
        });
    }
}

module.exports.uploadProfileImage = function uploadProfileImage(req,res){
    res.json("Image Uploaded Successfully");
}