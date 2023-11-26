const express = require('express');
const planRouter = express.Router();
const { isAuthorized, protectRoute } = require('../controllers/authController_new.js');
const {getAllPlans, getPlan, createPlan, updatePlan, deletePlan, top3Plans} = require('../controllers/planController.js');


planRouter
.route('/allPlans')
.get(getAllPlans);

planRouter.use(protectRoute)
planRouter
.route('/plan/:id')
.get(getPlan);

planRouter.use(isAuthorized(['admin','restaurantOwner']))
planRouter
.route('/createPlan')
.post(createPlan);

planRouter
.route('/changePlan/:id')
.patch(updatePlan)
.delete(deletePlan);

planRouter
.route('/top3Plans')
.get(top3Plans);

module.exports = planRouter;


