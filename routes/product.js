const express = require("express");
const Product = require("../models/ProductSchema");
const { createSlug, convertToSlug } = require("../service/commonService");
const router = express.Router();

router.get("/get-product", async (req, res) => {
  try {
    const banner = await Product.find({});

    res.send({ status: 0000, message: "success", data: banner }).status(200);
  } catch (error) {
    console.log("error : ", error);
    res.send({ status: 9999, message: "Something went wrong!" }).status(200);
  }
});
router.post("/get-product-by-slug", async (req, res) => {
  const body = req.body;
  try {
    const product = await Product.findOne({ slug: body.slug });

    res.send({ status: 0000, message: "success", data: product }).status(200);
  } catch (error) {
    console.log("error : ", error);
    res.send({ status: 9999, message: "Something went wrong!" }).status(200);
  }
});

router.post("/add-product", async (req, res) => {
  const request = new Product(req.body);

  try {
    if (request.productTitle) {
      //  let latestSlug = await createSlug(request.productTitle);
      //  console.log("slug after: ",latestSlug);
      //  request.slug = latestSlug;

      let slug = convertToSlug(request.productTitle);
      let isExist = await Product.exists({ slug: slug });
      if (isExist != null) {
        slug = slug + "-";
      }
      request.slug = slug;
    }
    const product = await request.save();

    res.send({ status: 0000, message: "success", data: product }).status(200);
  } catch (error) {
    console.log("error : ", error);
    res.send({ status: 9999, message: "Something went wrong!" }).status(200);
  }
});

module.exports = router;
