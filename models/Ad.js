const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdSchema = new Schema({
  auth_status: {
    type: String,
    default: ""
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  aditionalFeedback: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      text: {
        type: String,
        required: true,
      },
      firstname: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  isRatedBack: {
    type: Boolean,
    default: false
  },
  userRating: {
    type: String,
    default: 0
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: [{
    type: String,
    required: false,
  }],
  address: {
    type: String,
    required: true,
  },
  minbid: {
    type: String,
    required: true,
  },
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: false,
  },

  closebid: {
    type: Boolean,
    default: false,
  },


  ispayment: {
    type: Boolean,
    default: false
  },

  payment: {
    type: String
  },
  account: {
    type: String
  },
  accountid: {
    type: String
  },
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      text: {
        type: String,
        required: true,
      },
      firstname: {
        type: String,
      },
      rating: {
        type: String
      },

      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  bids: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      userRating: {
        type: String,
        default: 0
      },
      price: {
        type: String,
        required: true,
      },
      firstname: {
        type: String,
      },

      status: {
        type: Boolean,
        default: false,
      },

      //   avatar: {
      //     type: String
      //   },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: Boolean,
    default: false,
  },
  issued_to: {
    type: String,
    required: false,
  },
  issued_price: {
    type: String,
    required: false,
  },
});

module.exports = Ad = mongoose.model("ad", AdSchema);
