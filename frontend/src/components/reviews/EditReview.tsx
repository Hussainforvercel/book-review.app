import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Rating,
  Box,
  Paper,
} from "@mui/material";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Review {
  _id: string;
  title: string;
  author: string;
  reviewText: string;
  rating: number | null;
}

const EditReview: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [reviewText, setReviewText] = useState<string>("");
  const [rating, setRating] = useState<number | null>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await axios.get<Review>(
          `https://book-review-murex.vercel.app/api/reviews/${id}`
        );
        const { title, author, reviewText, rating } = response.data;
        setTitle(title);
        setAuthor(author);
        setReviewText(reviewText);
        setRating(rating);
        setIsLoading(false);
      } catch (error) {
        toast.error("Failed to fetch review data.");
        setIsLoading(false);
      }
    };
    fetchReview();
  }, [id]);

  const handleUpdateReview = async () => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        toast.error("You must be logged in to update the review.");
        return;
      }

      await axios.put(
        `https://book-review-murex.vercel.app/api/reviews/${id}`,
        {
          title,
          author,
          reviewText,
          rating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Review updated successfully!");

      setTimeout(() => {
        navigate("/reviews");
      }, 3000);
    } catch (error) {
      toast.error("Failed to update review.");
    }
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="sm" sx={{ paddingTop: 4 }}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        draggable
        pauseOnHover
      />
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          borderRadius: 2,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
        }}
      >
        <Box textAlign="center" mb={3}>
          <Typography variant="h4" component="h1" gutterBottom>
            Edit Review
          </Typography>
        </Box>
        <TextField
          label="Book Title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Author"
          variant="outlined"
          fullWidth
          margin="normal"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <TextField
          label="Review"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          margin="normal"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
        <Box textAlign="center" my={2}>
          <Typography component="legend">Rating</Typography>
          <Rating
            name="rating"
            value={rating}
            onChange={(_, newValue) => {
              setRating(newValue);
            }}
          />
        </Box>
        <Button
          variant="contained"
          fullWidth
          onClick={handleUpdateReview}
          sx={{
            marginTop: 2,
            padding: 1.5,
            borderRadius: 3,
            backgroundColor: "black",
            "&:hover": {
              backgroundColor: "#333",
            },
          }}
        >
          Update Review
        </Button>
      </Paper>
    </Container>
  );
};

export default EditReview;
