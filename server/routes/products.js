import { Router } from "express";
import {
  getAllProducts,
  getSingleProduct,
  deleteSingleProduct,
  createProduct,
  updateProduct,
  addProductReview
} from "../controllers/products.js";
import auth from "../middlewares/auth.js";
import admin from "../middlewares/admin.js";

const router = Router();

router.get("/", getAllProducts);
router.post("/", auth, admin, createProduct);
router.post("/:id/review", auth, addProductReview);
router.patch("/:id", auth, admin, updateProduct);
router.get("/:id", getSingleProduct);
router.delete("/:id", auth, admin, deleteSingleProduct);

export default router;
