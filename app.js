//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const app = express();
const ejs = require("ejs");
var _ = require("lodash");
const homeStartingContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const topRumorsContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/factDB", { useNewUrlParser: true });

const postSchema = {
  title: String,
  content: String
};
const Post = mongoose.model("Post", postSchema);
app.get("/", function(req, res) {
  Post.find({}, function(err, posts) {
    res.render("home", {
      startingContent: homeStartingContent,
      postItems: posts
    });
  });
});
app.get("/topRumors", function(req, res) {
  res.render("topRumors", { postItems:posts });
});

app.get("/topRumors02", function(req, res) {
  res.render("topRumors02",{topRumorsContentContainer:topRumorsContent});
});
app.get("/topRumors03", function(req, res) {
  res.render("topRumors03", { topRumorsContentContainer: topRumorsContent });
});
app.get("/submit",function(req,res){
    res.render("submit");
});
app.get("/topRumors/:postId", function(req, res) {
 const requestedPostId = req.params.postId;

 Post.findOne({ _id: requestedPostId }, function(err, post) {
   res.render("post", {
     title: post.title,
     content: post.content
   });
 });
});
app.post("/submit",function(req,res){
    const post = new Post({
      title: req.body.postTitle,
      content: req.body.postBody
    });

    post.save(function(err) {
      if (!err) {
        res.redirect("/");
      }
    });
});
/*app.post("/compose", function(req, res) {
  var post = {
    Title: req.body.draftTitle,
    content: req.body.draftContent
  };
  postItems.push(post);
  res.redirect("/");
});*/
app.get("/article01",function(req,res){
  res.render("article01");
});
app.get("/contact", function(req, res) {
  res.render("contact", { contactContentContainer: contactContent });
});



app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});

