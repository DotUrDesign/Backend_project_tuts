const reviewModel = require('../models/reviewModel.js');
const planModel = require('../models/planModel.js');

module.exports.getAllReview = async function getAllReview(req, res){
    try {
        let reviews = await reviewModel.find();
        if(reviews)
        {
            res.json({
                message: "All reviews are here",
                data : reviews
            })
        }
        else{
            res.json({
                message: "no revieew to display"
            })
        }
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
}

module.exports.getPlanReview = async function getPlanReview(req, res){
    try {
        let id = req.params.id;
        let review = await reviewModel.findById(id);
        if(review)
        {
            res.json({
                message: "Get review success",
                review : review
            })
        }
        else{
            res.json({
                message: "Review is not currently available in the database."
            })
        }
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
}

module.exports.createReview = async function createReview(req, res){
    try {
        let planId = req.params.plan;
        let plan = await planModel.findById(planId);
        if(plan)
        {
            let numOfReviews = plan.noOfReviews;
            let ratingAvg = plan.ratingsAverage;
            let review = req.body;
            if(review)
            {
                let _ratings = review.rating;
                let result = (ratingAvg + _ratings)/(numOfReviews + 1);
                plan.ratingsAverage = result;
                plan.noOfReviews += 1;
                await plan.save();
                let data = await reviewModel.create(review);
                console.log("hello")
                res.json({
                    message: "Your review is created",
                    review : data
                })
            }
            else{
                res.json({
                    message: "Fill all the credentials of the review."
                })
            }
        }
        else{
            res.json({
                message: "The plan in which you are giving the review doesn't exists"
            })
        }
    } catch (error) {
        res.json({
            message: error.message
        })
    }
}

module.exports.updateReview = async function updateReview(req, res){
    try {
        let id = req.params.id;
        let review = await reviewModel.findById(id);
        let dataToBeUpdated = req.body;
        if(review)
        {
            let keys = [];
            for(let key in dataToBeUpdated)
                keys.push(key);
            for(let i=0;i<keys.length;i++)
                review[keys[i]] = dataToBeUpdated[keys[i]];
            let data = await review.save();
            res.json({
                message: "plan has been updated",
                review : data
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

module.exports.deleteReview = async function deleteReview(req, res){
    try {
        let id = req.params.id;
        let deletedReview = await reviewModel.findOneAndDelete(id);
        res.json({
            message: "Review has been deleted",
            deletedReview : deletedReview
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
}

module.exports.top3Review = async function top3Review(req, res){
    try {
        let top_3_Reviews = await reviewModel.find().sort({reting: -1}).limit(3);
        res.json({
            message: "Top 3 Reviews for you",
            top_3_Reviews: top_3_Reviews
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

