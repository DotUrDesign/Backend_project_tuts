const mongoose = require('mongoose');
const {DB_LINK} = require('../secrets.js');

mongoose.connect(DB_LINK)
.then(function(db){
    console.log("plans db connected");
})
.catch(function(err){
    console.log(err);
})

const planSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        maxLength: 20
    },
    duration:{
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    ratingsAverage: {
        type: Number
    },
    discount: {
        type: Number,
        validate: function(){
            return this.discount<100;
        }
    },
    noOfReviews: {
        type : Number,
        default: 0
    }
});

const planModel = mongoose.model('planModel', planSchema);

/*
// Immediate Invoking function
(
    async function createPlan(){
        let planObj = {
            name: 'Plan3',
            duration: 10,
            price: 100,
            ratingsAverage: 3,
            discount: 40
        };

        // let data = await planModel.create(planObj);
        // console.log(data);

        const doc = new planModel(planObj);
        await doc.save();
        console.log(doc);
    }
)();
*/

module.exports = planModel;