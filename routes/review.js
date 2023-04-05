const express = require("express");
const Review = require("../models/ReviewScehma");
const router = express.Router();

router.post("/get-rating-by-product", async (req, res) => {
  //   // let path = "../backend/csv/user.csv";
  let body = req.body;

  try {
    const reviews = await Review.find({ productSlug : body.slug });

    res.send({ status: 0000, message: "success", data: reviews }).status(200);
  } catch (error) {
    console.log("error : ", error);
    res.send({ status: 9999, message: "Something went wrong!" }).status(200);
  }
});

router.post("/add-rating", async (req, res) => {
  const request = new Review(req.body);
  //   // let path = "../backend/csv/user.csv";

  try {
    const review = await request.save();

    res.send({ status: 0000, message: "success", data: review }).status(200);
  } catch (error) {
    console.log("error : ", error);
    res.send({ status: 9999, message: "Something went wrong!" }).status(200);
  }
});


module.exports = router;