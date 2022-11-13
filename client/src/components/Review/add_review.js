import React, { useState, useEffect } from "react";
import { Box, Divider, Rating, Typography } from "@mui/material";
import { Stack } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import axios from "axios";

const Addreview = props => {
  const [rating, setrating] = useState(0);
  const [review, setreview] = useState("");
  const [reviewstate, setreviewstate] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/checkusercampgroundreview/", {
        params: {
          campground: props.campground,
          email: localStorage.getItem("email")
        }
      })
      .then(response => {
        console.log(response.data.length);
        if (response.data.length == 0) {
          setreviewstate(true);
        }
        console.log(response.data);
      });
  }, []);
  const handleSubmit = e => {
    e.preventDefault();
    if (rating === "" || review === "") {
      alert("Please enter rating !");
    } else {
      axios
        .post("http://localhost:3001/addreview", {
          campground: props.campground,
          rating: rating,
          review: review,
          email: localStorage.getItem("email"),
          name: localStorage.getItem("name"),
          dateandtime: new Date().toLocaleString().replace(",", "")
        })
        .then(res => {
          if (res.data == "Review Added Successfully") {
            window.location.reload(true);
          }
        });
    }
  };
  return (
    <Box>
      {reviewstate
        ? <Box mt={2} sx={{ maxWidth: { lg: "50%" } }}>
            <Stack spacing={3}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Avatar src="/broken-image.jpg" />
                <Typography variant="h6" mt={1} fontWeight={600}>
                  {localStorage.getItem("name")}
                </Typography>
              </Stack>
              <Stack direction="column" mt={1} spacing={2}>
                <Rating
                  name="read-only"
                  value={rating}
                  onChange={e => setrating(e.target.value)}
                  size="large"
                />
                <TextField
                  placeholder="Give Your Review"
                  value={review}
                  onChange={e => setreview(e.target.value)}
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

export default Addreview;
