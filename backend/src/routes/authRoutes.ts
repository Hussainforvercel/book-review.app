import { Router } from "express";
import { registerUser, loginUser } from "../controllers/authController";
import {
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", authenticate, getUserProfile);
router.put("/me", authenticate, updateUserProfile);
export default router;
