const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors())

const mongoose = require("mongoose");
const options = {
  keepAlive: true,
  connectTimeoutMS: 10000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const dbUrl = ``;

mongoose.connect(dbUrl, options, (err) => {
  if (err) console.log(err);
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Mongo DB Connected successfully");
});

const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    postID: { type: String, required: true },
    name: { type: String, required: true },
    time: Date,
    post: String,
    comments: Number,
    supports: Number,
    postType: Boolean,
    relevantKeywords: Set,
    relevantPictures: { data: Buffer, contentType: String },
  },
  { timestamps: true }
);

const userSchema = new Schema(
  {
    userID: String,
    savedPosts: [postSchema],
    posts: [postSchema],
    password: String,
  }
);

const postModel = mongoose.model("post", postSchema);
const userModel = mongoose.model("user", userSchema);

app.get('/', async (req, res) => {
  try {
    const posts = await postModel.find().sort({ _id: -1 });
    res.status(200).json({
      status: 200,
      data: posts,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

app.get('/users/:userID', async (req, res) => {
  try {
    const { userID } = req.params;
    const user = await userModel.find({ userID });
    res.status(200).json({
      status: 200,
      data: user.posts,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

app.post('/user/signup', async (req, res) => {
  try {
    const { userID, password } = req.body;
    const user = await userModel.create({ userID, password });
    res.status(200).json({
      status: 200,
      data: user,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

app.post('/share', async (req, res) => {
  try {
    const newPost = new postModel(req.body);
    if (req.body.name !== "Anonymous") {
      const savedPost = await newPost.save();
    };
    res.status(200).json({
      status: 200,
      data: savedPost,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

app.delete("/user/post/:postID", async (req, res) => {
  try {
    const { postID } = req.params;
    const post = await postModel.findByIdAndRemove(postID);
    if (post) {
      res.status(200).json({
        status: 200,
        message: "Post deconsted successfully",
      });
    } else {
      res.status(400).json({
        status: 400,
        message: "No post found",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

app.delete("/users/:userID/saved/:savedID", async (req, res) => {
  try {
    const { userD, savedID } = req.params;
    const user = await postModel.findById(userID);
    user.savedPosts.pull(savedID);
    if (saved) {
      res.status(200).json({
        status: 200,
        message: "Post deconsted successfully",
      });
    } else {
      res.status(400).json({
        status: 400,
        message: "No post found",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

app.listen(3001);