const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

//userReview
router.put("/review/:id", async (req, res) => {
  const { userId, rating, comment, name, userPic } = req.body;
  const review = {
    userId,
    name,
    userPic,
    rating,
    comment,
  };
  if (req.params.id === userId) {
    return res.status(400).json("you cant");
  }
  try {
    const user = await User.findById(req.params.id);

    const isReviewed = user.reviews.find((rev) => rev.userId === userId);

    if (isReviewed) {
      user.reviews.forEach((rev) => {
        if (rev.userId === userId) {
          (rev.rating = rating), (rev.comment = comment);
        }
      });
    } else {
      user.reviews.push(review);
      user.numOfReviews = user.reviews.length;
    }

    let avg = 0;

    user.reviews.forEach((rev) => {
      avg += rev.rating;
    });

    user.ratings = avg / user.reviews.length;

    await user.save();

    res.status(200).json("review success");
  } catch (err) {
    res.status(500).json(err);
  }
});

//allReviews
router.get("/getreviews/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const reviews = user.reviews;
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json(err);
  }
});

//updateProfilePic
router.put("/updateprofilepic/:userId", async (req, res) => {
  const { profilePic } = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.params.userId);
    if (user.profilePic === "") {
      user.profilePic = profilePic;
    } else {
      user.profilePic = profilePic;
    }

    await user.save();

    res.status(200).json("success");
  } catch (err) {
    res.status(500).json("failed");
  }
});
//updateCoverPic
router.put("/updatecoverpic/:userId", async (req, res) => {
  const { coverPic } = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.params.userId);
    if (user.coverPic === "") {
      user.coverPic = coverPic;
    } else {
      user.coverPic = coverPic;
    }

    await user.save();

    res.status(200).json("success");
  } catch (err) {
    res.status(500).json("failed");
  }
});
//followuser
router.put("/follow-unfollow/:id", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!currentUser.followings.includes(req.params.id)) {
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        await user.updateOne({ $push: { followers: req.body.userId } });
        res.status(200).json("user has been followed");
      } else {
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        await user.updateOne({ $pull: { followers: req.body.userId } });
        res.status(200).json("user has been unfollowed");
      }
    } catch (err) {
      res.status(500).json("failed");
    }
  } else {
    res.status(400).json("you cant follow yourself");
  }
});

//getUser
router.get("/getuser/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});
//followingUsers
router.get("/getfollowingusers/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const followingUsers = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(friendId);
      })
    );

    res.status(200).json(followingUsers);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
