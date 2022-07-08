const reviewModel = require("../Model/reviewModel");
const planModel = require("../Model/planModel");

module.exports.getAllReviews = async function getAllReviews(req,res){
    try{
        let reviews = await reviewModel.find();
        if(reviews){
            res.json({
                message: "All reviews retrieved",
                review: reviews,
                NumberOfReviews: reviews.length
            });
        }
        else{
            res.json({
                message: "Review not found"
            });
        }
    }
    catch(err){
        res.json({
            message: err.message
        });
    }
}

module.exports.top3reviews= async function top3reviews(req,res){
    try{
        let top3review = await reviewModel.find().sort({
            ratings: -1
        }).limit(3);
        if(top3review){
            res.json({
                message: "Top3 reviews retrieved",
                review: top3review  
            });
        }
        else{
            res.json({
                message: "Review not found"
            });
        }
    }
    catch(err){
        res.json({
            error: err.message
        });
    }
}

module.exports.createReview = async function createReview(req,res){
    try{
        let id = req.params.plan;
        let plan = await planModel.findById(id);
        if(plan){
            let review = req.body;
            let reviewData = await reviewModel.create(review);
            plan.number++;
            plan.ratingsAverage = (plan.ratingsAverage*(plan.number-1)+reviewData.rating)/plan.number;
            await plan.save();
            res.json({
                message: "Review created",
                data: review
            });
        }
        else{
            res.json({
                message: "Plan not found"
            });
        }
    }
    catch(err){
        res.json({
            message: err.message
        });
    }
}

module.exports.getReviews = async function getReviews(req,res){
    try{
        let id = req.params.id;
        const reviews = await reviewModel.find({plan: id});
        if(reviews){
            return res.json({
                message: "reviews retrieved",
                rev: reviews,
                NumberOfReviews: reviews.length
            });
        }
        else{
            return res.json({
                message: "reviews not found"
            });
        }
    }
    catch(err){
        res.json({
            message: err.message
        });
    }
}

module.exports.updateReview= async function updateReview(req,res){
    try{
        let planId = req.params.id;
        let plan = await planModel.findById(planId);
        if(plan){
            let id = req.body.id;
            let review = await reviewModel.findById(id);
            let dataToBeUpdated = req.body;
            if(review){
                let keys = [];
                for(key in dataToBeUpdated){
                    if(key == 'id'){
                        continue;
                    }
                    keys.push(key);
                }
                for(let i = 0;i<keys.length;i++){
                    review[keys[i]] = dataToBeUpdated[keys[i]];
                }
                review.save();
                return res.json({
                    message: "Review updated successfully",
                    data: review
                });
            }
            else{
                res.json({
                    message: "Review not found"
                });
            }
        }
        else{
            res.json({
                message: "Plan not found"
            });
        }
    }
    catch(err){
        res.json({
            message: err.message
        });
    }
}

module.exports.deleteReview = async function delteReview(req,res){
    try{
        let planid = req.params.id;
        let plan = await planModel.findById(planid);
        if(plan){
            let id = req.body.id;
            let review = await reviewModel.findByIdAndDelete(id);
            if(review){
                return res.json({
                    message: "Review deleted succesfully",
                    rev: review
                });
            }
            else{
                return res.json({
                    message: "review not found"
                });
            }
        }
        else{
            res.json({
                message: "Plan not found"
            });
        }
    }
    catch(err){
        res.json({
            message: err.message
        });
    }
}