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

export const payOrder = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params || {};
  checkValidObjectID(id);

  const order = await Order.findById(id);

  if (!order) {
    res.status(400);
    throw Error("Order not Found!");
  }

  const { payer } = req?.body || {};

  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResult = {
    id: payer?.payer_id,
    email_address: payer?.email_address,
    name: payer?.name?.given_name,
  };

  const updatedOrder = await order.save();

  res
    .status(200)
    .json({ message: "Order Paid Successfully!", order: updatedOrder });
});

export const deliverOrder = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params || {};
  checkValidObjectID(id);

  const order = await Order.findById(id);

  if (!order) {
    res.status(400);
    throw Error("Order not Found!");
  }

  order.isDelivered = true;
  order.deliveredAt = Date.now();

  const updatedOrder = await order.save();

  res
    .status(200)
    .json({ message: "Order Paid Successfully!", order: updatedOrder });
});

export const getMyOrders = expressAsyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req?.user?._id });

  if (!orders) {
    res.status(200).json({ orders: [] });
  }
  res.status(200).json({ orders });
});

export const getAllOrders = expressAsyncHandler(async (req, res) => {
  const orders = await Order.find().populate("user", "email name");

  if (!orders) {
    res.status(200).json({ orders: [] });
  }
  res.status(200).json({ orders });
});
