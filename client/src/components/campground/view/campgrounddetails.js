import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Container } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import HomeappBar from "../../Navbar/Home";
import Review from "../../Review/review";
import Addreview from "../../Review/add_review";
import Addcomment from "../../comment/add_comment";
import Comment from "../../comment/comment";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import MapIcon from "@mui/icons-material/Map";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import { TextField } from "@mui/material";
import Modal from "@mui/material/Modal";
import axios from "axios";
// import "../../../css/map.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};

const Campgrounddetails = () => {
  const location = useLocation();
  const imageurl = location.state.imageurl;
  const price = location.state.price;
  const name = location.state.name;
  const description = location.state.description;
  const username = location.state.username;
  const dateandtime = location.state.dateandtime;
  const [modalstate, setmodalstate] = useState(false);
  const handleClose = () => setmodalstate(false);
  const [campgroundlocation, setcampgroundlocation] = useState("");
  const [campgroundprice, setcampgroundprice] = useState("");
  const [campgroundimageurl, setcampgroundimageurl] = useState("");
  const [campgrounddescription, setcampgrounddescription] = useState("");
  const navigate = useNavigate();

  return (
    <Box>
      <HomeappBar />
      <Container>
        <Stack spacing={3}>
          <Box
            sx={{ display: { lg: "flex" }, justifyContent: "space-between" }}
          >
            <Card sx={{ maxWidth: { lg: "50%" }, margin: "10px" }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={imageurl}
                  alt="green iguana"
                />
                <CardContent>
                  <Stack direction="column" spacing={2}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{ textAlign: "right" }}
                    >
                      ${price}/night
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{ textAlign: "left" }}
                    >
                      {name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ textAlign: "left" }}
                    >
                      {description}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ textAlign: "left" }}
                    >
                      submitted by <Link to="/usercampground">
                        {username}
                      </Link>{" "}
                      on {dateandtime}
                    </Typography>
                    {localStorage.getItem("name") == username
                      ? <Stack
                          direction="row"
                          spacing={2}
                          sx={{ justifyContent: "right" }}
                        >
                          <DeleteIcon
                            onClick={() => {
                              axios
                                .delete(
                                  "http://localhost:3001/deleteusercampground",
                                  {
                                    params: {
                                      campground: name,
                                      username: username
                                    }
                                  }
                                )
                                .then(res => {
                                  if (res.data == "Deleted")
                                    navigate("/viewcampground");
                                });
                            }}
                          />
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
                                    {name}
                                  </Typography>

                                  <TextField
                                    fullWidth
                                    label="Location"
                                    id="fullWidth"
                                    value={campgroundlocation}
                                    onChange={e =>
                                      setcampgroundlocation(e.target.value)}
                                  />
                                  <TextField
                                    fullWidth
                                    label="Price"
                                    id="fullWidth"
                                    value={campgroundprice}
                                    onChange={e =>
                                      setcampgroundprice(e.target.value)}
                                  />
                                  <TextField
                                    fullWidth
                                    label="Image Url"
                                    id="fullWidth"
                                    value={campgroundimageurl}
                                    onChange={e =>
                                      setcampgroundimageurl(e.target.value)}
                                  />
                                  <TextField
                                    fullWidth
                                    label="Description"
                                    id="fullWidth"
                                    value={campgrounddescription}
                                    onChange={e =>
                                      setcampgrounddescription(e.target.value)}
                                  />
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {
                                      axios
                                        .put(
                                          "http://localhost:3001/updatecampground",
                                          {
                                            username: localStorage.getItem(
                                              "name"
                                            ),
                                            campgroundname: name,
                                            campgroundlocation: campgroundlocation,
                                            campgroundprice: campgroundprice,
                                            campgroundimageurl: campgroundimageurl,
                                            campgrounddescription: campgrounddescription,
                                            currentdateandtime: new Date()
                                              .toLocaleString()
                                              .replace(",", "")
                                          }
                                        )
                                        .then(res => {
                                          if (res.data == "Updated") {
                                            navigate("/viewcampground");
                                          }
                                        });
                                    }}
                                  >
                                    Update
                                  </Button>
                                </Stack>
                              </Modal>
                            : ""}
                          <UpdateIcon onClick={() => setmodalstate(true)} />
                        </Stack>
                      : ""}
                  </Stack>
                </CardContent>
              </CardActionArea>
              {/* <CardActions>
                  <Button size="small" color="primary">
                    Share
                  </Button>
                </CardActions> */}
            </Card>
            <Stack spacing={3} sx={{ justifyContent: "center" }}>
              <Box
                className="mapouter"
                sx={{ position: "relative", textAlign: "right" }}
              >
                <Box
                  className="gmap_canvas"
                  sx={{ overflow: "hidden", background: "none" }}
                >
                  <iframe
                    className="gmap_iframe"
                    style={{ width: "100%" }}
                    frameborder="0"
                    scrolling="no"
                    marginheight="0"
                    marginwidth="0"
                    src="https://maps.google.com/maps?width=auto&amp;height=auto&amp;hl=en&amp;q=gujarat&amp;t=&amp;z=8&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                  />
                  <a href="https://formatjson.org/">format json</a>
                </Box>
              </Box>
              <Stack
                sx={{ display: "flex", flexDirection: "column" }}
                spacing={1}
              >
                <Button
                  variant="contained"
                  startIcon={<WbSunnyIcon />}
                  onClick={() => {
                    window.location.href =
                      "https://www.accuweather.com/en/world-weather";
                  }}
                >
                  Weather
                </Button>
                <Button
                  variant="contained"
                  startIcon={<MapIcon />}
                  onClick={() => {
                    window.location.href =
                      "https://ngmdb.usgs.gov/topoview/viewer/#4/39.98/-100.06";
                  }}
                >
                  Topo Map
                </Button>
                <Button
                  variant="contained"
                  startIcon={<HomeWorkIcon />}
                  onClick={() => {
                    window.location.href =
                      "https://www.rei.com/h/camping-and-hiking";
                  }}
                >
                  Gear Up
                </Button>
              </Stack>
            </Stack>
          </Box>
          <Addreview campground={name} />
          <Review campground={name} />

          <Addcomment campground={name} />
          <Comment campground={name} />
        </Stack>
      </Container>
    </Box>
  );
};

export default Campgrounddetails;
