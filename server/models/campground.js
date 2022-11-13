const mongoose = require("mongoose");

const campgroundData = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },

  imageurl: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  dateandtime: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});
//userdetail is the modelname.using these userdetail we can able to create,read,update,delete datas in userdetails collection
const campground = mongoose.model("campground", campgroundData);

module.exports = campground;
