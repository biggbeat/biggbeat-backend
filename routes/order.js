const express = require("express");
const { SUCCESS_CODE, ERROR_CODE } = require("../service/constants");
const Order = require("../models/OrderSchema");
const router = express.Router();

router.post("/add-order", async (req, res) => {
  const body = new Order(req.body);

  try {
    if (body.email) {
      const order = await body.save();
      res
        .send({ status: SUCCESS_CODE, message: "success", data: order })
        .status(200);
    } else {
      res.send({ status: ERROR_CODE, message: "Invalid call!" }).status(200);
    }
  } catch (error) {
    console.log("error : ", error);
    res
      .send({ status: ERROR_CODE, message: "Something went wrong!" })
      .status(200);
  }
});

router.get("/getAllOrder", async (req, res) => {
  try {
    const orders = await Order.find();
    res
      .send({ status: SUCCESS_CODE, message: "success", data: orders })
      .status(200);
  } catch (error) {
    console.log("error : ", error);
    res
      .send({ status: ERROR_CODE, message: "Something went wrong!" })
      .status(200);
  }
});
router.post("/getOrderByUser", async (req, res) => {
  const body = new Order(req.body);
  try {
    if (body.email) {
      const orders = await Order.find({ email: body.email });
      res
        .send({ status: SUCCESS_CODE, message: "success", data: orders })
        .status(200);
    } else {
      res.send({ status: ERROR_CODE, message: "Invalid call!" }).status(200);
    }
  } catch (error) {
    console.log("error : ", error);
    res
      .send({ status: ERROR_CODE, message: "Something went wrong!" })
      .status(200);
  }
});

module.exports = router;
