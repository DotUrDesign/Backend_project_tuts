// const jwt = require('jsonwebtoken');
// const JWT_KEY = 'duchdaoifuc2382e273jhsbdcku';

// function protectRoute(req, res, next){
//     // req.cookies -> header.payload.signature
//     // console.log(req.cookies);   
//     if(req?.cookies?.isLoggedIn){
//         let isVerified = jwt.verify(req.cookies.isLoggedIn,JWT_KEY);
//         if(isVerified){
//             next();
//         }
//     }
//     else{
//         return res.json({
//             message: "operation not allowed"
//         })
//     }
// }

// module.exports = protectRoute;