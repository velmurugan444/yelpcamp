const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const signup = require("./models/signup");
const campground = require("./models/campground");
const reviewmodel = require("./models/review");
const commentmodel = require("./models/comment");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(
  "mongodb+srv://Velmurugan:Ajith004@yelpcamp.az7batc.mongodb.net/yelpcamp?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.post("/createaccount", async (req, res) => {
  const name = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const adminid = req.body.admincode;
  console.log(adminid, name, email, password);
  const feedbackdata = new signup({
    name: name,
    email: email,
    password: password,
    adminid: adminid
  });
  try {
    await feedbackdata.save();
    res.send("Account Created Successfully");
  } catch (error) {
    console.log(error);
  }
});

app.post("/addreview", async (req, res) => {
  const campground = req.body.campground;
  const rating = req.body.rating;
  const review = req.body.review;
  const email = req.body.email;
  const name = req.body.name;
  const dateandtime = req.body.dateandtime;
  console.log(campground, rating, review, email, dateandtime);
  const reviewdata = new reviewmodel({
    campground: campground,
    rating: rating,
    review: review,
    email: email,
    name: name,
    dateandtime: dateandtime
  });
  try {
    await reviewdata.save();
    res.send("Review Added Successfully");
  } catch (error) {
    console.log(error);
  }
});

app.post("/addcomment", async (req, res) => {
  const campground = req.body.campground;
  const comment = req.body.comment;
  const email = req.body.email;
  const name = req.body.name;
  const dateandtime = req.body.dateandtime;
  console.log(campground, comment, email, dateandtime);
  const commentdata = new commentmodel({
    campground: campground,
    comment: comment,
    email: email,
    name: name,
    dateandtime: dateandtime
  });
  try {
    await commentdata.save();
    res.send("Comment Added Successfully");
  } catch (error) {
    console.log(error);
  }
});

app.post("/addcampground", async (req, res) => {
  const name = req.body.name;
  const location = req.body.location;
  const price = req.body.price;
  const imageurl = req.body.imageurl;
  const description = req.body.description;
  const username = req.body.username;
  const dateandtime = req.body.dateandtime;
  const email = req.body.email;
  console.log(name, location, price, imageurl, description);
  const campgrounddata = new campground({
    name: name,
    location: location,
    price: price,
    imageurl: imageurl,
    description: description,
    username: username,
    dateandtime: dateandtime,
    email: email
  });
  try {
    await campgrounddata.save();
    res.send("Campground Added Successfully");
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/login/", (req, res) => {
  const email = req.query.email;
  const password = req.query.password;
  console.log(email, password);
  signup.find({ email: email, password: password }, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
    console.log(result);
  });
});

app.get("/api/viewcampground/", (req, res) => {
  campground.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
    console.log(result);
  });
});

app.get("/api/viewcampgroundreview/", (req, res) => {
  const campground = req.query.campground;
  console.log(campground);
  reviewmodel.find({ campground: campground }, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
    console.log(result);
  });
});

app.get("/api/viewcampgroundcomment/", (req, res) => {
  const campground = req.query.campground;
  console.log(campground);
  commentmodel.find({ campground: campground }, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
    console.log(result);
  });
});

app.get("/api/checkusercampgroundreview/", (req, res) => {
  const campground = req.query.campground;
  const email = req.query.email;
  console.log(email);
  reviewmodel.find({ email: email, campground: campground }, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
    console.log(result);
  });
});

app.get("/api/checkusercampgroundcomment/", (req, res) => {
  const campground = req.query.campground;
  const email = req.query.email;
  console.log(email);
  commentmodel.find({ email: email, campground: campground }, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
    console.log(result);
  });
});

app.get("/api/usercampground/", (req, res) => {
  const email = req.query.email;
  console.log(email);
  campground.find({ email: email }, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
    console.log(result);
  });
});

app.delete("/deletecampgroundcomment", async (req, res) => {
  var campground = req.query.campground;
  var email = req.query.email;
  console.log(campground, email);
  await commentmodel.remove({
    campground: campground,
    email: email
  });
  res.send("Deleted");
});

app.delete("/deletecampgroundreview", async (req, res) => {
  var campground = req.query.campground;
  var email = req.query.email;
  console.log(campground, email);
  await reviewmodel.remove({
    campground: campground,
    email: email
  });
  res.send("Deleted");
});

app.delete("/deleteusercampground", async (req, res) => {
  var campgroundname = req.query.campground;
  var username = req.query.username;
  console.log(campgroundname, username);
  await campground.remove({
    name: campgroundname,
    username: username
  });
  res.send("Deleted");
});

app.put("/updatecomment", async (req, res) => {
  var email = req.body.email;
  var campground = req.body.campground;
  var comment = req.body.comment;
  console.log(email, campground, comment);
  try {
    await commentmodel.updateOne(
      { email: email, campground: campground },
      {
        $set: {
          comment: comment
        }
      }
    );
    res.send("Updated");
  } catch (error) {
    console.log(error);
  }
});

app.put("/updatereview", async (req, res) => {
  var email = req.body.email;
  var campground = req.body.campground;
  var review = req.body.review;
  console.log(email, campground, review);
  try {
    await reviewmodel.updateOne(
      { email: email, campground: campground },
      {
        $set: {
          review: review
        }
      }
    );
    res.send("Updated");
  } catch (error) {
    console.log(error);
  }
});

app.put("/updatecampground", async (req, res) => {
  var username = req.body.username;
  var campgroundname = req.body.campgroundname;
  var campgroundlocation = req.body.campgroundlocation;
  var campgroundprice = req.body.campgroundprice;
  var campgroundimageurl = req.body.campgroundimageurl;
  var campgrounddescription = req.body.campgrounddescription;
  var currentdateandtime = req.body.currentdateandtime;
  console.log(
    username,
    campgroundname,
    campgroundlocation,
    campgroundprice,
    campgroundimageurl,
    campgrounddescription,
    currentdateandtime
  );
  try {
    await campground.updateOne(
      { username: username, name: campgroundname },
      {
        $set: {
          location: campgroundlocation,
          price: campgroundprice,
          imageurl: campgroundimageurl,
          description: campgrounddescription,
          dateandtime: currentdateandtime
        }
      }
    );
    res.send("Updated");
  } catch (error) {
    console.log(error);
  }
});

app.listen(3001, () => {
  console.log("running on port 3001");
});
