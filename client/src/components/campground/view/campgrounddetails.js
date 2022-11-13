import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Container } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import HomeappBar from "../../Navbar/Home";
import Review from "../../Review/review";
import Addreview from "../../Review/add_review";
import Addcomment from "../../comment/add_comment";
import Comment from "../../comment/comment";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import MapIcon from "@mui/icons-material/Map";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
// import "../../../css/map.css";

const Campgrounddetails = () => {
  const location = useLocation();
  const imageurl = location.state.imageurl;
  const price = location.state.price;
  const name = location.state.name;
  const description = location.state.description;
  const username = location.state.username;
  const dateandtime = location.state.dateandtime;

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
