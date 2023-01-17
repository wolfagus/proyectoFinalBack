const products = require("../models/productsModel");

const preoductsService = {
  findAllProducts: async (filter) => {
    return await products.find(filter);
  },
  saveProduct: async (product) => {
    const newProducts = new product(product);
    return await newProducts.save();
  },
};
module.exports = { preoductsService };
