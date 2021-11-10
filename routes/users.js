var express = require('express');
var router = express.Router();
const userModule = require('../Module/userModule')
var jwt = require("jsonwebtoken");

function authenticate(req,res,next){
    var token = req.headers.authorization;
    // console.log(req);
    if(!token){
        return res.status(401).json({mesaage:"Please Login"})
    }
    else{
        try{
            var decoded = jwt.verify(token, '#Csgj/PD5%+VZIOD');
            req.user_id = decoded._id;
            // console.log(req.user_id);
            next();
        }
        catch(e){
            return res.status(400).json({message:"Please Login"})
        }
    }  
}



/* GET users listing. */
router.get('/getusers',userModule.getUser );
router.post('/register',userModule.postUser)
router.post('/login',userModule.postLogin)


router.post('/cart',authenticate,userModule.postcart)


router.get('/usercart',authenticate,userModule.getUserCart)
router.put('/addquantity',authenticate,userModule.addQtuantity)
router.delete('/deletequantity',authenticate,userModule.deleteQuantity)
module.exports = router;
