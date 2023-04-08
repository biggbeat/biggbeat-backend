const express = require("express");
const Review = require("../models/ReviewScehma");
const Product = require("../models/ProductSchema");
const router = express.Router();

router.post("/get-rating-by-product", async (req, res) => {
  //   // let path = "../backend/csv/user.csv";
  let body = req.body;

  try {
    if (body.productSlug) {
      const reviews = await Review.find({ productSlug: body.productSlug });

      res.send({ status: 0000, message: "success", data: reviews }).status(200);
    } else {
      res.send({ status: 9999, message: "Invalid call!" }).status(200);
    }
  } catch (error) {
    console.log("error : ", error);
    res.send({ status: 9999, message: "Something went wrong!" }).status(200);
  }
});

router.post("/add-rating", async (req, res) => {
  const request = new Review(req.body);
  //   // let path = "../backend/csv/user.csv";

  try {
    if (request.productSlug) {
      const isValidProduct = await Product.exists({
        slug: request.productSlug,
      });
      if (isValidProduct) {

        const review = await request.save();
        res
          .send({ status: 0000, message: "success", data: review })
          .status(200);
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
