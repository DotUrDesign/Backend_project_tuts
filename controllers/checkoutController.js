const {SK} = require('../secrets.js');
const stripe = require('stripe')(SK);
const planModel = require('../models/planModel.js');

module.exports.checkoutSession = async function(req, res){
    try {
        console.log(req.get('host'));
        let planNames = req.body;
        let planData = [];

        for(let i=0;i<planNames.length;i++){
            // console.log(planNames[i]);
            let plan = await planModel.find({name : planNames[i]});
            planData.push(plan);
        }

        // for(let i=0;i<planData.length;i++){
        //     console.log(planData[i]);
        // }

        const session = await stripe.checkout.sessions.create({
            payment_method_types : ['card'],
            mode: 'payment',
            line_items : planData.map(plan => {
                console.log(plan[0].name);
                return {
                    price_data : {
                        currency : "usd",
                        product_data : {
                            name : plan[0].name
                        },
                        unit_amount : plan[0].price
                    },
                    quantity : 1
                }
            }),
            success_url: `${req.protocol}://${req.get('host')}/user/userProfile`,
            cancel_url: `${req.protocol}://${req.get('host')}/user/userProfile`
        })
        res.json({
            message : "all ok"
        })
    } catch (error) {
        res.status(404).json({
            message : error.message
        })
    }
}