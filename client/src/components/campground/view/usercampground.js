import { Typography } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import axios from "axios";
import HomeappBar from "../../Navbar/Home";

const Usercampground = () => {
  const username = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const [data, setdata] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/usercampground/", {
        params: {
          email: email
        }
      })
      .then(response => {
        setdata(response.data);
      });
  }, []);

  return (
    <Box>
      <HomeappBar />
      <Container>
        <Stack direction="column" spacing={4} sx={{ mt: 3 }}>
          <Box sx={{ backgroundColor: "aliceblue", p: 5 }}>
            <Typography variant="h4">
              {username}
            </Typography>
          </Box>
          <Box sx={{ backgroundColor: "aliceblue", p: 5 }}>
            <Stack spacing={3} direction="column">
              <Typography variant="h6">
                {username} campgrounds:
              </Typography>

              {data.map(e => {
                return (
                  <Typography variant="h6">
                    {e.name}
                  </Typography>
                );
              })}
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Usercampground;
