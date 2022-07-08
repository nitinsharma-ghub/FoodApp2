const express = require("express");
const { isAuthorised } = require("../Controller/loginController");
const { protectRoute } = require("../Controller/userController");
const planRouter = express.Router();
const planModel = require("../Model/planModel");
const {getAllPlans,getPlan,createPlan,deletePlan,updatePlan, top3Plans} = require('../Controller/planController');

// For getting all plans
planRouter.route('/allPlans').get(getAllPlans);

// For getting a plan
// planRouter.use(protectRoute);
planRouter.route('/plan/:id').get(protectRoute,getPlan);


//CRUD operations
// planRouter.use(isAuthorised(['admin','Restaurant Owner']));
planRouter.route('/crud')
.post(isAuthorised(['admin','Restaurant Owner']),createPlan);

planRouter.route('/crud/:id')
.delete(isAuthorised(['admin','Restaurant Owner']),deletePlan)
.patch(isAuthorised(['admin','Restaurant Owner']),updatePlan);

planRouter.route('/top3').get(top3Plans);
module.exports = planRouter;