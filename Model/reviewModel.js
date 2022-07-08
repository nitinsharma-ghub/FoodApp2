const mongoose = require("mongoose");
const planModel = require("./planModel");

let db_link = 'mongodb+srv://admin:uozJh4TeYhRqpUvx@cluster0.sfvw8nm.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(db_link)
.then(function(db){
    console.log("Review Database Connected");
})
.catch(function(err){
    console.log(err);
});

const reviewSchema = mongoose.Schema({
    review:{
        type: String,
        default: "Very Good",
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 10,
        default: 10,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'userModel',
        required: [true,"Log In to review Plans"]
    },
    plan: {
        type: mongoose.Schema.ObjectId,
        ref: 'planModel',
        required: [true, "Plan is required to review"]
    } 
});

// find, findById, findByOne
reviewSchema.pre(/^find/,function(next){
    this.populate({
        path: "user",
        select: "name profileImage"
    }).populate("plan");
    next();
});

const reviewModel = mongoose.model('reviewModel', reviewSchema);

// async function allReview(){
//     const reviews = await reviewModel.findById("62b2abb5f6204f8965b9c593");
//     console.log(reviews);};
// allReview();

// (async function createReview(){
//     let plan= {
//         review: "SuperFood30",
//         rating: 10,
//         price: 400,
//         plan: "62b1e7e05b0e2ee4258660e7",
//         user: "62b0742ba846c913582d75ea"
//         // discount: 30
//     };
//     let planData = await reviewModel.create(plan);
//     console.log(planData);
// })();

module.exports = reviewModel;