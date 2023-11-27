const {DB_LINK} = require('../secrets.js');
const mongoose = require('mongoose');

mongoose.connect(DB_LINK)
.then(function(db){
    console.log("review db connected");
})
.catch(function(err){
    console.log(err);
});

const reviewSchema = mongoose.Schema({
    review: {
        type: String,
        required:[true, "review is required"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 10,
        required: [true, "rating is required"]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'userModel',
        required: [true, 'review must belong to a user']
    },
    plan: {
        type: mongoose.Schema.ObjectId,
        ref: 'planModel',
        required: [true, "Review given by an user should be on a particular plan"]
    }
});

// /^find/ -> regex i.e., regular expression. In short, whenever it encounters some terms like "findOne", "findById", "find" with the reviewModel, then it first executes the contents of this function(function inside reviewSchema.pre) and then continues with other statements like reviewModel.find() or something like that.
reviewSchema.pre(/^find/, function(next){
    this.populate({
        path: "user",
        select: "name profileImage"
    }).populate("plan");

    next();  // the next function needs to run after executing all the statements of this one.
});

const reviewModel = mongoose.model('reviewModel', reviewSchema);
module.exports = reviewModel;