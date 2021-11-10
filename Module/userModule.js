const User = require("../models/users");
const Cart = require("../models/cart");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
// const { db } = require("../models/users");

exports.postUser = async (req, res, next) => {
  console.log(req.body.newUser);
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.newUser.password, salt);
  req.body.newUser.password = hash;

  const users = new User({
    userName: req.body.newUser.userName,
    _id: req.body.newUser.email,
    password: req.body.newUser.password,
  });

  try {
    var response = await users.save();

    res.json({
      message:"Successful Registration..!!"
    })
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
};

exports.getUser = async (req, res, next) => {
  try {
    var response = await User.find();
    res.send(response);
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
};

exports.postLogin = async (req, res, next) => {
  let password = req.body.userData.password;
  // console.log(req.body.email)
  try {
    let user = await User.findOne(
      { _id: req.body.userData.email },
      { userName: 0 }
    );
    console.log(user);
    if (user) {
      let comparePassword = bcrypt.compareSync(password, user.password);

      if (comparePassword) {
        //generate Token..
        let token = jwt.sign({ _id: user._id }, "#Csgj/PD5%+VZIOD");
        res.json({
          token,
          message: "Password Matched..!!",
        });
      } else {
        res.status(500).json({
          message: "Password did not match..!!",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "User Not Found..!!",
    });
  }
};

exports.postcart = async (req, res) => {
  
  const cartItem = new Cart({
    _id: req.user_id,
    products: req.body.cartItem,
  });

  try {
    let productList = await Cart.find({ _id: req.user_id });

    if (productList.length >= 1) {
      try {
        let product = await Cart.updateOne(
          { _id: req.user_id },
          { $push: { products: cartItem.products } }
        );
        res.json({
          message: "Product added to cart..!!",
        })

      } catch (error) {
        console.log(error);
        res.stautus(500).json({
          message: "Something went wrong..!!",
        });
      }
    } else {
      //insert new document in the cart by the _id with new mail id
      var response = await cartItem.save();
      //and update the product list
      res.json({
        message: "Product added to cart..!!",
      })
    }
  } catch (error) {
    console.log(error);
    res.stautus(500).json({
      message: "Item Not Added",
      error: error,
    });
  }
};

exports.getUserCart = async (req, res, next) => {
  let id = req.user_id;
  try {
      
    let userCartList = await Cart.find({ _id: id }, { _id: 0, products: 1 });
    
      let total = await Cart.aggregate([
        { $match: { _id: req.user_id } },
        { $unwind: "$products" },
        {
          $group: {
            _id: null,
            TotalAmount: {
              $sum: {
                $multiply: ["$products.sellingPrice", "$products.quantity"],
              },
            },
          },
        },
      ]);

      let totalAmount = total[0].TotalAmount;

      res.json({
        message: "found the cart..!!",
        userCartList,
        totalAmount,
      });
    } 
  catch (error) {
    res.status(500).json({
      message: "Cart is Empty",
    });
  }
};

exports.addQtuantity = async (req, res, next) => {
  //  let userId = authenticate(req.header.authorization)

  

  let productId = req.body.productId;
  try {

      let product = await Cart.updateOne(
        { _id: req.user_id },
        { $inc: { "products.$[i].quantity": 1 } },
        { arrayFilters: [{ "i._id": productId }] }
      ); 
    let total = await Cart.aggregate([
      { $match: { _id: req.user_id } },
      { $unwind: "$products" },
      {
        $group: {
          _id: null,
          TotalAmount: {
            $sum: {
              $multiply: ["$products.sellingPrice", "$products.quantity"],
            },
          },
        },
      },
    ]);

    let totalAmount = total[0].TotalAmount
    res.json({
      message: "quantity updated",
      totalAmount,
    })
    ;
  } 
  
  catch (error) {
    // console.log(error);
    res.json({
      message: "Quantity not updated",
    });
  }
};

exports.deleteQuantity = async (req, res, next) => {
  
  let userId = req.user_id;
  let productId = req.body.productId;
  let quantity = req.body.quantity;

    if (quantity > 1) {
      try {
        let product = await Cart.updateOne(
          { _id: userId },
          { $inc: { "products.$[i].quantity": -1 } },
          { arrayFilters: [{ "i._id": productId }] }
        );
         res.json({
           message: "quantity updated",
         })
      }
      catch(error){
        console.log(error)
        res.json(error.message)
      }
    }
    
    else {
      try {
        let product = await Cart.updateOne(
          {
            _id: userId,
          },
          {
            $pull: {
              products: {
                _id: req.body.productId,
              },
            },
          }
        );
        res.json({
          message:"product deleted from cart..!!"
          
        })
      } 
      catch (error) {
        res.json({
          message: "something went wrong in delete product",
        });
      }
    }

    let total = await Cart.aggregate([
      { $match: { _id: req.user_id } },
      { $unwind: "$products" },
      {
        $group: {
          _id: null,
          TotalAmount: {
            $sum: {
              $multiply: ["$products.sellingPrice", "$products.quantity"],
            },
          },
        },
      },
    ]);

    let totalAmount = total[0].TotalAmount;
    console.log(totalAmount)
    res.json({
      message: "quantity updated",
      totalAmount
    })
   
};
