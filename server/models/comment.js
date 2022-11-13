const mongoose = require("mongoose");

const commentData = new mongoose.Schema({
  campground: {
    type: String,
    required: true
  },
  comment: {
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
const commentmodel = mongoose.model("comments", commentData);

module.exports = commentmodel;
