const express = require("express");
const {getAllReviews,top3reviews,createReview,getReviews,updateReview,deleteReview} = require("../Controller/reviewController");
const { protectRoute } = require("../Controller/userController");
const reviewRouter = express.Router();

// reviewRouter.use(protectRoute);

// reviewSchema.pre(/^find/,function(next){
//     this.populate({
//         path: "user",
//         select: "name profileImg"
//     }).populate("plan");
//     next;
// });

reviewRouter.route('/all').get(getAllReviews);

reviewRouter.route('/top3').get(top3reviews);

reviewRouter.route('/:id').get(getReviews);

reviewRouter.route('/crud/:plan').post(createReview)
.patch(updateReview)
.delete(deleteReview);

// reviewRouter.route('/crud/:id')


module.exports = reviewRouter;