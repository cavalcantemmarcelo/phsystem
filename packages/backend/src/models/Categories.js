const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
});

const Categories = mongoose.model("Categories", categoriesSchema);

module.exports = Categories;
