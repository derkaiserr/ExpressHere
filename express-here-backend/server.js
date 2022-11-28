const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const mongoose = require("mongoose");
const options = {
  keepAlive: true,
  connectTimeoutMS: 10000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const dbUrl = `mongodb+srv://expressherev01:vkkrd5msvkwN5rYH@cluster0.jac2lby.mongodb.net/?retryWrites=true&w=majority`;

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
    author: { type: String },
    post: String,
    comments: Number,
    supports: Number,
    saves: Number,
    postType: Boolean, // false signifies that the user wants to post anonymously
    relevantKeywords: "", // comma seperated keywords
    relevantPicture: { data: Buffer, contentType: String }, // form data object
  },
  { timestamps: true }
);

const userSchema = new Schema({
  userID: { type: String, required: true },
  name: String,
  savedPostsIDs: [String], // ids of saved posts
  userPostsIDs: [String], // ids of user made posts
  password: { type: String, required: true },
});

const postModel = mongoose.model("post", postSchema);
const userModel = mongoose.model("user", userSchema);

app.get("/", async (req, res) => {
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

app.get("/validusers", async (req, res) => {
  try {
    let posts = await userModel.find();
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

app.post("/login", async (req, res) => {
  try {
    const userData = await userModel.find({ userID: req.body.userID });
    // if user exits, check whether the password matches
    if (userData[0].password === req.body.password) {
      res.status(200).json({
        status: 200,
        data: userData[0],
      });
    } else {
      // if user doesn't exists or password doesn't match
      res.status(400).json({
        status: 400,
        message: "Wrong email/password! User doesn't exists!!",
      });
    }
  } catch (err) {
    // report error if ran under any issues
    res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
});

app.post("/signup", async (req, res) => {
  try {
    const userData = await userModel.find({ userID: req.body.userID });
    if (userData.length) {
      // if user already exists
      res.status(400).json({
        status: 400,
        message: "Can't register using this email/phone! User already exists!!",
      });
    } else {
      // user doesn't exist!! add user login details to users table
      let user = new userModel(req.body);
      user = await user.save();
      res.status(200).json({
        status: 200,
        data: user,
      });
    }
  } catch (err) {
    // report error if ran under any issues
    res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
});

app.post("/share", async (req, res) => {
  try {
    const newPost = new postModel(req.body);
    if (req.body.name !== "Anonymous") {
      const savedPost = await newPost.save();
    }
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
    const { userID, savedID } = req.params;
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

app.listen(8081, function () {
  console.log("App listening at http://127.0.0.1:8081/");
});
