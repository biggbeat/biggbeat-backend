const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productTitle: {
    type: String,
    required: true,
  },
  productDesc: {
    type: String,
    require: true,
  },
  price: {
    type: String,
    require: true,
  },
  inDiscount: {
    type: Boolean,
    require: false,
  },
  percentageOff: {
    type: String,
    require: false,
  },
  discountedPrice: {
    type: String,
    require: false,
  },
  hasStock: {
    type: Boolean,
    require: true,
  },
  isActive: {
    type: Boolean,
    require: true,
  },
  images: {
    type: Array,
    require : true
  },
  attribute: {
    type: Array,
    require : false
  },
});

const Product = mongoose.model("products", ProductSchema);

module.exports = Product;
