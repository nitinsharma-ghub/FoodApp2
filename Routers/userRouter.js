const multer = require("multer");
const express = require("express");
// const protectRoute = require("./helper");
const userRouter = express.Router();
const userModel = require("../Model/userModel");
const {updateUser,deleteUser,getUser,protectRoute,getAllUser,uploadProfileImage} = require('../Controller/userController');
const {middleware,postSign,postLogIn,isAuthorised,resetPassword,forgetPassword, logOut} = require('../Controller/loginController');
// const app = require("../33Hashing");
// const { postSign } = require("./Controller/loginController");

//User Options
userRouter.route('/:id').patch(updateUser).delete(deleteUser);

//Profile Page 
// userRouter.use(protectRoute);
userRouter.route('/userProfile').get(protectRoute,getUser);

const multerStorage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'public/images')
    },
    filename: function(req,file,cb){
        cb(null, `user-${Date.now()}.jpeg`)
    }
});

const filter = function(req,file,cb){
    if(file.mimetype.startsWith("image")){
        cb(null,true);
    }
    else{
        cb(new Error("Not an image! Please upload an image"),false);
    }
}

const upload = multer({
    storage: multerStorage,
    fileFilter: filter
});

userRouter.post("/profileImage",upload.single('photo'),uploadProfileImage);
userRouter.get('/profileImage', (req,res)=>{
    res.sendFile("multer.html",{root: __dirname});
});


//Admin Functions
// userRouter.use(isAuthorised(['admin']));
userRouter.route('/admin').get(isAuthorised(['admin']),getAllUser);

//Log In and SignUp
userRouter.route('/logIn').post(postLogIn);
userRouter.route('/signUp').post(middleware,postSign);
userRouter.route('/logOut').get(logOut);

//Forgot Password and Reset Password
userRouter.route('/forgetPassword').post(forgetPassword);
userRouter.route('/resetPassword/:token').post(resetPassword);

module.exports = userRouter;