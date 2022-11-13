import { Button, Container, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import HomeappBar from "../Navbar/Home";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <HomeappBar />
      <Container sx={{ mt: 10 }} maxWidth="50%">
        <Stack spacing={3}>
          <Typography variant="h3">Yelp Camp</Typography>
          <Typography variant="h6">
            Discover Campgrounds from around the world.
          </Typography>
          <Stack
            spacing={2}
            direction={{ lg: "row", md: "row", xs: "column" }}
            sx={{
              justifyContent: "center",
              display: "flex",
              flexWrap: "wrap"
            }}
          >
            <Button
              variant="outlined"
              startIcon={<AddCircleIcon />}
              sx={{ borderRadius: "17px" }}
              onClick={() => {
                if (localStorage.getItem("email")) {
                  navigate("/addcampground");
                } else {
                  navigate("/login");
                }
              }}
            >
              New Campground
            </Button>
            <Button
              variant="contained"
              sx={{ borderRadius: "17px" }}
              onClick={() => navigate("/viewcampground")}
            >
              View All Campgrounds
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};
