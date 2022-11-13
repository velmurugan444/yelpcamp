import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeappBar from "../Navbar/Home";
import axios from "axios";

const Form = () => {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [admincode, setadmincode] = useState("");
  const navigate = useNavigate();
  const handleSubmit = e => {
    e.preventDefault();
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      admincode === ""
    ) {
      alert("please fill all fields");
    } else {
      axios
        .post("http://localhost:3001/createaccount", {
          username: username,
          email: email,
          password: password,
          admincode: admincode
        })
        .then(res => {
          console.log(res.data);
          if (res.data == "Account Created Successfully") {
            alert("Account Created Successfully");
          }
          setusername("");
          setemail("");
          setpassword("");
          setadmincode("");
          navigate("/login");
        });
    }
  };
  return (
    <Box>
      <HomeappBar />
      <Container>
        <Stack sx={{ mt: 5 }} spacing={4}>
          <Typography variant="h5">CREATE ACCOUNT</Typography>

          <TextField
            fullWidth
            label="Username"
            id="fullWidth"
            value={username}
            onChange={e => setusername(e.target.value)}
          />
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
          <TextField
            fullWidth
            label="Admin Code"
            id="fullWidth"
            value={admincode}
            onChange={e => setadmincode(e.target.value)}
          />
          <Button variant="contained" onClick={handleSubmit}>
            Sign Up
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default Form;
