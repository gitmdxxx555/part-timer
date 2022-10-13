const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
const JobPost = require("../models/JobPost");

router.post("/jobpost", async (req, res) => {
  try {
    const newJobPost = new JobPost(req.body);

    await newJobPost.save();
    res.status(200).json("jobpost created");
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/getalljobpost", async (req, res) => {
  try {
    const allJobPosts = await JobPost.find()
    res.status(200).json(allJobPosts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
