var express = require('express');
var router = express.Router();
const userModule = require('../Module/userModule')
var jwt = require("jsonwebtoken");

function authenticate(req,res,next){
    var token = req.headers.authorization;
    // console.log(req);
    if(!token){
        return res.status(401).send("Access Denied");
    }
    try{
        var decoded = jwt.verify(token, '#Csgj/PD5%+VZIOD');
        req.user = decoded;
        next();
    }catch(e){
        return res.status(400).send("Invalid Token");
    }
}
// router.use("/cart",authenticate) {
//   })

  // router.use("/usercart",function authenticate(req, res, next) {
  //   let token = req.headers.Authorization;
   
  //   try {
  //     if(req.headers.Authorization){
  //       var tokenCorrect = jwt.verify(token,"#Csgj/PD5%+VZIOD",function(err, decoded) {
  //         if (err) {
  //           res.json({
  //             message:"Internal Server Error..!!"
  //           })
  //         }
       
  //          req.user_id = decoded.id
  
        
  //       next()
  //       });
  
  //     }
  //     else
  //     {
  //       res.status(500).json({
  //         message:"No Token Present..!!"
  //       })
  //     }
  //   } catch (error) {
      
  //     res.status(500).json({
  //       message:"Un Authorized..!!"
  //     })
  //   }
  // })


  // router.use("/addquantity",function authenticate(req, res, next) {
  //   let token = req.headers.Authorization;
  
  //   try {
  //     if(req.headers.Authorization){
  //       var tokenCorrect = jwt.verify(token,"#Csgj/PD5%+VZIOD",function(err, decoded) {
  //         if (err) {
  //           res.json({
  //             message:"Internal Server Error..!!"
  //           })
  //         }
  //         console.log(decoded)
  //          req.user_id = decoded.id
  //       next()
  //       });
  
  //     }
  //     else
  //     {
  //       res.json({
  //         message:"No Token Present..!!"
  //       })
  //     }
  //   } catch (error) {
        
  //     res.json({
  //       message:"Un Authorized..!!"
  //     })
  //   }
  // })

  // router.use("/deletequantity",function authenticate(req, res, next) {
  //   let token = req.headers.Authorization;
  //   try {
  //     if(req.headers.Authorization){
  //       var tokenCorrect = jwt.verify(token,"#Csgj/PD5%+VZIOD",function(err, decoded) {
  //         if (err) {
  //           res.json({
  //             message:"Internal Server Error..!!"
  //           })
  //         }
  //          req.user_id = decoded.id
  
  //       next()
  //       });
  
  //     }
  //     else
  //     {
  //       res.json({
  //         message:"No Token Present..!!"
  //       })
  //     }
  //   } catch (error) {
  //     res.json({
  //       message:"Un Authorized..!!"
  //     })
  //   }
  // })

/* GET users listing. */
router.get('/getusers',userModule.getUser );
router.post('/register',userModule.postUser)
router.post('/login',userModule.postLogin)


router.post('/cart',authenticate,userModule.postcart)


router.get('/usercart',authenticate,userModule.getUserCart)
router.put('/addquantity',authenticate,userModule.addQtuantity)
router.delete('/deletequantity',authenticate,userModule.deleteQuantity)
module.exports = router;
