import React from "react";
import { Routes, Route } from "react-router-dom";
import ReviewList from "../components/reviews/ReviewList";
import AddReview from "../components/reviews/AddReview";
import EditReview from "../components/reviews/EditReview";

const ReviewPage: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ReviewList />} />
      <Route path="add-review" element={<AddReview />} />
      <Route path="edit-review/:id" element={<EditReview />} />
    </Routes>
  );
};

export default ReviewPage;
