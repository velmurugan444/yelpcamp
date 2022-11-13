import React, { useState, useEffect } from "react";
import { Box, Divider, Rating, Typography } from "@mui/material";
import { Stack } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import axios from "axios";

const Addcomment = props => {
  const [comment, setcomment] = useState("");
  const [commentstate, setcommentstate] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/checkusercampgroundcomment/", {
        params: {
          campground: props.campground,
          email: localStorage.getItem("email")
        }
      })
      .then(response => {
        console.log(response.data.length);
        if (response.data.length == 0) {
          setcommentstate(true);
        }
        console.log(response.data);
      });
  }, []);
  const handleSubmit = e => {
    e.preventDefault();
    if (comment === "") {
      alert("Please enter Comment !");
    } else {
      axios
        .post("http://localhost:3001/addcomment", {
          campground: props.campground,
          comment: comment,
          email: localStorage.getItem("email"),
          name: localStorage.getItem("name"),
          dateandtime: new Date().toLocaleString().replace(",", "")
        })
        .then(res => {
          if (res.data == "Comment Added Successfully") {
            window.location.reload(true);
          }
        });
    }
  };
  return (
    <Box>
      {commentstate
        ? <Box mt={2} sx={{ maxWidth: { lg: "50%" } }}>
            <Stack spacing={3}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Avatar src="/broken-image.jpg" />
                <Typography variant="h6" mt={1} fontWeight={600}>
                  {localStorage.getItem("name")}
                </Typography>
              </Stack>
              <Stack direction="column" mt={1} spacing={2}>
                <TextField
                  placeholder="Share Your Thoughts"
                  value={comment}
                  onChange={e => setcomment(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Stack>
            </Stack>
            <Divider variant="middle" sx={{ marginY: "1.5rem" }} />
          </Box>
        : ""}
    </Box>
  );
};

export default Addcomment;
