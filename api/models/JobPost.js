const mongoose = require("mongoose");

const JobPostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    ownerPic: {
      type: String,
      default: "",
    },
    ownerName: {
      type: String,
      default: "",
    },
    desc: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("JobPost", JobPostSchema);
