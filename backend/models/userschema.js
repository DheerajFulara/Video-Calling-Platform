  const mongoose = require("mongoose");

let userdata = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },

    Phoneno: {
      type: String,
      required: true,
    },

    Email: {
      type: String,
      required: true,
    },
    
    Category: {
      type: String,
    },

    Password: {
      type: String,
      required: true,
    },

    Friendslist: {
      type: Array,
      required: true,
    },
  }
);

module.exports = mongoose.model("USERDATA", userdata);




