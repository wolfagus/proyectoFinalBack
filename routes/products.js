const router = require("express").Router();
const Product = require("../models/productsModel");
const { roles } = require("../utils/enum");
const { isLoggedIn, checkRole } = require("../middleware/auth");
const {
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productsController");
const { create } = require("../models/productsModel");

router.get("/allProducts", isLoggedIn, getAllProducts);
router.get("/oneProduct/:id", isLoggedIn, getOneProduct);
router.get("/createproducts", checkRole(roles.ADMIN), createProduct);
router.put("/editProducts/:id", checkRole(roles.ADMIN), updateProduct);
router.delete("/deleteProducts/:id", checkRole(roles.ADMIN), deleteProduct);
module.exports = router;
