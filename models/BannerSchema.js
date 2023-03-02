const mongoose = require("mongoose");

const BannerSchema = new mongoose.Schema({
  heroImageWeb: {
    type: String,
    required: true,
  },
  heroImageMobile: {
    type: String,
    require: true,
  },
  backgroundImageWeb: {
    type: String,
    require: true,
  },
  backgroundImageMobile: {
    type: String,
    require: true,
  },
  productId: {
    type: String,
    require: true,
  },
  logoList: {
    type: Array,
    require: false,
  },
  redirectLink: {
    type: String,
    require: false,
  },
});

const Banner = mongoose.model("banner", BannerSchema);

module.exports = Banner;

