import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Divider,
  Rating,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

interface User {
  username: string;
  email: string;
}

interface Review {
  _id: string;
  title: string;
  reviewText: string;
  author: string;
  rating: number;
}

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          toast.error("Please log in to view your profile.");
          navigate("/login");
          return;
        }

        const userResponse = await axios.get<User>(
          "https://book-review-murex.vercel.app/api/users/me",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUser(userResponse.data);

        const reviewsResponse = await axios.get<Review[]>(
          "https://book-review-murex.vercel.app/api/reviews/user",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setReviews(reviewsResponse.data);
      } catch (error) {
        toast.error("Failed to load profile.");
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleDeleteReview = async (id: string) => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        toast.error("You must be logged in to delete a review.");
        return;
      }

      await axios.delete(
        `https://book-review-murex.vercel.app/api/reviews/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Review deleted successfully!");
      setReviews(reviews.filter((review) => review._id !== id));
    } catch (error) {
      toast.error("Failed to delete review. Please try again.");
    }
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 5 }}>
      <Paper
        elevation={4}
        sx={{
          padding: 3,
          borderRadius: "16px",
          backgroundColor: "#f9f9f9",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        {user && (
          <>
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{ fontWeight: "bold", color: "#333" }}
            >
              {user.username}
            </Typography>

            <Typography variant="body1" align="center" sx={{ color: "#666" }}>
              {user.email}
            </Typography>

            <Box display="flex" justifyContent="center" mt={3}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#000",
                  color: "#fff",
                  borderRadius: "8px",
                  textTransform: "none",
                  paddingX: 4,
                  "&:hover": {
                    backgroundColor: "#333",
                  },
                }}
                onClick={() => navigate("/profile/edit")}
              >
                Edit Profile
              </Button>
            </Box>
          </>
        )}
      </Paper>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 5,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "#333",
          }}
        >
          Your Reviews
        </Typography>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#000",
            color: "#fff",
            borderRadius: "8px",
            textTransform: "none",
            paddingX: 4,
            "&:hover": {
              backgroundColor: "#333",
            },
          }}
          onClick={() => navigate("/reviews/add-review")}
        >
          Add Review
        </Button>
      </Box>

      {reviews.length === 0 ? (
        <Typography align="center" sx={{ color: "#999" }}>
          No reviews found.
        </Typography>
      ) : (
        reviews.map((review) => (
          <Paper
            key={review._id}
            elevation={3}
            sx={{
              padding: 3,
              marginBottom: 3,
              marginTop: 3,
              backgroundColor: "#f0f0f0",
              borderRadius: "12px",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "#333", fontSize: "1.4rem" }}
            >
              {review.title}
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{ color: "#666", marginBottom: 1 }}
            >
              By: {review.author}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography
              variant="body2"
              sx={{
                color: "#555",
                fontSize: "1rem",
                lineHeight: 1.6,
                marginRight: "16px",
                paddingRight: "16px",
              }}
            >
              Review: {review.reviewText}
            </Typography>

            <Box display="flex" justifyContent="flex-start" mt={2}>
              <Typography variant="body1" sx={{ marginRight: 1 }}>
                Rating:
              </Typography>
              <Rating name="read-only" value={review.rating} readOnly />
            </Box>

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mt={3}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#333",
                  "&:hover": {
                    backgroundColor: "#555",
                  },
                  color: "white",
                  textTransform: "none",
                  borderRadius: "8px",
                  paddingX: 3,
                }}
                onClick={() => navigate(`/reviews/edit-review/${review._id}`)}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="error"
                sx={{
                  borderRadius: "8px",
                  paddingX: 3,
                  textTransform: "none",
                }}
                onClick={() => handleDeleteReview(review._id)}
              >
                Delete
              </Button>
            </Box>
          </Paper>
        ))
      )}
    </Container>
  );
};

export default ProfilePage;
