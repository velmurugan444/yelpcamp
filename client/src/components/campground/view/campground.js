import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Campground = props => {
  const [data, setdata] = useState([]);
  const navigate = useNavigate();
  console.log(props.searchtext);
  useEffect(() => {
    axios.get("http://localhost:3001/api/viewcampground/").then(response => {
      setdata(response.data);
    });
  }, []);

  return (
    <Container sx={{ mt: 5 }} disableGutters>
      <Box
        sx={{ margin: "0px 10px 0px 0px", display: "flex", flexWrap: "wrap" }}
      >
        {data
          .filter(val => {
            if (props.searchtext == "") {
              return val;
            } else if (
              val.name.toLowerCase().includes(props.searchtext.toLowerCase()) ||
              val.name.toLowerCase().includes(props.searchtext.toUpperCase())
            ) {
              return val;
            }
          })
          .map(e => {
            return (
              <Card
                sx={{ maxWidth: 245, margin: "10px" }}
                onClick={() => {
                  if (localStorage.getItem("email")) {
                    navigate("/campgrounddetails", {
                      state: {
                        imageurl: e.imageurl,
                        name: e.name,
                        description: e.description,
                        price: e.price,
                        username: e.username,
                        dateandtime: e.dateandtime
                      }
                    });
                  } else {
                    navigate("/login");
                  }
                }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={e.imageurl}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {e.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {e.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                {/* <CardActions>
                  <Button size="small" color="primary">
                    Share
                  </Button>
                </CardActions> */}
              </Card>
            );
          })}
      </Box>
    </Container>
  );
};
