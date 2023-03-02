const express = require("express");
const Banner = require("../models/BannerSchema");
const router = express.Router();

router.get("/get-banner", async (req, res) => {
  //   // let path = "../backend/csv/user.csv";

  try {
    const banner = await Banner.find({});

    res.send({ status: 0000, message: "success", data: banner }).status(200);
  } catch (error) {
    console.log("error : ", error);
    res.send({ status: 9999, message: "Something went wrong!" }).status(200);
  }
});

router.post("/add-banner", async (req, res) => {
  const request = new Banner(req.body);
  //   // let path = "../backend/csv/user.csv";

  try {
    const banner = await request.save();

    res.send({ status: 0000, message: "success", data: banner }).status(200);
  } catch (error) {
    console.log("error : ", error);
    res.send({ status: 9999, message: "Something went wrong!" }).status(200);
  }
});


module.exports = router;