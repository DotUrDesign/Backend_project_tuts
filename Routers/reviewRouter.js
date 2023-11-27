const express = require('express');
const reviewRouter = express.Router();
const {protectRoute} = require('../controllers/authController_new.js');
const {getAllReview, top3Review, getPlanReview, createReview, updateReview, deleteReview} = require("../controllers/reviewController.js")

reviewRouter
.route('/all')
.get(getAllReview);

reviewRouter
.route('/top3')
.get(top3Review);

reviewRouter
.route('/:id')
.get(getPlanReview);

reviewRouter.use(protectRoute);
reviewRouter
.route('/createReview/:plan')
.post(createReview);

reviewRouter
.route('/changeReview/:id')
.patch(updateReview)
.delete(deleteReview);

module.exports = reviewRouter;