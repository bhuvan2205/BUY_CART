import { Router } from "express";
import { createOrder, getSingleOrder } from "../controllers/order.js";
import auth from "../middlewares/auth.js";

const router = Router();

router.post("/", auth, createOrder);
router.get("/:id", auth, getSingleOrder);

export default router;
