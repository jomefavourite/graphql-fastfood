import { Button, Container, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import notFound from "../images/404.png";

function NotFound() {
  return (
    <>
      <Container>
        <img src={notFound} alt='' className='notFound' />
        <Typography
          component='h2'
          sx={{ textAlign: "center", fontSize: "2rem" }}
        >
          Opps, this page isn't found
        </Typography>
        <Button variant='contained' sx={{ mx: "auto", display: "block" }}>
          <Link to='/'>Go Home</Link>
        </Button>
      </Container>
    </>
  );
}

export default NotFound;
