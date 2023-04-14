const express = require("express");
const Category = require("../models/CategorySchema");
const Section = require("../models/SectionSchema");
const { convertToSlug } = require("../service/commonService");
const router = express.Router();

router.get("/get-category", async (req, res) => {
  try {
    // const section = await Category.find({}).populate('products');
    const section = await Category.find({});

    res.send({ status: "0000", message: "success", data: section }).status(200);
  } catch (error) {
    console.log("error : ", error);
    res.send({ status: 9999, message: "Something went wrong!" }).status(200);
  }
});

router.post("/get-product-by-category", async (req, res) => {
  let request = req.body;
  try {
    const section = await Category.findById({
      _id: request.categoryId,
    }).populate("products");

    res.send({ status: "0000", message: "success", data: section }).status(200);
  } catch (error) {
    console.log("error : ", error);
    res.send({ status: 9999, message: "Something went wrong!" }).status(200);
  }
});

router.post("/get-by-slug", async (req, res) => {
  let request = req.body;
  try {
    const section = await Category.find({
      categorySlug: request.categorySlug,
    }).populate("products");

    res.send({ status: "0000", message: "success", data: section }).status(200);
  } catch (error) {
    console.log("error : ", error);
    res.send({ status: 9999, message: "Something went wrong!" }).status(200);
  }
});

router.get("/get-category-products", async (req, res) => {
  try {
    const section = await Category.find({}).populate("products");

    res.send({ status: "0000", message: "success", data: section }).status(200);
  } catch (error) {
    console.log("error : ", error);
    res.send({ status: 9999, message: "Something went wrong!" }).status(200);
  }
});

router.post("/add-category", async (req, res) => {
  const request = new Category(req.body);

  try {
    if (request.categoryTitle) {
      let slug = convertToSlug(request.categoryTitle);
      let isExist = await Category.exists({ categorySlug: slug });
      if (isExist != null) {
        slug = slug + "-";
      }
      request.categorySlug = slug;
    }
    const category = await request.save();
    res.send({ status: "0000", message: "success", data: category }).status(200);
  } catch (error) {
    console.log("error : ", error);
    res.send({ status: 9999, message: error.message }).status(200);
  }
});
router.post("/add-product-to-category", async (req, res) => {
  // const request = new Category(req.body);
  const request = req.body;

  try {
    if (request.categorySlug && request.productList) {
      const category = await Category.findOne({
        categorySlug: request.categorySlug,
      });
      console.log("request : ", request, category);
      if (category) {
        let products = [];
        products = category.products;
        request.productList.map((m) => {
          products.push(m);
        });
        category.products = products;
        category.save();
        res.send({ status: "0000", message: "success" }).status(200);
      } else {
        res.send({ status: 9999, message: "Invalid call!" }).status(200);
      }
    } else {
      res.send({ status: 9999, message: "Invalid call!" }).status(200);
    }
  } catch (error) {
    console.log("error : ", error);
    res.send({ status: 9999, message: "Something went wrong!" }).status(200);
  }
});

module.exports = router;
