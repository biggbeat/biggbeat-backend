const mongoose = require("mongoose");
const ParentAttribute = require("./ParentAttributeSchema");

const ChildAttributeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  parentName: {
    type: String,
    require: true,
  }
  // ,
  // parentAttribute: {
  //   type: Object,
  //   ref: "parentAttribute",
  // },
});

const ChildAttribute = mongoose.model("childAttribute", ChildAttributeSchema);

module.exports = ChildAttribute;
