import { Avatar, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

function Profile({ user }) {
  return (
    <>
      <Container>
        <Box>
          <Box>
            <Avatar
              src={user?.picture}
              alt={user?.name}
              sx={{ width: 200, height: 200, mx: "auto" }}
            />
          </Box>

          <Box
            sx={[
              {
                textAlign: "center",
                mt: "1rem",
                "& > *": {
                  mt: "2px",
                  fontSize: "1.3rem",
                },
              },
            ]}
          >
            <Typography>{user?.name}</Typography>
            <Typography>Email: {user?.email}</Typography>
            <Typography>Last Login: {user?.updated_at}</Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Profile;
