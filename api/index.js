const express = require("express");
const app = express();
app.use(express.json());
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
app.use(cors());
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const authRoute = require("../api/routes/authRoute");
const postRoute = require("../api/routes/postRoute");
const userRoute = require("../api/routes/userRoute");
const jobPostRoute = require("../api/routes/jobPostRoute");

//app.use(express.urlencoded());

dotenv.config();

mongoose
  .connect(process.env.MONGO_URl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log("fail", err);
  });

app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use(cors());

app.use(helmet());
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    res.status(200).json("file uploaded successfully");
  } catch (err) {
    res.status(400).json(err);
  }
});

app.use("/api/", authRoute);
app.use("/api/", postRoute);
app.use("/api/", userRoute);
app.use("/api/", jobPostRoute);

app.listen(process.env.PORT, () => {
  console.log("server running");
});
