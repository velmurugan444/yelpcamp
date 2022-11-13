import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HomeappBar from "../../Navbar/Home";

const Addcampground = () => {
  const [name, setname] = useState("");
  const [location, setlocation] = useState("");
  const [price, setprice] = useState("");
  const [imageurl, setimageurl] = useState("");
  const [description, setdescription] = useState("");
  const navigate = useNavigate();
  const handleSubmit = e => {
    e.preventDefault();
    if (
      name === "" ||
      location === "" ||
      price === "" ||
      imageurl === "" ||
      description === ""
    ) {
      alert("please fill all fields");
    } else {
      axios
        .post("http://localhost:3001/addcampground", {
          name: name,
          location: location,
          price: price,
          imageurl: imageurl,
          description: description,
          username: localStorage.getItem("name"),
          dateandtime: new Date().toLocaleString().replace(",", ""),
          email: localStorage.getItem("email")
        })
        .then(res => {
          console.log(res.data);
          if (res.data == "Campground Added Successfully") {
            alert("Campground Added Successfully");
          }
          setname("");
          setlocation("");
          setprice("");
          setimageurl("");
          setdescription("");
          navigate("/viewcampground");
        });
    }
  };
  return (
    <Box>
      <HomeappBar />
      <Container>
        <Stack sx={{ mt: 5 }} spacing={4}>
          <Typography variant="h5">ADD CAMPGROUND</Typography>

          <TextField
            fullWidth
            label="Name"
            id="fullWidth"
            value={name}
            onChange={e => setname(e.target.value)}
          />
          <TextField
            fullWidth
            label="Location"
            id="fullWidth"
            value={location}
            onChange={e => setlocation(e.target.value)}
          />
          <TextField
            fullWidth
            label="Price"
            id="fullWidth"
            value={price}
            onChange={e => setprice(e.target.value)}
          />
          <TextField
            fullWidth
            label="Image Url"
            id="fullWidth"
            value={imageurl}
            onChange={e => setimageurl(e.target.value)}
          />
          <TextField
            fullWidth
            label="Description"
            id="fullWidth"
            value={description}
            onChange={e => setdescription(e.target.value)}
          />
          <Button variant="contained" onClick={handleSubmit}>
            Save
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default Addcampground;
