const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//register
router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      profilePic: req.body.profilePic,
    });

    const user = await newUser.save();

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json("err");
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json("user not fount");
    }

    validPassword = await bcrypt.compare(req.body.password, user.password);

    !validPassword && res.status(401).json("wrong password");

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SEC,
      {
        expiresIn: "3d",
      }
    );
    const { password, ...others } = user._doc;

    res.status(200).json({ ...others, token });
  } catch (err) {
    res.status(500).json("err");
  }
});

//singleUser
router.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});

//allUsers
router.get("/allusers", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json(err);
  }
});

//editProfile
router.put("/edit-profile/:id", async (req, res) => {
  if (req.body.password) {
    await bcrypt.hash(req.body.password, 10);
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
