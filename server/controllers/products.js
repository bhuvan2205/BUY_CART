import expressAsyncHandler from "express-async-handler";
import Product from "../models/products.js";
import checkValidObjectID from "../utils/checkValidObjectID.js";

export const getAllProducts = expressAsyncHandler(async (req, res) => {
  const products = await Product.find({});

  if (!products) {
    res.status(200).json({ products: [] });
  }

  res.status(200).json({ products });
});

export const getSingleProduct = expressAsyncHandler(async (req, res) => {
  const { id } = req.params || {};
  checkValidObjectID(id);

  const product = await Product.findById(id);

  if (!product) {
    res.status(400);
    throw Error("Product not Found!");
  }

  res.status(200).json({ product });
});

export const createProduct = expressAsyncHandler(async (req, res) => {
  const { user } = req || {};

  const data = {
    name: "Sample Product",
    description: "Sample description",
    rating: 0,
    numReviews: 0,
    brand: "Brand",
    price: 0,
    category: "Electronic",
    countInStock: 0,
    user: user?._id,
    image: "/images/sample.jpg",
  };

  const product = await Product.create(data);

  if (!product) {
    res.status(400);
    throw Error("Something went wrong!");
  }

  res.status(200).json({ product });
});

export const updateProduct = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params || {};
  checkValidObjectID(id);

  const product = await Product.findById(id);

  if (!product) {
    res.status(400);
    throw Error("Product not Found!");
  }

  const {
    name,
    description,
    brand,
    price,
    category,
    countInStock,
    image,
  } = req?.body || {};

  product.name = name || product?.name;
  product.description = description || product?.description;
  product.brand = brand || product?.brand;
  product.price = price || product?.price;
  product.category = category || product?.category;
  product.image = image || product?.image;
  product.countInStock = countInStock || product?.countInStock;

  const updatedProduct = await product.save();
  res.status(200).json({ product: updatedProduct });
});

export const deleteSingleProduct = expressAsyncHandler(async (req, res) => {
  const { id } = req.params || {};
  checkValidObjectID(id);

  const product = await Product.findById(id);

  if (!product) {
    res.status(400);
    throw Error("Product not Found!");
  }

  const deletedProduct = await Product.deleteOne({ _id: product?._id });

  if (deletedProduct?.deletedCount < 1) {
    res.status(404);
    throw new Error("Something went wrong!");
  }

  res.status(200).json({ message: "Product removed successfully" });
});
