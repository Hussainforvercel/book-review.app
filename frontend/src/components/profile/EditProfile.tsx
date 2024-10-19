import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

interface User {
  username: string;
  email: string;
}

const EditProfile: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          toast.error("Please log in to edit your profile.");
          navigate("/login");
          return;
        }

        const userResponse = await axios.get<User>("/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsername(userResponse.data.username);
        setEmail(userResponse.data.email);
      } catch (error) {
        toast.error("Failed to load profile.");
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      await axios.put(
        "https://book-review-murex.vercel.app/api/users/me",
        { username, email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Profile updated successfully.");
      navigate("/profile");
    } catch (error) {
      toast.error("Failed to update profile.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 5 }}>
      <Paper
        elevation={4}
        sx={{ padding: 4, borderRadius: "12px", backgroundColor: "#f9f9f9" }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#333" }}
        >
          Edit Profile
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <TextField
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
            variant="outlined"
            sx={{
              "& .MuiInputLabel-root": { color: "#666" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#ddd" },
                "&:hover fieldset": { borderColor: "#333" },
              },
            }}
          />
          <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            variant="outlined"
            sx={{
              "& .MuiInputLabel-root": { color: "#666" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#ddd" },
                "&:hover fieldset": { borderColor: "#333" },
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#000",
              color: "#fff",
              textTransform: "none",
              borderRadius: "8px",
              paddingX: 3,
              "&:hover": { backgroundColor: "#333" },
            }}
            onClick={handleSubmit}
          >
            Save Changes
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default EditProfile;
