var validator = require("email-validator");
const mongoose = require("mongoose");
const crypto = require("crypto");

let db_link = 'mongodb+srv://.sfvw8nm.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(db_link)
.then(function(db){
    console.log("Database Connected");
})
.catch(function(err){
    console.log(err);
});
const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        maxlength: [20,'User Name cannot exceed 20 letters']
    },
    email:{
        type:String,
        uniqe: [true,'Email Already in use'],
        required: true,
        validate: function(){
            return validator.validate(this.email);
        }
    },
    password:{
        type:String,
        required: true
    },
    confirmPassword:{
        type:String,
        // required: true,
        // validate: function(){
        //     return this.confirmPassword == this.password;
        // }
    },
    role:{
        type: String,
        enum: ['admin','user','Restaurant Owner','Delivery Boy'],
        default: 'user'
    },
    profileImage:{
        type: String,
        default: 'img/user/default.jpeg'
    },
    resetToken:{
        type: String
    }
});

userSchema.methods.createResetToken = function(){
    let resetToken = crypto.randomBytes(32).toString("hex");
    this.resetToken = resetToken;
    return resetToken;
}

userSchema.methods.resetPasswordHandler = function(pass,conpass){
    console.log(this);
    this.password = pass;
    this.resetToken = undefined;
}
// userSchema.pre('save', async function(){
//     console.log("Before saving in db");
//     let salt = await bcrypt.genSalt();
//     let hashedString = await bcrypt.hash(this.password,salt);
//     this.password = hashedString;
//     console.log(hashedString);
// })

// User Model
const userModel = mongoose.model('userModel',userSchema);

module.exports = userModel;
