import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Divider,
  Rating,
  TextField,
  Pagination,
} from "@mui/material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReviewList: React.FC = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          "https://book-review-murex.vercel.app/api/reviews"
        );
        if (Array.isArray(response.data)) {
          setReviews(response.data);
        } else {
          setReviews([]);
        }
      } catch (error) {
        toast.error("Failed to fetch reviews. Please try again.");
        setReviews([]);
      }
    };
    fetchReviews();
  }, []);

  const filteredReviews = reviews.filter((review) =>
    review.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);

  const startIndex = (currentPage - 1) * reviewsPerPage;
  const endIndex = startIndex + reviewsPerPage;
  const paginatedReviews = filteredReviews.slice(startIndex, endIndex);

  const handlePageChange = (_: unknown, page: number) => {
    setCurrentPage(page);
  };

  return (
    <Container maxWidth="md">
      <ToastContainer />
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: 4,
          color: "#333",
        }}
      >
        Book Reviews
      </Typography>

      <TextField
        fullWidth
        label="Search by Book Title"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ marginBottom: 4 }}
      />

      {paginatedReviews.length === 0 ? (
        <Typography
          variant="h6"
          component="p"
          sx={{
            textAlign: "center",
            color: "#999",
            padding: 4,
            border: "2px dashed #ddd",
            borderRadius: "8px",
          }}
        >
          No reviews found
        </Typography>
      ) : (
        paginatedReviews.map((review) => (
          <Paper
            key={review._id}
            elevation={6}
            sx={{
              padding: 3,
              marginBottom: 3,
              backgroundColor: "#f5f5f5",
              borderRadius: "12px",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0px 5px 15px rgba(0,0,0,0.3)",
              },
            }}
          >
            <Box sx={{ marginBottom: 2 }}>
              <Typography
                variant="h5"
                fontWeight="bold"
                gutterBottom
                sx={{ color: "#333", fontSize: "1.6rem" }}
              >
                {review.title}
              </Typography>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ color: "#666", fontStyle: "italic" }}
              >
                Author: {review.author}
              </Typography>
              <Divider sx={{ marginY: 2 }} />
              <Typography
                variant="body2"
                sx={{
                  color: "#555",
                  fontSize: "1rem",
                  lineHeight: 1.6,
                }}
              >
                <strong>Description:</strong> {review.reviewText}
              </Typography>

              <Box display="flex" alignItems="center" mt={2}>
                <Typography component="legend" sx={{ marginRight: 1 }}>
                  Rating:
                </Typography>
                <Rating name="read-only" value={review.rating || 0} readOnly />
              </Box>
            </Box>
          </Paper>
        ))
      )}

      <Box display="flex" justifyContent="center" mt={4} mb={4}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          sx={{
            "& .MuiPaginationItem-root": {
              color: "white",
              backgroundColor: "black",
              borderRadius: "0px",
              "&:hover": {
                backgroundColor: "darkgray",
              },
            },
            marginBottom: 4,
          }}
        />
      </Box>
    </Container>
  );
};

export default ReviewList;
