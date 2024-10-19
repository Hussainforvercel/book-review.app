"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReview = exports.updateReview = exports.getUserReviews = exports.getReviewById = exports.addReview = exports.getReviews = void 0;
const Review_1 = __importDefault(require("../models/Review"));
const getReviews = async (req, res) => {
    try {
        const reviews = await Review_1.default.find().populate("user", "username"); // You can populate with user info if needed
        res.status(200).json(reviews);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching reviews" });
    }
};
exports.getReviews = getReviews;
const addReview = async (req, res) => {
    const { title, author, reviewText, rating } = req.body;
    try {
        const newReview = new Review_1.default({
            user: req.user?.userId,
            title,
            author,
            reviewText,
            rating,
        });
        await newReview.save();
        res.status(201).json(newReview);
    }
    catch (error) {
        res.status(500).json({ message: "Error adding review" });
    }
};
exports.addReview = addReview;
const getReviewById = async (req, res) => {
    try {
        const review = await Review_1.default.findById(req.params.id);
        if (!review) {
            res.status(404).json({ message: "Review not found" });
            return;
        }
        res.status(200).json(review);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching review" });
    }
};
exports.getReviewById = getReviewById;
const getUserReviews = async (req, res) => {
    try {
        const userId = req.user?.userId;
        const reviews = await Review_1.default.find({ user: userId }).populate("user", "username");
        res.status(200).json(reviews);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching user reviews" });
    }
};
exports.getUserReviews = getUserReviews;
const updateReview = async (req, res) => {
    const { title, author, reviewText, rating } = req.body;
    const { id } = req.params;
    try {
        const review = await Review_1.default.findById(id);
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
    }
    catch (error) {
        res.status(500).json({ message: "Error updating review" });
    }
};
exports.updateReview = updateReview;
const deleteReview = async (req, res) => {
    const { id } = req.params;
    try {
        const review = await Review_1.default.findById(id);
        if (!review) {
            res.status(404).json({ message: "Review not found" });
            return;
        }
        if (review.user.toString() !== req.user?.userId) {
            res.status(403).json({ message: "Unauthorized action" });
            return;
        }
        await Review_1.default.findByIdAndDelete(id);
        res.status(200).json({ message: "Review deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting review" });
    }
};
exports.deleteReview = deleteReview;
