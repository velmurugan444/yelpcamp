const mongoose = require("mongoose");

const reviewData = new mongoose.Schema({
  campground: {
    type: String,
    required: true
  },
  rating: {
    type: String,
    required: true
  },
  review: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  dateandtime: {
    type: String,
    required: true
  }
});
//userdetail is the modelname.using these userdetail we can able to create,read,update,delete datas in userdetails collection
const reviewmodel = mongoose.model("reviews", reviewData);

module.exports = reviewmodel;
