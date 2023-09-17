const mongoose = require("mongoose");

let db_link = 'mongodb+srv://admin:\0.sfvw8nm.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(db_link)
.then(function(db){
    console.log("Plan Database Connected");
})
.catch(function(err){
    console.log(err);
});

const planSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,
        maxlength: [20,'Plan Name cannot exceed 20 letters']
    },
    description: {
        type: String,
        required: true,
        maxlength: [100, 'Plan description cannot exceed 100 letters']
    },
    duration:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true,
    },
    ratingsAverage:{
        type: Number,
        default: 0,
    },
    discount: {
        type: Number,
        required: true,
        // validate: [function(){
        //     this.dicount< 100
        // },"discount should not be greater than price"]
    },
    number: {
        type: Number,
        default: 0,
        required: true
    }
});

const planModel = mongoose.model('planModel',planSchema);
// (async function createPlan(){
//     let plan= {
//         name: "SuperFood30",
//         duration: "30days",
//         price: "400",
//         discount: 30
//     };
//     let planData = await planModel.create(plan);
//     console.log(planData);
// })();

module.exports = planModel;
