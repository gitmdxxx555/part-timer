const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

//create Post
router.post("/createpost", async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();

    res.status(200).json("New Post created Successfully");
  } catch (err) {
    res.status(500).json(err);
  }
});

//getposts
router.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find();

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

//postsbyusername
router.get("/profileposts/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const posts = await Post.find({ userId: user._id });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

//likeuserpost
router.put("/like-unlike/:id", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const post = await Post.findById(req.params.id);
      // const postOwnerId = post.userId
      //  const currentUser = await User.findById(req.body.userId);
      if (!post.likes.includes(req.body.userId)) {
        await post.updateOne({ $push: { likes: req.body.userId } });
        res.status(200).json("user has been liked");
      } else {
        await post.updateOne({ $pull: { likes: req.body.userId } });
        res.status(200).json("user has been unlike");
      }
    } catch (err) {
      res.status(500).json("failed");
    }
  } else {
    res.status(400).json("you cant like or unlike yourself");
  }
});

//getAllLikedUsers
router.get("/likedusers/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const likedUsers = await Promise.all(
      post.likes.map((userId) => {
        return User.findById(userId);
      })
    );

    res.status(200).json(likedUsers);
  } catch (err) {
    res.status(500).json(err);
  }
});

//postcomment
router.post("/comment", async (req, res) => {
  const { postId, userId, comment, commenterPic, commenterName } = req.body;
  try {
    const newComment = {
      postId,
      userId,
      comment,
      commenterPic,
      commenterName,
    };

    const post = await Post.findById(postId);

    post.comments.push(newComment);
    await post.save();
    res.status(200).json("comment success");
  } catch (err) {
    res.status(500).json(err);
  }
});
//replaycomment
router.post("/replaycomment", async (req, res) => {
  const {
    commentinguserId,
    commentinguserName,
    commentinguserPic,
    commentOwnerId,
    commentOwnerName,
    commentId,
    replayComment,
    replayCommentLikes,
  } = req.body;
  try {
    const newReplay = {
      commentinguserId,
      commentinguserName,
      commentinguserPic,
      commentOwnerId,
      commentOwnerName,
      commentId,
      replayComment,
      replayCommentLikes,
    };

    const post = await Post.findById(postId);
    const foundComment = post.comments.findById(commentId);

    foundComment.comment.push(newReplay);
    await post.save();
    res.status(200).json("replay success");
  } catch (err) {
    res.status(500).json(err);
  }
});

//getComments
router.get("/comments/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    const allcomments = post.comments;
    res.status(200).json(allcomments);
  } catch (err) {
    res.status(500).json(err);
  }
});
//getComments
router.get("/singlepost/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
