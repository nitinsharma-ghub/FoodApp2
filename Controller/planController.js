const planModel = require("../Model/planModel");

module.exports.createPlan = async function createPlan(req,res){
    try{
        let planObj = req.body;
        if(planObj){
            let planCreated = await planModel.create(planObj);
            res.json({
                message: "Plan entered successfully",
                plan: planCreated
            });
        }
        else{
            res.json({
                message: "Enter plan details"
            });
        }
    }
    catch(err){
        res.json({
            message: err.message
        });
    }
}

module.exports.deletePlan = async function deletePlan(req,res){
    try{
        let planId = req.params.id;
        if(planId){
            let planFind = await planModel.findByIdAndDelete(planId)
            if(planFind){
                res.json({
                    message: "Plan deleted successfully"
                });
            }
            else{
                res.json({
                    message: "Plan not found"
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

module.exports.updatePlan = async function updatePlan(req,res){
    try{
        let planId = req.params.id;
        let planObj = await planModel.findById(planId);
        let dataToBeUpdated = req.body
        if(planObj){
            let keys = [];
            for(key in dataToBeUpdated){
                keys.push(key);
            }
            for(let i = 0;i<keys.length;i++){
                planObj[keys[i]] = dataToBeUpdated[keys[i]];
            }
            const updatedData = await planObj.save();
            res.json({
                message: "Data Updated Successfully",
                data: updatedData
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

module.exports.getPlan = async function getPlan(req,res){
    try{
        let planId = req.params.id;
        let planObj = await planModel.findById(planId);
        if(planObj){
            res.json({
                message: "Plan retrieved successfully",
                plan: planObj
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

module.exports.getAllPlans = async function getAllPlans(req,res){
    try{
        let plans = await planModel.find();
        if(plans){
            res.json({
                message: "All plans retrieved successfully",
                AllPlans: plans,
                NumberOfPlans: plans.length
            });
        }
        else{
            res.json({
                message: "No plans available"
            });
        }
    }
    catch(err){
        res.json({
            message: err.message
        });
    }
}

module.exports.top3Plans = async function top3Plans(req,res){
    try{
        let top3Plan = await planModel.find().sort({ratingsAverage:-1}).limit(3);
        res.json({
            message: "Top 3 plans",
            plan: top3Plan
        });
    }
    catch(err){
        res.json({
            message: err.message
        });
    }
}