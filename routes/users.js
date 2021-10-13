var express = require('express');
var router = express.Router();
const userModule = require('../Module/userModule')
var jwt = require("jsonwebtoken");
router.use("/cart",function authenticate(req, res, next) {
    let token = req.headers.authorization;

    try {
      if(req.headers.authorization){
        var tokenCorrect = jwt.verify(token,"#Csgj/PD5%+VZIOD",function(err, decoded) {
          if (err) {
            res.json({
              message:"Internal Server Error..!!"
            })
          }
         
           req.user_id = decoded.id
  
         
        next()
        });
  
      }
      else
      {
        res.json({
          message:"No Token Present..!!"
        })
      }
    } catch (error) {
        console.log(error)
      res.json({
        message:"Un Authorized..!!"
      })
    }
  })

  router.use("/usercart",function authenticate(req, res, next) {
    let token = req.headers.authorization;
   
    try {
      if(req.headers.authorization){
        var tokenCorrect = jwt.verify(token,"#Csgj/PD5%+VZIOD",function(err, decoded) {
          if (err) {
            res.json({
              message:"Internal Server Error..!!"
            })
          }
       
           req.user_id = decoded.id
  
        
        next()
        });
  
      }
      else
      {
        res.json({
          message:"No Token Present..!!"
        })
      }
    } catch (error) {
      
      res.json({
        message:"Un Authorized..!!"
      })
    }
  })


  router.use("/addquantity",function authenticate(req, res, next) {
    let token = req.headers.authorization;
  
    try {
      if(req.headers.authorization){
        var tokenCorrect = jwt.verify(token,"#Csgj/PD5%+VZIOD",function(err, decoded) {
          if (err) {
            res.json({
              message:"Internal Server Error..!!"
            })
          }
          console.log(decoded)
           req.user_id = decoded.id
        next()
        });
  
      }
      else
      {
        res.json({
          message:"No Token Present..!!"
        })
      }
    } catch (error) {
        
      res.json({
        message:"Un Authorized..!!"
      })
    }
  })

  router.use("/deletequantity",function authenticate(req, res, next) {
    let token = req.headers.authorization;
    try {
      if(req.headers.authorization){
        var tokenCorrect = jwt.verify(token,"#Csgj/PD5%+VZIOD",function(err, decoded) {
          if (err) {
            res.json({
              message:"Internal Server Error..!!"
            })
          }
           req.user_id = decoded.id
  
        next()
        });
  
      }
      else
      {
        res.json({
          message:"No Token Present..!!"
        })
      }
    } catch (error) {
      res.json({
        message:"Un Authorized..!!"
      })
    }
  })

/* GET users listing. */
router.get('/getusers',userModule.getUser );
router.post('/register',userModule.postUser)
router.post('/login',userModule.postLogin)


router.post('/cart',userModule.postcart)


router.get('/usercart',userModule.getUserCart)
router.put('/addquantity',userModule.addQtuantity)
router.delete('/deletequantity',userModule.deleteQuantity)
module.exports = router;
