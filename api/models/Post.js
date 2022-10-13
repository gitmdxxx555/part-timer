const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    ownerPic: {
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
    likes: {
      type: Array,
      default: [],
      createdAt: Date.now(),
    },
    comments: [
      {
        postId:{
          type:String,
          required:true
        },
        userId: {
          type: String,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
        commenterPic:{
          type:String,
          default:""
        },
        commenterName:{
          type:String,
          default:""
        },

        commentLikes: {
          type: Array,
          default: [],
        },
        createdAt:{
          type:Date,
          default:Date.now()
        },
      },

    ],
    replay: [
      {
        commentinguserId: {
          type: String,
          required: true,
        },
        commentinguserName: {
          type: String,
          required: true,
        },
        commentinguserPic: {
          type: String,
          required: true,
        },
        commentOwnerId:{
          type: String,
          required: true,
        },
        commentOwnerName:{
          type: String,
          required: true,
        },
        commentId: {
          type: String,
          required: true,
        },
        replayComment: {
          type: String,
          required: true,
        },
        replayCommentLikes: {
          type: Array,
          default: [],
        },
      },
      { timestamps: true },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
