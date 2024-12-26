const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const userModel = require("./usermodel/user");
const postModel = require("./usermodel/post")
const app = express();
const bycrypt = require("bcrypt");
const path = require("path");
const multer = require("multer");
const connectDB = require("./usermodel/db");
const user = require("./usermodel/user");

connectDB();

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max file size
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "/HTML/MainPage.html"));
});

app.get("/SignUp", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "/HTML/SignUp.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "/HTML/login.html"));
});

app.get("/homepage", isLoggedin, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "/HTML/HomePage.html"));
});

app.get("/profile", isLoggedin, async (req, res) => {
  res.sendFile(path.join(__dirname, "public", "/HTML/profile.html"));
  let user = await userModel.findOne({ email: req.user.email }).populate("posts");
});

app.get("/userposts", isLoggedin, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email }).populate("posts");
  res.json({ user })
});


app.get("/logout", isLoggedin, (req, res) => {
  res.cookie("token", "")
  // localStorage.setItem("userID", "")
  res.redirect('/')
});

app.get('/like/:id', isLoggedin, async (req, res) => {
  let post = await postModel.findOne({ _id: req.params.id }).populate("user");
  if (post.likes.indexOf(req.user.userid) === -1) {
    post.likes.push(req.user.userid)
  } else {
    post.likes.splice(post.likes.indexOf(req.user.userid), 1)
  }
  await post.save()
  res.redirect("/profile")
});

app.get('/edit', isLoggedin, async (req, res) => {
  let post = await postModel.findOne({ _id: req.params.id }).populate("user");
  res.sendFile(path.join(__dirname, "public", "/HTML/edit.html"));
});

app.get('/people', isLoggedin, async (req, res) => {
  res.sendFile(path.join(__dirname, "public", "/HTML/people.html"));
});

app.get('/friends', isLoggedin, async (req, res) => {
  res.sendFile(path.join(__dirname, "public", "/HTML/friends.html"));
});

app.get('/friendsRequest', isLoggedin, async (req, res) => {
  res.sendFile(path.join(__dirname, "public", "/HTML/friendsRequest.html"));
});

app.get('/friendsRequestData', isLoggedin, async (req, res) => {
  let MainID  = await userModel.findOne({ email: req.user.email })
  let people = await userModel.find({ _id: { $ne: req.user.userid } });
  res.json({ MainID:MainID ,people:people })
});

app.get('/peopleData', isLoggedin, async (req, res) => {
  console.log(req.user.userid)
  let MainID  = await userModel.findOne({ email: req.user.email })
  let people = await userModel.find({ _id: { $ne: req.user.userid } });
  res.json({ MainID:MainID ,people:people })
})  


app.post('/PostData', isLoggedin, async (req, res) => {
  console.log(req.body)
  let post = await postModel.findOne({ _id: req.body.postID }).populate("user");
  res.json({ post })
});

app.post('/update', isLoggedin, async (req, res) => {
  let post = await postModel.findOneAndUpdate({ _id: req.body.postID }, { content: req.body.content });
  res.json({ success: true })
});


app.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let user = await userModel.findOne({ email });
  if (!user) return res.json({ success: false });
  bycrypt.compare(password, user.password, function (err, result) {
    if (result) {
      let token = jwt.sign({ email: email, userid: user._id }, "meow");
      res.cookie("token", token);
      res.json({ success: true });
    } else res.json({ success: false });
  });
});

app.post("/Register", upload.single("picture"), async (req, res) => {
  const { username, email, password, age, profileImage } = req.body;
  let user = await userModel.findOne({ email: email });
  // console.log(username, email, password, age, profileImage);
  if (user) {
    res.json({ success: false });
    return;
  } else {
    bycrypt.genSalt(10, (err, salt) => {
      bycrypt.hash(password, salt, async (err, hash) => {
        let user = await userModel.create({
          username: username,
          email,
          age,
          profileImage,
          password: hash,
        });
        console.log(user)
        let token = jwt.sign({ email: email, userid: user._id }, "meow");
        res.cookie("token", token);
        res.json({ success: true });
      });
    });
  }
});

app.post('/post', isLoggedin, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email })
  let { content } = req.body
  let post = await postModel.create({
    user: user._id,
    content
  })
  user.posts.push(post._id)
  await user.save()
  res.json({ success: true })
})

app.post('/addFriend', isLoggedin, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email })
  if (user.pendingRequest.includes(req.body.friendID)) {
    res.json({ success: false , id: req.body.friendID})
    return;
  } else {
    console.log("false")
    let user = await userModel.findOneAndUpdate({ _id: req.user.userid }, { $push: { pendingRequest: req.body.friendID } })
    let ReceivedRequestUser = await userModel.findOneAndUpdate({ _id: req.body.friendID }, { $push: { receivedRequest: req.user.userid } })
    res.json({ success: true , id: req.body.friendID})
  }
})

app.post('/CancelRequest', isLoggedin, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email })
  if (user.pendingRequest.includes(req.body.friendID)) {
    console.log("true")
    let MainUser = await userModel.findOneAndUpdate({ _id: req.user.userid }, { $pull: { pendingRequest: req.body.friendID } })
    let ReceivedRequestUser = await userModel.findOneAndUpdate({ _id: req.body.friendID }, { $pull: { receivedRequest: req.user.userid } })
    res.json({ success: true , id: req.body.friendID})
  } else {
    res.json({ success: false , id: req.body.friendID})
    return;
  }
})



function isLoggedin(req, res, next) {
  if (req.cookies.token === "") res.redirect("/login");
  else {
    let data = jwt.verify(req.cookies.token, "meow");
    req.user = data;
    next();
  }
}

app.listen(3000);
