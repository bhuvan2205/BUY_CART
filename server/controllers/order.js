import expressAsyncHandler from "express-async-handler";
import Order from "../models/order.js";
import checkValidObjectID from "../utils/checkValidObjectID.js";

export const createOrder = expressAsyncHandler(async (req, res) => {
  const {
    shippingAddress,
    cartItems,
    paymentMethod,
    subTotal,
    orderTotal,
    taxCost,
    shippingCost,
  } = req?.body || {};

  const { user } = req || {};

  const order = await Order.create({
    user,
    shippingAddress,
    cartItems,
    paymentMethod,
    subTotal,
    orderTotal,
    taxCost,
    shippingCost,
  });

  if (!order) {
    res.status(400);
    throw new Error("Invalid data!");
  }

  res.status(200).json({ order });
});

export const getSingleOrder = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params || {};
  checkValidObjectID(id);

  const order = await Order.findById(id);

  if (!order) {
    res.status(400);
    throw Error("Order not Found!");
  }

  res.status(200).json({ order });
});
