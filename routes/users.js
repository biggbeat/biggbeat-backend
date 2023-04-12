const express = require("express");
const router = express.Router();
const User = require("../models/UserSchema");
const OTP = require("../models/OtpSchema");
const { validateEmail, generateOtp } = require("../service/commonService");
const { sendEmail } = require("../service/emailService");
const { USER_REGISTER_OTP_SUBJECT, SENT_OTP } = require("../service/constants");
const fs = require("fs");
const path = require("path");



router.post("/signup", async (req, res) => {
  const request = new User(req.body);
  var jsonPath = path.join(__dirname, "..", "template", "otp-template.html");

  try {
    const dbUser = await User.exists({ email: request.email });
    var file = "";
    if (dbUser != null) {
      res.send({ status: 9999, message: "User already exist!" }).status(200);
    } else {
      if (!validateEmail(request.email)) {
        res
          .send({ status: 9999, message: "Please enter valid email" })
          .status(200);
      } else if (!!!request.password) {
        res
          .send({ status: 9999, message: "Please enter valid password" })
          .status(200);
      } else if (!!!request.address) {
        res
          .send({ status: 9999, message: "Please enter valid address" })
          .status(200);
      } else if (!!!request.name) {
        res
          .send({ status: 9999, message: "Please enter valid name" })
          .status(200);
      } else {
        const otp = new OTP();
        otp.email = request.email;
        otp.otp = generateOtp(4);
        otp.isExpired = false;
        await otp.save();

        request.verified = false;

        fs.readFile(jsonPath, "utf8", function (err, data) {
          if (err) {
            return console.log(err);
          }
          file = data.replace("{{VERIFICATION_CODE}}", otp.otp);
          file = file.replace("{{name}}", request.name);

          sendEmail(request.email, USER_REGISTER_OTP_SUBJECT, file);
          request.save();
          res.send({ status: 0000, message: "success" }).status(200);
        });
      }
    }
  } catch (error) {
    res.send({ status: 9999, message: "Something went wrong!" }).status(200);
  }
});

router.post("/verify", async (req, res) => {
  const otp = new OTP(req.body);

  try {
    if (otp.email && otp.otp) {
      const otpDb = await OTP.findOne({ otp: otp.otp, isExpired: false });
      if (otpDb != null) {
        const user = await User.findOne({ email: otp.email, verified: false });
        if (user != null) {
          otpDb.isExpired = true;
          user.verified = true;
          user.save();
          await otpDb.save();
          res.send({ status: 0000, message: "success" }).status(200);
        } else {
          res.send({ status: 9999, message: "Invalid Otp!" }).status(200);
        }
      } else {
        res.send({ status: 9999, message: "Invalid Otp!" }).status(200);
      }
    }
  } catch (error) {
    res.send({ status: 9999, message: "Something went wrong!" }).status(200);
  }
});

router.post("/delete", async (req, res) => {
  let body = req.body;
  try {
    await User.deleteOne({ email: body.email });
    res.send({ status: 0000, message: "success" }).status(200);
  } catch (error) {
    console.log("error : ", error.message);
    res.send({ status: 9999, message: "Something went wrong!" }).status(200);
  }
});

router.post("/signin", async (req, res) => {
  let body = req.body;

  try {
    if (body.email && body.password) {
      const user = await User.findOne({
        email: body.email,
        password: body.password,
      });

      if (user) {
        if (user.verified) {
          res
            .send({
              status: "0000",
              message: "Successfully login!",
              data: user,
            })
            .status(200);
        } else {
          const otp = new OTP();
          await OTP.deleteMany({ email: body.email });
          otp.email = body.email;
          otp.otp = generateOtp(4);
          otp.isExpired = false;
          await otp.save();
          res
            .send({
              status: SENT_OTP,
              message: "Please verify your email. OTP sent to your email",
            })
            .status(200);
        }
      } else {
        res
          .send({ status: "9999", message: "Invalid credentials!" })
          .status(200);
      }
    }
  } catch (error) {
    console.log("error : ", error.message);
    res.send({ status: 9999, message: "Something went wrong!" }).status(200);
  }
});

router.post("/reset", async (req, res) => {
  let body = req.body;
  // let path = "../backend/csv/user.csv";

  try {
    if (body.email && body.password) {
      const isExistEmail = await User.findOne({
        email: body.email,
      });

      if (isExistEmail) {
        isExistEmail.password = body.password;
        await isExistEmail.save();
        res
          .send({
            status: "0000",
            message: "Successfully login!",
            data: isExistEmail,
          })
          .status(200);
      } else {
        res
          .send({ status: "9999", message: "Invalid credentials!" })
          .status(200);
      }
    }
  } catch (error) {
    console.log("error : ", error.message);
    res.send({ status: 9999, message: "Something went wrong!" }).status(200);
  }
});

router.post("/test", async (request, response) => {
  const user = new User(request.body);

  try {
    await user.save();
    response.send(user);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.post("/find-user", async (request, response) => {
  const user = new User(request.body);

  try {
    const data = await User.find({ email: user.email });
    response.send(data);
  } catch (error) {
    console.log("error : ", error);
    response.status(500).send(error);
  }
});

module.exports = router;
