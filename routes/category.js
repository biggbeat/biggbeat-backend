const express = require("express");
const Category = require("../models/CategorySchema");
const Section = require("../models/SectionSchema");
const router = express.Router();

router.get("/get-category", async (req, res) => {
  try {
    // const section = await Category.find({}).populate('products');
    const section = await Category.find({});

    res.send({ status: 0000, message: "success", data: section }).status(200);
  } catch (error) {
    console.log("error : ", error);
    res.send({ status: 9999, message: "Something went wrong!" }).status(200);
  }
});

router.post("/get-product-by-category", async (req, res) => {
  let request = req.body;
  try {
    const section = await Category.findById({ _id: request.categoryId }).populate(
      "products"
    );

    res.send({ status: 0000, message: "success", data: section }).status(200);
  } catch (error) {
    console.log("error : ", error);
    res.send({ status: 9999, message: "Something went wrong!" }).status(200);
  }
});
router.get("/get-category-products", async (req, res) => {
  try {
    const section = await Category.find({}).populate("products");

    res.send({ status: 0000, message: "success", data: section }).status(200);
  } catch (error) {
    console.log("error : ", error);
    res.send({ status: 9999, message: "Something went wrong!" }).status(200);
  }
});

router.post("/add-category", async (req, res) => {
  const request = new Category(req.body);

  try {
    const section = await request.save();

    res.send({ status: 0000, message: "success", data: section }).status(200);
  } catch (error) {
    console.log("error : ", error);
    res.send({ status: 9999, message: "Something went wrong!" }).status(200);
  }
});

module.exports = router;
