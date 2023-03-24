const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  categoryTitle: {
    type: String,
    required: true,
  },
  categoryImage: {
    type: String,
    required: true,
  },
  categorySlug: {
    type: String,
    required: false,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
    },
  ],
});

const Category = mongoose.model("category", CategorySchema);

module.exports = Category;
