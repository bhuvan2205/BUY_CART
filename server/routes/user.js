import { Router } from "express";
import {
  deleteUser,
  loginUser,
  registerUser,
  updateUser,
  logoutUser,
  userProfile,
  getAllUsers,
  getUser,
} from "../controllers/user.js";
import auth from "../middlewares/auth.js";
import admin from "../middlewares/admin.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", auth, userProfile);
router.post("/logout", auth, logoutUser);
router.get("/:id", auth, admin, getUser);
router.get("/", auth, admin, getAllUsers);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
