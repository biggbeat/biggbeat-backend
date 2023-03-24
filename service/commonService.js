const Product = require("../models/ProductSchema");

const validateEmail = (email) => {
  let flag = false;
  if (email) {
    if (email.includes("@") && email.includes(".com")) {
      flag = true;
    }
  } else {
    flag = false;
  }
  return flag;
};

const createSlug = async (title) => {
  let slug = "";
  try {
    slug = convertToSlug(title);
    console.log("slug : " + slug + " title : " + title);
    let product = await Product.exists({ slug: slug });
    if (product != null) {
      let newSlug = addHyphenToSlug(slug);
      slug = newSlug;
      console.log("hyphen added : ", slug);
      createSlug(slug);
    }
    return slug;
  } catch (error) {
    console.log("error : ", error);
  } finally {
  }
};

function addHyphenToSlug(slug) {
  return slug + "-";
}

function convertToSlug(Text) {
  return Text.toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}
module.exports = { validateEmail, createSlug, convertToSlug };
