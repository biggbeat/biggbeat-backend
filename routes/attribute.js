const express = require("express");
const ParentAttribute = require("../models/ParentAttributeSchema");
const ChildAttribute = require("../models/ChildAttributeSchema");
const router = express.Router();


// ===================== Parent Attribute =====================================

router.get("/get-parent-attribute", async (req, res) => {
  //   // let path = "../backend/csv/user.csv";
  
  try {
    const attributes = await ParentAttribute.find({});
    res
      .send({ status: 0000, message: "success", data: attributes })
      .status(200);
    } catch (error) {
        console.log("error : ", error);
        res.send({ status: 9999, message: "Something went wrong!" }).status(200);
  }
});

router.post("/add-parent-attribute", async (req, res) => {
    const request = new ParentAttribute(req.body);
    try {
        const attribute = await request.save();
        res.send({ status: 0000, message: "success", data: attribute }).status(200);
    } catch (error) {
        console.log("error : ", error);
        res.send({ status: 9999, message: "Something went wrong!" }).status(200);
    }
});

router.post("/get-child-attribute-by-parent", async (req, res) => {
  // const request = new ChildAttribute(req.body);
  const body = req.body;
  try {
      // const attribute = await request.save();
      const attribute = await  ChildAttribute.find({parentName : body.parentName })
      res.send({ status: 0000, message: "success", data: attribute }).status(200);
  } catch (error) {
      console.log("error : ", error);
      res.send({ status: 9999, message: "Something went wrong!" }).status(200);
  }
});


// ===================== Child Attribute =====================================


router.get("/get-child-attribute", async (req, res) => {
    //   // let path = "../backend/csv/user.csv";
    
    try {
      const attributes = await ChildAttribute.find({});
      res
        .send({ status: 0000, message: "success", data: attributes })
        .status(200);
      } catch (error) {
          console.log("error : ", error);
          res.send({ status: 9999, message: "Something went wrong!" }).status(200);
    }
  });
  
  router.post("/add-child-attribute", async (req, res) => {
      const request = new ChildAttribute(req.body);
      try {
          const attribute = await request.save();
          res.send({ status: 0000, message: "success", data: attribute }).status(200);
      } catch (error) {
          console.log("error : ", error);
          res.send({ status: 9999, message: "Something went wrong!" }).status(200);
      }
  });
  








module.exports = router;
