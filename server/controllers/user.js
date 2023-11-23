import expressAsyncHandler from "express-async-handler";
import User from "../models/user.js";
import { removeCookie, setCookie } from "../utils/cookie.js";

export const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password, isAdmin = false } = req?.body || {};

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("Email already Exists!");
  }

  const user = await User.create({ name, email, password, isAdmin });

  if (!user) {
    res.status(400);
    throw new Error("Invalid user data");
  }

  res.status(200).json({ message: "User created Successfully!" });
});

export const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req?.body || {};

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("Invalid user Credentials!");
  }

  if (!(await user.comparePassword(password))) {
    res.status(400);
    throw new Error("Invalid user Credentials!");
  }

  await setCookie(res, user?._id);

  res.status(200).json({
    _id: user._id,
    email: user.email,
    isAdmin: user.isAdmin,
    name: user.name,
  });
});

export const logoutUser = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req?.user?._id);

  if (!user) {
    res.status(400);
    throw new Error("User not found!");
  }

  await removeCookie(res, user?._id);

  res.status(200).json({ message: "User Logged out successfully" });
});

export const userProfile = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req?.user?._id);

  if (!user) {
    res.status(400);
    throw new Error("User not found!");
  }

  res.status(200).json({
    _id: user._id,
    email: user.email,
    isAdmin: user.isAdmin,
    name: user.name,
  });
});

export const getUser = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req?.params?.id);

  if (!user) {
    res.status(400);
    throw new Error("User not found!");
  }

  res.status(200).json({
    _id: user._id,
    email: user.email,
    isAdmin: user.isAdmin,
    name: user.name,
  });
});

export const getAllUsers = expressAsyncHandler(async (req, res) => {
  const users = await User.find().select("-password");

  if (users?.length === 0) {
    res.status(200).json({ users: [] });
  }

  res.status(200).json({ users });
});

export const updateUser = expressAsyncHandler(async (req, res) => {
  const { name, password, isAdmin = false } = req?.body || {};

  const user = await User.findById(req?.user?._id);

  if (!user) {
    res.status(400);
    throw new Error("User not found!");
  }

  const updatedUser = await user.save({ name, email, password, isAdmin });

  if (!updatedUser) {
    res.status(400);
    throw new Error("Something went wrong!");
  }

  res.status(200).json({
    _id: updatedUser._id,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
    name: updatedUser.name,
  });
});

export const deleteUser = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req?.user?._id);

  if (!user) {
    res.status(400);
    throw Error("User not Found!");
  }

  const deletedUser = await User.deleteOne({ _id: user?._id });

  if (deletedUser?.deletedCount < 1) {
    res.status(404);
    throw new Error("Something went wrong!");
  }

  res.status(200).json({ message: "User removed successfully" });
});
