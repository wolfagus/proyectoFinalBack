const { menu } = require("mongoose").Types;
const { ObjectId } = require("mongoose").Types;
const { preoductsService } = require("../services/productsServices");
const products = require("../models/productsModel");

const getAllProducts = async (req, res) => {
  try {
    const products = await preoductsService.findAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json("internal sever error");
  }
};
const getOneProduct = async (req, res) => {
  const id = req.params.id;
  try {
    if (!ObjectId.isValid(id)) {
      res.status(404).json("Id not valid");
    }
    const Products = await products.findById(id);
    if (!Products) {
      res.status(404).json("Id not found");
    } else {
      res.status(200).json(Products);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("internal sever error");
  }
};
const createProduct = async (req, res) => {
  const productsSave = { ...req.body, isActive: true };
  try {
    const newProduct = await preoductsService.saveProduct(productsSave);
    return res.status(201).json(newProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json("internal sever error");
  }
};
const updateProduct = async (req, res) => {
  try {
    const bodyProduct = req.body;
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json("ObjectId is not valid");
    }
    const updateProduct = await products.findOneAndUpdate(
      {
        _id: id,
      },
      bodyProduct,
      { new: true }
    );
    if (updateProduct) {
      res.status(200).json(updateProduct);
    } else {
      res.status(404).json("Product not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("internal sever error");
  }
};
const deleteProduct = async (req, res) => {
  const id = req.params.id;
  const deleteStatus = {
    deleteAt: new Date(),
    isDelete: true,
    isActive: false,
  };
  try {
    if (!ObjectId.isValid(id)) {
      return res.status(400).json("ObjectId is not valid");
    }
    const deleteProduct = await products.findOneAndUpdate(
      {
        _id: id,
      },
      deleteStatus,
      { new: true }
    );
    if (deleteProduct) {
      res.status(200).json(`product deleted = ${deleteProduct.title}`);
    } else {
      res.status(404).json("Product not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("internal sever error");
  }
};

module.exports = {
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
