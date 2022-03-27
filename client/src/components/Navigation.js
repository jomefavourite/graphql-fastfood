import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink, Link } from "react-router-dom";
import { List, ListItem } from "@mui/material";

const pages = [
  { text: "Home", link: "/" },
  { text: "Menu", link: "/menu" },
  { text: "Profile", link: "/profile" },
  { text: "Admin", link: "/admin" },
];

const Navigation = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { user, isAuthenticated, isLoading, logout, loginWithRedirect } =
    useAuth0();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position='static'
      sx={{ background: "none", color: "#000", boxShadow: "none" }}
    >
      <Container maxWidth='lg'>
        <Toolbar disableGutters>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
                color: "#000",
              }}
            >
              {isAuthenticated &&
                pages.map((page) => (
                  <MenuItem key={page.text} onClick={handleCloseNavMenu}>
                    <Typography textAlign='center' color='#000'>
                      {page.text}
                    </Typography>
                  </MenuItem>
                ))}
            </Menu>
          </Box>

          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            LOGO
          </Typography>

          <Box sx={{ mx: "auto" }}>
            <List
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
              }}
            >
              {pages.map((page, i) => (
                <ListItem
                  key={i}
                  sx={{ my: 2, color: "#000", display: "block" }}
                >
                  <NavLink
                    style={({ isActive }) => {
                      return {
                        color: isActive ? "#223344" : "#777",
                      };
                    }}
                    to={page.link}
                  >
                    {page.text}
                  </NavLink>
                </ListItem>
              ))}
            </List>
          </Box>

          {isLoading && <Avatar alt={user?.name} src={user?.picture} />}

          {!isAuthenticated && !isLoading && (
            <Button
              variant='contained'
              sx={[
                {
                  boxShadow: "none",
                  color: "#fff",
                  textTransform: "capitalize",
                  "&:hover": {
                    backgroundColor: "theme.primary",
                  },
                },
              ]}
              onClick={() => loginWithRedirect()}
            >
              Sign In
            </Button>
          )}

          {isAuthenticated && (
            <Box sx={{ flexGrow: 0 }}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user?.name} src={user?.picture} />
              </IconButton>
              <Menu
                sx={{ mt: "45px" }}
                id='menu-appbar'
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link to='/profile'>Profile</Link>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography
                    sx={{ display: "block" }}
                    onClick={() => logout({ returnTo: window.location.origin })}
                  >
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navigation;
