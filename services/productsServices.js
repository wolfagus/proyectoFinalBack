const products = require("../models/productsModel");
const pedidos = require("../models/pedidosModel");

const preoductsService = {
  findAllProducts: async (filter) => {
    return await products.find(filter);
  },
  saveProduct: async (product) => {
    const newProducts = new products(product);
    return await newProducts.save();
  },
  savePedidos: async (product) => {
    const newProducts = new pedidos(product);
    return await newProducts.save(product);
  },
};
module.exports = { preoductsService };
