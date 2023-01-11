const router = require("express").Router();
const Product = require("../models/productsModel");

router.get("/all", async (req, res) => {
  try {
    console.log("entro");
    const allProducts = await Product.find();
    console.log(allProducts);
    res.status(200).send(allProducts);
  } catch (error) {
    console.log("error");

    res.status(400).json({ message: error });
  }
});

module.exports = router;
