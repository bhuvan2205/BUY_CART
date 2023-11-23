import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const auth = expressAsyncHandler(async (req, res, next) => {
  const { jwt: token } = req?.cookies || {};

  if (!token) {
    res.status(403);
    throw new Error("Authorization token not found!");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const user = await User.findById(decoded?.userId).select("-password");

  if (!user) {
    res.status(401);
    throw new Error("Authorization token Expired!");
  }

  req.user = user;
  next();
});

export default auth;
