const jwt = require("jsonwebtoken");
const userModel = require("../Model/userModel");
const { sendMail } = require("../utility/nodemailer");
const JWT_KEY = 'nkslngkd02j3fnkdngkfng0weo';

// module.exports.getSign = function getSign(req,res){
//     res.sendFile("SignUp.html", {root:__dirname});
// }

module.exports.middleware = async function middleware(req,res,next){
    let data = req.body;
    console.log("Before saving in db");
    if(data.password != data.confirmPassword){
        console.log("Password and confirm password are different");
        return;
    }
    // let salt = await bcrypt.genSalt();
    // let hashedString = await bcrypt.hash(data.password,salt);
    // data.password = hashedString;
    // console.log(hashedString);
    data.confirmPassword = undefined;
    next();
}

//sign up user
module.exports.postSign = async function signup(req, res) {
  try {
    let dataObj = req.body;
    let user = await userModel.create(dataObj);
    sendMail("signup",user);
    if (user) {
      return res.json({
        message: "user signed up",
        data: user,
      });
    } else {
      res.json({
        message: "error while signing up",
      });
    }
    // console.log('backend',user);
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

//login user

module.exports.postLogIn = async function login(req, res) {
  try {
    let data = req.body;
    if (data.email) {
      let user = await userModel.findOne({ email: data.email });
      if (user) {
        //bcrypt -> compare
        if (user.password == data.password) {
          let uid = user["_id"]; //uid
          let token = jwt.sign({ payload: uid }, JWT_KEY);
          res.cookie("login", token, { httpOnly: true });
          // res.cookie('isLoggedIn',true);
          return res.json({
            message: "User has logged in",
            data: user, // userDetails:data,
          });
        } else {
          return res.json({
            message: "wrong credentials",
          });
        }
      } else {
        return res.json({
          message: "User not found",
        });
      }
    } else {
      return res.json({
        message: "Empty field found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

//isAuthorised-> to check the user's role [admin,user,restaurant,deliveryboy]

module.exports.isAuthorised = function isAuthorised(roles){
  return function(req,res,next){
      // console.log(req.cookies.userRole);
      if(roles.includes(req.cookies.userRole) == true){
          next();
      }
      else{
          res.json({
              message: "Data is not accessible"
          });
      }
  }
}


//forgetPassword
module.exports.forgetPassword = async function forgetpassword(req, res) {
  let { email } = req.body;
  try {
    const user = await userModel.findOne({ email: email });
    if (user) {
      //createResetToken is used to create a new token
      const resetToken = user.createResetToken();
      // http://abc.com/resetpassword/resetToken
      let resetPasswordLink = `${req.protocol}://${req.get(
        "host"
      )}/resetpassword/${resetToken}`;
      //send email to the user
      //nodemailer
      let obj={
        resetPasswordLink:resetPasswordLink,
        email:email
      }
      sendMail("resetpassword",obj);
      return res.json({
        mesage: "reset password link sent",
        data:resetPasswordLink
      });
    } else {
      return res.json({
        mesage: "please signup",
      });
    }
  } catch (err) {
    res.status(500).json({
      mesage: err.message,
    });
  }
};

//resetPassword
module.exports.resetPassword = async function resetpassword(req, res) {
  try {
    const token = req.parmas.token;
    let { password, confirmPassword } = req.body;
    const user = await userModel.findOne({ resetToken: token });
    if (user) {
      //resetPasswordHandler will update user's password in db
      user.resetPasswordHandler(password, confirmPassword);
      await user.save();
      res.json({
        message: "password changed succesfully, please login again",
      });
    } else {
      res.json({
        message: "user not found",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.logOut=function logout(req,res){
  res.cookie('login',' ',{maxAge:1});
  res.json({
    message:"user logged out succesfully"
  });
}
