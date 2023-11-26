const planModel = require('../models/planModel.js');

module.exports.getAllPlans = async function getAllPlans(req, res){
    try {
        let plans = await planModel.find();
        if(plans)
        {
            res.json({
                message: "All plans are here",
                data : plans
            })
        }
        else{
            res.json({
                message: "no plan to display"
            })
        }
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
}

module.exports.getPlan = async function getPlan(req, res){
    try {
        let id = req.params.id;
        let plan = await planModel.findById(id);
        if(plan)
        {
            res.json({
                message: "Get Plan success",
                plan : plan
            })
        }
        else{
            res.json({
                message: "Plan is not currently available in the database."
            })
        }
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
}

module.exports.createPlan = async function createPlan(req, res){
    try {
        let plan = req.body;
        if(plan)
        {
            let data = await planModel.create(plan);
            if(data)
            {
                res.json({
                    message: "Created plan successfully",
                    plan : data
                })
            }
            else{
                res.json({
                    message: "Fill the plan details ccorectly"
                })
            }
        }
        else{
            res.json({
                message: "Provide the plan to be inserted into the db"
            })
        }
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
}

module.exports.updatePlan = async function updatePlan(req, res){
    try {
        let id = req.params.id;
        let plan = await planModel.findById(id);
        let dataToBeUpdated = req.body;
        if(plan)
        {
            let keys = [];
            for(let key in dataToBeUpdated)
                keys.push(key);
            for(let i=0;i<keys.length;i++)
                plan[keys[i]] = dataToBeUpdated[keys[i]];
            let data = await plan.save();
            res.json({
                message: "plan has been updated",
                plan : data
            })
        }
        else{
            res.json({
                message: "No such plan exists"
            })
        }
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
}

module.exports.deletePlan = async function deletePlan(req, res){
    try {
        let id = req.params.id;
        let deletedPlan = await planModel.findOneAndDelete(id);
        res.json({
            message: "Plan has been deleted",
            deletedPlan : deletedPlan
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
}

module.exports.top3Plans = async function top3Plans(req, res){
    try {
        let top_3_Plans = await planModel.find().sort({ratingAverage: -1}).limit(3);
        res.json({
            message: "Top 3 Plans for you",
            top_3_Plans: top_3_Plans
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

