const fs = require("fs/promises");
const express = require("express");
const { SUCCESS_CODE, ERROR_CODE } = require("../service/constants");
const router = express.Router();

router.get("/getAllCountries", async (req, res) => {
  try {
    const path = "json/location.json";

    fs.readFile(path)
      .then((fileData) => {
        const json = JSON.parse(fileData);
        const countries = Object.keys(json);
        
      //   let result = countries.map((m) => {
      //     return {
      //       country: m,
      //       shipment: 150,
      //       active: true,
      //     };
      //   });

      //   const jsonString = JSON.stringify(result);

      //   fs.writeFile('json/country.json', jsonString, err => {
      //     if (err) {
      //         console.log('Error writing file', err)
      //     } else {
      //         console.log('Successfully wrote file')
      //     }
      // })

        res
          .send({ status: SUCCESS_CODE, message: "success", data: countries })
          .status(200);
      })
      .catch((error) => {
        console.log("error : ", error);
        res
          .send({ status: ERROR_CODE, message: "Something went wrong!" })
          .status(200);
        // Do something if error
      });

    // res
    // .send({ status: SUCCESS_CODE, message: "success", data: "asfasfa" })
    // .status(200);
  } catch (error) {
    console.log("error : ", error);
    res
      .send({ status: ERROR_CODE, message: "Something went wrong!" })
      .status(200);
  }
});

module.exports = router;
