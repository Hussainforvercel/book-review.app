import React, { useState } from "react";
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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AddReview: React.FC = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState<number | null>(0);

  const navigate = useNavigate();

  const handleAddReview = async () => {
    try {
      const token = localStorage.getItem("authToken");

      await axios.post(
        "https://book-review-murex.vercel.app/api/reviews",
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

      toast.success("Review added successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      navigate("/profile");
    } catch (error) {
      toast.error("Failed to add review. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <Box
        sx={{
          backgroundImage: "url('https://source.unsplash.com/random/1600x900')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="sm">
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
                Add a Book Review
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
              onClick={handleAddReview}
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
              Submit Review
            </Button>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default AddReview;
