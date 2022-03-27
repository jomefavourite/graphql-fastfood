import { gql, useMutation } from "@apollo/client";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CREATE_FAST_FOOD_MUTATION = gql`
  mutation CreateFastFood($input: CreateFastFood!) {
    createFastFood(input: $input) {
      name
      id
    }
  }
`;

function AddFood({ setFoodAdded }) {
  const [foodData, setFoodData] = useState({});
  const [createFastFood] = useMutation(CREATE_FAST_FOOD_MUTATION);

  const handleUserInput = (e) => {
    const value = e.target.value;
    setFoodData({
      ...foodData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (variables) => {
    console.log(foodData);
    if (
      Object.keys(foodData).length === 0 ||
      foodData.name === "" ||
      undefined ||
      foodData.description === "" ||
      undefined ||
      foodData.image === "" ||
      undefined ||
      foodData.price === "" ||
      undefined
    ) {
      toast.error("Some Inputs aren't filled", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    const payload = {
      ...foodData,
      price: Number(foodData.price),
    };

    variables.variables.input = payload;

    createFastFood(variables);

    toast.success("Food added to Menu", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    setFoodData({});

    setFoodAdded(true);
  };

  return (
    <Container>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Typography
        component='h1'
        sx={{
          textAlign: "center",
          fontWeight: "600",
          maxWidth: "400px",
          margin: "0 auto",
        }}
      >
        Add some fast food data here and it will get added to the Menu
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <FormControl
          sx={{
            display: "block",
            marginTop: "10px",
            mx: "auto",
            width: "100%",
            maxWidth: "500px",
          }}
        >
          <InputLabel htmlFor='component-outlined'>Name</InputLabel>
          <OutlinedInput
            sx={{ width: "100%", maxWidth: "500px", margin: "0 auto" }}
            id='component-outlined'
            onChange={(e) => handleUserInput(e)}
            label='Name'
            name='name'
          />
        </FormControl>
        <FormControl
          sx={{
            display: "block",
            marginTop: "10px",
            mx: "auto",
            width: "100%",
            maxWidth: "500px",
          }}
        >
          <InputLabel htmlFor='component-outlined'>Price</InputLabel>
          <OutlinedInput
            sx={{ width: "100%", maxWidth: "500px", margin: "0 auto" }}
            id='component-outlined'
            onChange={(e) => handleUserInput(e)}
            label='Price'
            name='price'
          />
        </FormControl>
        <FormControl
          sx={{
            display: "block",
            marginTop: "10px",
            mx: "auto",
            width: "100%",
            maxWidth: "500px",
          }}
        >
          <InputLabel htmlFor='component-outlined'>Description</InputLabel>
          <OutlinedInput
            sx={{ width: "100%", maxWidth: "500px", margin: "0 auto" }}
            id='component-outlined'
            onChange={(e) => handleUserInput(e)}
            label='Description'
            name='description'
          />
        </FormControl>
        <FormControl
          sx={{
            display: "block",
            marginTop: "10px",
            mx: "auto",
            width: "100%",
            maxWidth: "500px",
          }}
        >
          <InputLabel htmlFor='component-outlined'>Image Url</InputLabel>
          <OutlinedInput
            sx={{ width: "100%", maxWidth: "500px", margin: "0 auto" }}
            id='component-outlined'
            onChange={(e) => handleUserInput(e)}
            label='Image Url'
            name='image'
          />
        </FormControl>

        <Button
          variant='contained'
          onClick={() => handleSubmit({ variables: { input: {} } })}
          sx={{
            width: "100%",
            maxWidth: "500px",
            margin: "10px auto 0",
            padding: ".5rem",
          }}
        >
          Add Food
        </Button>
      </Box>
    </Container>
  );
}

export default AddFood;
