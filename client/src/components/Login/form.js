import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeappBar from "../Navbar/Home";
import axios from "axios";

const Form = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = e => {
    e.preventDefault();
    if (email === "" || password === "") {
      alert("please enter email and password");
    } else {
      axios
        .get("http://localhost:3001/api/login/", {
          params: {
            email: email,
            password: password
          }
        })
        .then(response => {
          try {
            localStorage.setItem("name", response.data[0].name);
            localStorage.setItem("email", response.data[0].email);
            localStorage.setItem("password", response.data[0].password);
            localStorage.setItem("adminid", response.data[0].adminid);
            navigate("/");
          } catch (err) {
            alert("Please enter valid credentials");
          }
        });
    }
  };
  return (
    <Box>
      <HomeappBar />
      <Container>
        <Stack sx={{ mt: 5 }} spacing={4}>
          <Typography variant="h5">LOGIN HERE</Typography>
          <TextField
            fullWidth
            label="Email"
            id="fullWidth"
            value={email}
            onChange={e => setemail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            id="fullWidth"
            value={password}
            onChange={e => setpassword(e.target.value)}
          />
          <Button variant="contained" onClick={handleSubmit}>
            Login
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default Form;
