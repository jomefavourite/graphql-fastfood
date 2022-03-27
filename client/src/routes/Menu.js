import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Box,
  Card,
  CardActions,
  CardMedia,
  Typography,
  CardContent,
  Container,
  Button,
  Grid,
  Alert,
  Skeleton,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FoodDialog from "../components/FoodDialog";
import MenuBanner from "../components/MenuBanner";
import { base } from "../util.js";

const QUERY_ALL_FAST_FOOD = gql`
  query GetAllFastFoods {
    fastFoods {
      id
      name
      image
      price
      description
    }
  }
`;

const GET_FAST_FOOD = gql`
  query GetFastFood($name: String!) {
    fastFood(name: $name) {
      id
      name
      image
      price
      description
    }
  }
`;

function Menu({ isAuthenticated, foodAdded }) {
  const { loginWithRedirect } = useAuth0();

  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [foodSearched, setFoodSearched] = useState("");

  // Query
  const { data, loading, error, refetch } = useQuery(QUERY_ALL_FAST_FOOD);
  const [searchFood, { data: searchedFood }] = useLazyQuery(GET_FAST_FOOD);

  useEffect(() => {
    foodAdded && refetch();
  }, [foodAdded]);

  const handleClose = () => {
    setOpen(false);
  };

  const addOrder = (id) => {
    const payload = data?.fastFoods.filter(
      (food) => Number(food.id) === id + 1
    );

    if (!isAuthenticated) {
      loginWithRedirect();
      return;
    }

    if (error) {
      console.log(error);
    }

    base("orders").create(
      [
        {
          fields: payload[0],
        },
      ],
      function (err, records) {
        if (err) {
          console.error(err);
          return;
        }
        setSuccess(true);
      }
    );
  };

  return (
    <>
      <MenuBanner
        setOpen={setOpen}
        searchFood={searchFood}
        setFoodSearched={setFoodSearched}
        foodSearched={foodSearched}
      />
      <Box sx={{ my: "4rem" }}>
        <Container sx={{ mx: { sm: "auto", md: "auto" }, width: "100%" }}>
          <Grid container spacing={4}>
            {data?.fastFoods.map((data, i) => (
              <Grid key={i} item sx={{ width: { sm: "100%", md: "350px" } }}>
                <Card sx={{ maxWidth: 345, margin: "0 auto" }}>
                  <CardMedia
                    component='img'
                    height='140'
                    image={
                      loading ? (
                        <Skeleton
                          animation='wave'
                          variant='circular'
                          width='100%'
                          height={140}
                        />
                      ) : (
                        data.image
                      )
                    }
                    alt='green iguana'
                  />
                  <CardContent>
                    {data.length === 0 ? (
                      <>
                        <Skeleton
                          animation='wave'
                          height={10}
                          style={{ marginBottom: 6 }}
                        />
                        <Skeleton animation='wave' height={10} width='80%' />
                        <Skeleton animation='wave' height={10} width='80%' />
                        <Skeleton animation='wave' height={10} width='10%' />
                      </>
                    ) : (
                      <>
                        <Typography gutterBottom variant='h5' component='p'>
                          {data.name}
                        </Typography>
                        <Typography
                          gutterBottom
                          variant='body2'
                          color='text.secondary'
                        >
                          {data.description}
                        </Typography>
                        <Typography variant='h5'>${data.price}</Typography>
                      </>
                    )}
                  </CardContent>
                  <CardActions>
                    <Button onClick={() => addOrder(i)} size='small'>
                      Order
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>Searched Result</DialogTitle>
          <DialogContent>
            <FoodDialog fastFood={searchedFood?.fastFood} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}

export default Menu;
