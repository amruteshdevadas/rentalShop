const mongoose = require('mongoose')
const schema = mongoose.Schema;
const cartSchema = new schema({
    _id :{
        type:String,
        required:true
    },  
    products:[
        {
            _id :{
                type:String,
                required:true
            },
            productName:{
                type:String,
                required:true
            },
            sellingPrice:{
                type:Number,
                required:true
            },
            quantity:{
                type:Number,
                required:true
            },
            image:{
                type:String,
                required:true
            }
        }
    ]
    
})

const Cart = mongoose.model('cart',cartSchema,'cart')
module.exports= Cart;