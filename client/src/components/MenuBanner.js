import { Box, Button, TextField } from "@mui/material";
import React from "react";
import Pizza from "../images/pizza.jpg";

function MenuBanner({ setOpen, searchFood, setFoodSearched, foodSearched }) {
  return (
    <Box
      sx={{
        background: `url(${Pizza})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        width: "100%",
        height: "400px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: { sm: "column", md: "row" },
      }}
    >
      <Box
        sx={{
          background: `#fff`,
          padding: "1rem 2rem",
          borderRadius: "20px",
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();

            setOpen(true);
            searchFood({
              variables: {
                name: foodSearched,
              },
            });
          }}
        >
          <Box sx={{ display: "flex", gap: "10px" }}>
            <TextField
              id='outlined-basic'
              label='Search for a Fast food'
              variant='outlined'
              onChange={(e) => setFoodSearched(e.target.value)}
              sx={{ width: { sm: "100%", md: "500px" } }}
            />
            <Button
              variant='contained'
              sx={{
                width: { sm: "223px", md: "auto" },
                height: "100",
              }}
              type='submit'
              disabled={foodSearched ? false : true}
            >
              Search
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default MenuBanner;
