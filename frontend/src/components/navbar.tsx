import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import { useAuth } from "./auth/AuthContext";

const Navbar: React.FC = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderMenuItems = () => [
    <MenuItem key="home" onClick={handleMenuClose} component={Link} to="/">
      Home
    </MenuItem>,
    isLoggedIn && (
      <MenuItem
        key="profile"
        onClick={handleMenuClose}
        component={Link}
        to="/profile"
      >
        Profile
      </MenuItem>
    ),
    isLoggedIn ? (
      <MenuItem
        key="logout"
        onClick={() => {
          handleLogout();
          handleMenuClose();
        }}
      >
        Logout
      </MenuItem>
    ) : (
      <MenuItem
        key="login"
        onClick={() => {
          navigate("/login");
          handleMenuClose();
        }}
      >
        Login
      </MenuItem>
    ),
  ];

  return (
    <AppBar position="static" sx={{ backgroundColor: "black" }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Book Review Platform
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {renderMenuItems()}
            </Menu>
          </>
        ) : (
          <Box>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            {isLoggedIn && (
              <Button color="inherit" component={Link} to="/profile">
                Profile
              </Button>
            )}
            {isLoggedIn ? (
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button color="inherit" onClick={() => navigate("/login")}>
                Login
              </Button>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
