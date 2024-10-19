import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar";
import LoginPage from "./pages/LoginPage";
import SingupPage from "./pages/singupPage";
import ReviewPage from "./pages/ReviewPage";
import ProfilePage from "./pages/ProfilePage";
import EditProfile from "./components/profile/EditProfile";
import { AuthProvider } from "./components/auth/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  return (
    <>
      <ToastContainer />
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/reviews" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SingupPage />} />
          <Route path="/reviews/*" element={<ReviewPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/edit" element={<EditProfile />} />
        </Routes>
      </AuthProvider>
    </>
  );
};

export default App;
