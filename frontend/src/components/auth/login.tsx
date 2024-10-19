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
import { useAuth } from "./AuthContext";
import "react-toastify/dist/ReactToastify.css";

interface LoginResponse {
  token: string;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setIsSubmitting(true);
    try {
      const response = await axios.post<LoginResponse>(
        "https://book-review-murex.vercel.app/api/auth/login",
        {
          email,
          password,
        }
      );

      const { token } = response.data;
      localStorage.setItem("authToken", token);
      setIsLoggedIn(true);

      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 3000,
      });

      navigate("/");
    } catch (error) {
      toast.error("Login failed. Please check your credentials.", {
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
              backgroundColor: "rgba(255, 255, 255, 0.8)",
            }}
          >
            <Box textAlign="center" mb={3}>
              <Typography variant="h4" component="h1" gutterBottom>
                Login
              </Typography>
            </Box>
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
              onClick={handleLogin}
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
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
            <Box textAlign="center" mt={2}>
              <Typography variant="body2">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  style={{ color: "black", textDecoration: "none" }}
                >
                  Create an Account
                </Link>
              </Typography>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default Login;
