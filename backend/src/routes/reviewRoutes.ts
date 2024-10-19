import { Router } from "express";
import {
  addReview,
  getReviews,
  updateReview,
  deleteReview,
  getReviewById,
  getUserReviews,
} from "../controllers/reviewController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.post("/", authenticate, addReview);
router.get("/", getReviews);
router.get("/user", authenticate, getUserReviews);
router.put("/:id", authenticate, updateReview);
router.delete("/:id", authenticate, deleteReview);
router.get("/:id", getReviewById);

export default router;
