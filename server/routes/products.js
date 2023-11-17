import { Router } from "express";
import products from "../data/product.js";
import checkValidObjectID from "../utils/checkValidObjectID.js";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({ products });
});

router.get("/:id", (req, res) => {
  const { id } = req?.params || {};
  //   checkValidObjectID(id);

  const product = products.find((product) => product?.id == id);

  if (!product) {
    throw Error("Product not found");
  }

  res.status(200).json({ product });
});

export default router;
