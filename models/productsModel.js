const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: String,
});
const Product = mongoose.model("productos", productSchema);
module.exports = Product;
