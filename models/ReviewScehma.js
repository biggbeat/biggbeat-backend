const moment = require("moment");
const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  productSlug: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: moment(new Date()).format("DD-MM-YYYY"),
    required: true,
  },
  review: {
    type: String,
    required: false,
  },
  reviewCount: {
    type: Number,
    required: false,
  },
});

const Category = mongoose.model("reviews", ReviewSchema);

module.exports = Category;
