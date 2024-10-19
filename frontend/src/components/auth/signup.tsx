import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "./AuthContext";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();

  interface RegisterResponse {
    token: string;
  }

  const handleRegister = async () => {
    setIsSubmitting(true);
    try {
      const response = await axios.post<RegisterResponse>(
        "https://book-review-murex.vercel.app/api/auth/register",
        {
          username: name,
          email,
          password,
        }
      );

      const { token } = response.data;
      localStorage.setItem("authToken", token);

      setIsLoggedIn(true);

      toast.success("Registration successful! Redirecting...", {
        position: "top-right",
        autoClose: 3000,
      });

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      toast.error("Registration failed. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <Box
        sx={{
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
              backgroundColor: "rgba(255, 255, 255, 0.8)",
            }}
          >
            <Box textAlign="center" mb={3}>
              <Typography variant="h4" component="h1" gutterBottom>
                Register
              </Typography>
            </Box>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              variant="contained"
              fullWidth
              onClick={handleRegister}
              disabled={isSubmitting}
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
              {isSubmitting ? "Registering..." : "Register"}
            </Button>
            <Box textAlign="center" mt={2}>
              <Typography variant="body2">
                Already have an account?{" "}
                <Link
                  to="/login"
                  style={{ color: "black", textDecoration: "none" }}
                >
                  Login here
                </Link>
              </Typography>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default Register;
