const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    title: { type: String, require: true },
    price: { type: Number, require: true },
    images: { type: String, require: true },
    description: { type: String },
    categories: { type: String, require: true },
    stock: { type: Number, remove: true },
    isActive: Boolean,
    deleteProducs: Date,
    isDelete: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const products = mongoose.model("productos", productSchema);
module.exports = products;
