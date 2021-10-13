const Product = require("../models/product");

exports.postProduct = async (req, res, next) => {
  const products = new Product({
    _id:req.body._id,
    productName: req.body.productName,
    productDescription: req.body.productDescription,
    category:req.body.category,
    sellingPrice:req.body.sellingPrice,
    image:req.body.image
  });

  try {
    var response = await products.save();
    res.send(response);
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
};

exports.getProduct = async (req,res,next)=>{

    try {
        var response = await Product.find();
        res.send(response);
      } catch (error) {
        res.status(400).send({
          error: error.message,
        });
      }
}

exports.getCheckboxProduct = async (req,res,next)=>{

if(req.params.name != "null")
{
  let search = new RegExp(req.params.name, "i");
  console.log(search);
  try {
   
      let productList = await Product
      .find({ category: search })
    res.json({
      productList,
      // message:search
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "something went wrong",
    });
  }
}

 else{

  try {

    let productList = await Product.find()

  res.json({
    productList,
    // message:search
  });
} catch (error) {
  console.log(error);
  res.json({
    message: "something went wrong",
  });
}
 }

}

exports.getInputProduct = async (req,res,next)=>{

  if(req.params.name != "null")
  {
    let search = new RegExp(req.params.name, "i");
    console.log(search);
    try {
     
        let productList = await Product
        .find({ productName: search })
      res.json({
        productList,
        // message:search
      });
    } catch (error) {
      console.log(error);
      res.json({
        message: "something went wrong",
      });
    }
  }
  
   else{
  
    try {
  
      let productList = await Product.find()
  
    res.json({
      productList,
      // message:search
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "something went wrong",
    });
  }
   }
  
  }