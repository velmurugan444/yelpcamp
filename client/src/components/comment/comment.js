import { Box, Button, Divider, Rating, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import { Stack } from "@mui/material";
import axios from "axios";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};

const Comment = props => {
  const [data, setdata] = useState([]);
  const [modalstate, setmodalstate] = useState(false);
  const [comment, setcomment] = useState("");
  const handleClose = () => setmodalstate(false);

  console.log(props.campground);
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/viewcampgroundcomment/", {
        params: {
          campground: props.campground
        }
      })
      .then(response => {
        setdata(response.data);
      });
  }, []);

  return (
    <Box>
      <Typography variant="h6" sx={{ textAlign: "left" }}>
        Comments :
      </Typography>
      {data.map(e => {
        return (
          <Box mt={2} sx={{ maxWidth: { lg: "50%" } }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar src="/broken-image.jpg" />
              <Typography variant="h6" mt={1} fontWeight={600}>
                {e.name}
              </Typography>
              <Typography variant="body2" mt={1}>
                {e.dateandtime}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              mt={1}
              sx={{ justifyContent: "space-between" }}
            >
              <Typography variant="body2" mt={1} sx={{ textAlign: "left" }}>
                {e.comment}
              </Typography>
              {localStorage.getItem("email") == e.email
                ? <Stack direction="row" spacing={1}>
                    <Button
                      variant="outlined"
                      color="primary"
                      sx={{ color: "gold" }}
                      onClick={() => setmodalstate(true)}
                    >
                      Edit
                    </Button>
                    {modalstate
                      ? <Modal
                          open={modalstate}
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Stack sx={style} spacing={4}>
                            <Typography
                              id="modal-modal-title"
                              variant="h6"
                              component="h2"
                            >
                              {e.campground}
                            </Typography>
                            <TextField
                              fullWidth
                              label="Description"
                              id="fullWidth"
                              value={comment}
                              onChange={e => setcomment(e.target.value)}
                            />
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => {
                                axios
                                  .put("http://localhost:3001/updatecomment", {
                                    email: localStorage.getItem("email"),
                                    campground: e.campground,
                                    comment: comment
                                  })
                                  .then(res => {
                                    if (res.data == "Updated") {
                                      window.location.reload(true);
                                    }
                                  });
                              }}
                            >
                              Update
                            </Button>
                          </Stack>
                        </Modal>
                      : ""}
                    <Button
                      variant="outlined"
                      color="primary"
                      sx={{ color: "red" }}
                      onClick={() => {
                        axios
                          .delete(
                            "http://localhost:3001/deletecampgroundcomment",
                            {
                              params: {
                                campground: e.campground,
                                email: e.email
                              }
                            }
                          )
                          .then(res => {
                            if (res.data == "Deleted")
                              window.location.reload(true);
                          });
                      }}
                    >
                      Delete
                    </Button>
                  </Stack>
                : ""}
            </Stack>

            <Divider variant="middle" sx={{ marginY: "1.5rem" }} />
          </Box>
        );
      })}
    </Box>
  );
};

export default Comment;
