const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: {
    type: String,
    require: false,
  },
  guestUser: {
    type: Boolean,
    require: true,
  },
  couponUsed: {
    type: Boolean,
    require: true,
  },
  couponCode: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  postalCode: {
    type: String,
    require: true,
  },
  contactNo: {
    type: String,
    require: true,
  },
  products: {
    type: Array,
    require: false,
  },
  isExpired: {
    type: Boolean,
    require: false,
  },
});

const Order = mongoose.model("order", OrderSchema);

module.exports = Order;


// {
//   "userId": "kffsd464jc4f84hf11349",
//   "guestUser": false,
//   "couponUsed": false,
//   "couponCode": "",
//   "email": "khizeroff61@gmail",
//   "address":"abc address",
//   "postalCode":"75050",
//   "contactNo":"03368520350",
//   "products": [
//       {
//           "productSlug": "product1",
//           "quantity": 1,
//           "attribute": [
//               {
//                   "attributeKey": "Color",
//                   "attributeValue": "Red"
//               },
//               {
//                   "attributeKey": "Size",
//                   "attributeValue": "S"
//               }
//           ]
//       },
//          {
//           "productSlug": "product2",
//           "quantity": 2,
//           "attribute": [
//               {
//                   "attributeKey": "Color",
//                   "attributeValue": "Black"
//               },
//               {
//                   "attributeKey": "Size",
//                   "attributeValue": "M"
//               }
//           ]
//       }
//   ]
// }