// import express from "express";
// import { addProduct,changeStock,productById,ProductsLits } from "../controllers/product.controller.js";
// import AuthSeller from "../middleware/AuthSeller.js";
// import {upload }from "../config/multer.js";

// const router = express.Router();

// router.post("/add", upload.single("image"),addProduct);
// router.get("/list", ProductsLits);
// router.get("/id", productById);
// router.get("/stock", AuthSeller, changeStock);



// export default router;


import express from "express";
import {
  addProduct,
  changeStock,
  productById,
  ProductsLits,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import AuthSeller from "../middleware/AuthSeller.js";
import { upload } from "../config/multer.js";

const router = express.Router();

// Public routes
router.get("/list", ProductsLits); // fetch all products
router.get("/:id", productById); // fetch a single product by ID

// Seller-protected routes
router.post("/add", AuthSeller, upload.single("image"), addProduct); // add product
router.patch("/stock/:id", AuthSeller, changeStock); // update stock
router.put("/edit/:id", AuthSeller,upload.single("image"), updateProduct); // update product
router.delete("/:id", AuthSeller, deleteProduct); // delete product

export default router;
