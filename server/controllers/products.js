import expressAsyncHandler from "express-async-handler";
import Product from "../models/products.js";
import checkValidObjectID from "../utils/checkValidObjectID.js";

export const getAllProducts = expressAsyncHandler(async (req, res) => {
  const { page = 1, limit = 5, keywords = "" } = req?.query || {};
  const options = {
    page,
    limit,
    collation: {
      locale: "en",
    },
  };

  const keyword = keywords ? { name: { $regex: keywords, $options: "i" } } : {};

  const data = await Product.paginate({}, options);

  const { totalPages, hasNextPage, hasPrevPage, totalDocs, pagingCounter } =
    data || {};

  const products = await Product.find({ ...keyword });

  if (!products) {
    res.status(200).json({
      products: [],
      totalPages: 0,
      hasNextPage: false,
      hasPrevPage: false,
      totalDocs: 0,
      pagingCounter: 0,
    });
  }

  res.status(200).json({
    products,
    totalPages,
    hasNextPage,
    hasPrevPage,
    totalDocs,
    pagingCounter,
  });
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

  const { name, description, brand, price, category, countInStock, image } =
    req?.body || {};

  product.name = name || product?.name;
  product.description = description || product?.description;
  product.brand = brand || product?.brand;
  product.price = price || product?.price;
  product.category = category || product?.category;
  product.image = image || product?.image;
  product.countInStock = countInStock || product?.countInStock;

  const updatedProduct = await product.save();

  if (!updatedProduct) {
    res.status(400);
    throw Error("Something went wrong!");
  }

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

export const addProductReview = expressAsyncHandler(async (req, res) => {
  const { id } = req.params || {};
  checkValidObjectID(id);

  const product = await Product.findById(id);

  if (!product) {
    res.status(400);
    throw Error("Product not Found!");
  }

  const reviewExists = product?.reviews?.find(
    (review) => review?.user?.toString() === req?.user?._id?.toString()
  );

  if (reviewExists) {
    res.status(400);
    throw Error("Product already reviewed!");
  }
  const { comment = "", rating = 0 } = req.body || {};

  const review = {
    comment,
    user: req?.user?._id,
    name: req?.user?.name,
    rating,
  };

  product.reviews = [...product?.reviews, { ...review }];
  product.numReviews = product?.reviews?.length;
  product.rating = product?.reviews?.reduce((acc, item) => { return acc += item?.rating}, 0) / product?.numReviews;

  const updatedProduct = await product.save();

  if (!updatedProduct) {
    res.status(400);
    throw Error("Something went wrong!");
  }

  res.status(200).json({ product: updatedProduct });
});
