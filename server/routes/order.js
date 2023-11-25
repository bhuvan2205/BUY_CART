import { Router } from "express";
import {
  createOrder,
  deliverOrder,
  getSingleOrder,
  payOrder,
  getMyOrders,
  getAllOrders
} from "../controllers/order.js";
import auth from "../middlewares/auth.js";
import admin from "../middlewares/admin.js";

const router = Router();

router.post("/", auth, createOrder);
router.get("/mine", auth, getMyOrders);
router.get("/", auth,admin, getAllOrders);
router.get("/:id", auth, getSingleOrder);
router.post("/:id/pay", auth, payOrder);
router.post("/:id/deliver", auth, admin, deliverOrder);

export default router;
