import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Burger from "../images/burger.png";

function Banner() {
  return (
    <Box component='main' sx={{ mt: "2rem" }}>
      <Container maxWidth='lg' sx={{ background: "none" }}>
        <Box sx={{ display: { md: "flex", background: "none" } }}>
          <img src={Burger} alt='Burger' className='burger-image' />

          <Box sx={{ order: "1", background: "none", my: "auto" }}>
            <Typography
              sx={{ textAlign: { xs: "center", md: "left", color: "#223344" } }}
            >
              ✨ EASY WAY TO ORDER YOUR FOOD
            </Typography>
            <Typography
              variant='h1'
              sx={{
                textAlign: { xs: "center", md: "left" },
                fontSize: { xs: "3rem", md: "5rem" },
                fontWeight: "700",
                margin: { md: "10px 0 20px" },
                color: "#223344",
              }}
            >
              Chose Healthy & Fresh Food
            </Typography>
            <Typography
              sx={{
                textAlign: { xs: "center", md: "left" },
                fontSize: { xs: "1.3rem", md: "1.5rem" },
                maxWidth: { xs: "80%", md: "500px" },
                mx: { xs: "auto", md: "0" },
                color: "#777",
              }}
            >
              Just confirm your order and enjoy our delicious fastest delivery
            </Typography>

            <Box sx={{ mt: "40px", mx: { xs: "auto", md: "0" } }}>
              <Button
                variant='contained'
                sx={[
                  {
                    borderRadius: "99px 99px 0 99px",
                    boxShadow: "none",
                    color: "#fff",
                    padding: "15px 40px",
                    textTransform: "capitalize",
                    "&:hover": {
                      backgroundColor: "theme.primary",
                    },
                  },
                ]}
              >
                Order Now
              </Button>
              <Button
                sx={[
                  {
                    ml: "20px",
                    textTransform: "capitalize",
                    padding: "15px 40px",
                    "& > a": {
                      color: "inherit",
                    },
                  },
                ]}
              >
                <Link to='/menu'>See Menu</Link>
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Banner;
