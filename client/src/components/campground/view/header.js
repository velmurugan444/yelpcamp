import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import HomeappBar from "../../Navbar/Home";
import { useNavigate } from "react-router-dom";
import { Campground } from "./campground";

export const Header = () => {
  const [searchtext, setsearchtext] = useState("");
  const navigate = useNavigate();
  return (
    <Box>
      <HomeappBar />
      <Container
        sx={{
          mt: 5,
          backgroundColor: "aliceblue",
          textAlign: "left",
          p: { lg: 10, xs: 5 }
        }}
      >
        <Stack spacing={3}>
          <Typography variant="h3">Welcome to Yelp Camp</Typography>
          <Typography variant="h6">
            Upload your favourite campgrounds, rate the ones you've visited, and
            engage the community with comments, Click on each campground photo
            to learn more. Happy camping!
          </Typography>
          <Stack
            spacing={2}
            direction={{ lg: "row", md: "row", xs: "column" }}
            sx={{ display: "flex", flexWrap: "wrap" }}
          >
            <Button
              variant="outlined"
              startIcon={<AddCircleIcon />}
              sx={{ borderRadius: "5px" }}
              onClick={() => {
                if (localStorage.getItem("email")) {
                  navigate("/addcampground");
                } else {
                  navigate("/login");
                }
              }}
            >
              Campground
            </Button>
            <TextField
              size="small"
              label="Search"
              id="fullWidth"
              value={searchtext}
              onChange={e => setsearchtext(e.target.value)}
            />
          </Stack>
        </Stack>
      </Container>
      <Campground searchtext={searchtext} />
    </Box>
  );
};
