const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      default: "",
    },
    profilePic: {
      type: String,
      default: "",
    },
    coverPic: {
      type: String,
      default: "",
    },
    MobileNum: {
      type: Number,
      unique: true,
      default: null,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        userId: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        userPic: {
          type: String,
          default: "",
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
    facebook: {
      type: String,
      unique: true,
      default: "",
    },
    whatsApp: {
      type: String,
      unique: true,
      default: "",
    },
    twitter: {
      type: String,
      twitter: true,
      default: "",
    },
    instagram: {
      type: String,
      unique: true,
      default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    skills: {
      type: Array,
      default: "",
    },
    studiedAt: {
      type: String,
      default: "",
    },
    livesIn: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
