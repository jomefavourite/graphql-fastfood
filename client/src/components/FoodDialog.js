import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";

function FoodDialog({ fastFood }) {
  console.log(fastFood);
  return (
    <div>
      {fastFood ? (
        <Card sx={{ maxWidth: 345, margin: "0 auto" }}>
          <CardMedia
            component='img'
            height='140'
            image={fastFood?.image}
            alt='green iguana'
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='p'>
              {fastFood?.name}
            </Typography>
            <Typography gutterBottom variant='body2' color='text.secondary'>
              {fastFood?.description}
            </Typography>
            <Typography variant='h5'>${fastFood?.price}</Typography>
          </CardContent>
        </Card>
      ) : (
        <>
          <img
            src='https://cdni.iconscout.com/illustration/premium/thumb/error-404-4280219-3569476.png'
            alt='Not Found'
          />
          <Typography sx={{ textAlign: "center" }}>Food not found</Typography>
        </>
      )}
    </div>
  );
}

export default FoodDialog;
