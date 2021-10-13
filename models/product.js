const mongoose = require("mongoose");
const schema = mongoose.Schema;
const productSchema = new schema({
  _id: { type: String, required: true },
  productName: { type: String, required: true },
  productDescription: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  sellingPrice: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("Products", productSchema, "products");
module.exports = Product;
