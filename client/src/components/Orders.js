import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Skeleton,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { base } from "../util.js";
import EmptyCart from "../images/empty-cart.svg";

function Orders({ isAuthenticated, isLoading }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    isAuthenticated &&
      base("orders")
        .select({ view: "Grid view" })
        .eachPage((records, fetchNextPage) => {
          // console.log(records);
          setOrders(records);
          fetchNextPage();
        });
  }, [isAuthenticated]);

  return (
    <Box sx={{ my: "2rem" }}>
      <Container>
        <Box
          sx={{
            bgcolor: "#fff",
            borderRadius: "20px",
            boxShadow: "0 10px 10px #261d1d14",
            p: "2rem",
          }}
        >
          {!isAuthenticated && !isLoading && (
            <>
              <img src={EmptyCart} alt='' className='empty-cart' />
              <Typography
                as='h2'
                sx={{ textAlign: "center", fontSize: "1.5rem" }}
              >
                You have no orders, login to add orders
              </Typography>
            </>
          )}

          {isAuthenticated && orders.length === 0 && (
            <>
              <img src={EmptyCart} alt='' className='empty-cart' />
              <Typography
                as='h2'
                sx={{ textAlign: "center", fontSize: "1.5rem" }}
              >
                You have no orders, login to add orders
              </Typography>
            </>
          )}

          {isLoading && (
            <>
              {Array(8)
                .fill()
                .map((_, i) => (
                  <Skeleton key={i} animation='wave' />
                ))}
            </>
          )}

          {isAuthenticated && (
            <>
              {orders?.map((order, i) => (
                <Card
                  key={i}
                  sx={[
                    {
                      display: {
                        xs: "block",
                        md: "flex",
                      },
                      "& + *": {
                        mt: "1rem",
                      },
                    },
                  ]}
                >
                  <CardMedia
                    component='img'
                    sx={{ width: { xs: "100%", md: "151px" }, height: "100px" }}
                    image={order?.fields?.image}
                    alt={order?.fields?.title}
                  ></CardMedia>
                  <CardContent sx={{ width: "100%" }}>
                    <Typography>Food:</Typography>
                    <Box
                      sx={{
                        display: { xs: "", md: "flex" },
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <Typography variant='h2' sx={{ fontSize: "2rem" }}>
                        {order?.fields?.title}
                      </Typography>

                      <Button
                        sx={[
                          {
                            textTransform: "capitalize",
                            backgroundColor: "#000",
                            color: "#fff",
                            cursor: "auto",
                            "&:hover": {
                              textTransform: "capitalize",
                              backgroundColor: "#000",
                              color: "#fff",
                            },
                          },
                        ]}
                      >
                        Ordered
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </>
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default Orders;
