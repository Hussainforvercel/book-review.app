import { Request, Response } from "express";
import Review from "../models/Review";

export const getReviews = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const reviews = await Review.find().populate("user", "username"); // You can populate with user info if needed
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews" });
  }
};

export const addReview = async (req: Request, res: Response): Promise<void> => {
  const { title, author, reviewText, rating } = req.body;
  try {
    const newReview = new Review({
      user: req.user?.userId,
      title,
      author,
      reviewText,
      rating,
    });

    await newReview.save();

    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: "Error adding review" });
  }
};

export const getReviewById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      res.status(404).json({ message: "Review not found" });
      return;
    }
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: "Error fetching review" });
  }
};

export const getUserReviews = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.userId;

    const reviews = await Review.find({ user: userId }).populate(
      "user",
      "username"
    );

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user reviews" });
  }
};

export const updateReview = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { title, author, reviewText, rating } = req.body;
  const { id } = req.params;

  try {
    const review = await Review.findById(id);

    if (!review) {
      res.status(404).json({ message: "Review not found" });
      return;
    }

    if (review.user.toString() !== req.user?.userId) {
      res.status(403).json({ message: "Unauthorized action" });
      return;
    }

    review.title = title || review.title;
    review.author = author || review.author;
    review.reviewText = reviewText || review.reviewText;
    review.rating = rating || review.rating;

    await review.save();
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: "Error updating review" });
  }
};

export const deleteReview = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const review = await Review.findById(id);

    if (!review) {
      res.status(404).json({ message: "Review not found" });
      return;
    }

    if (review.user.toString() !== req.user?.userId) {
      res.status(403).json({ message: "Unauthorized action" });
      return;
    }

    await Review.findByIdAndDelete(id);
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting review" });
  }
};
