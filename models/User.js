const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
  status: {
    type: String,
    default: ""
  },

  transactions:{
    type: Array
  },
  balance: {
    type: Number,
    default: 0,
    min: 0,
    max: 999999999
  },
  fname: {
    type: String,
    required: true
  },

  lname: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  mobile: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  city: {
    type: String,
    default: ''
  },

  password: {
    type: String,
    required: true
  },

  date: {
    type: Date,
    default: Date.now
  },

  image: {
    type: String,
    required: false
  },

  role: {
    type: Boolean,
    default: false
  },
  Ratings: {
    type: Array,
  },
  myRating: {
    type: Array
  },
  OverAllRating: {
    type: String,
    default: 0
  },
  verified: {
    type: Boolean
  }
});

module.exports = User = mongoose.model('user', UserSchema);

