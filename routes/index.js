var express = require('express');
var router = express.Router();
const userModel=require("./users");
const postModel=require("./post")
const passport = require('passport');
const upload=require("./multer")
const localStrategy=require("passport-local").Strategy
passport.use(new localStrategy(userModel.authenticate()))


router.get('/', function(req, res, next) {
res.render("landingpage")
});
router.get("/register",function(req,res){
  res.render("register")
})
router.get("/login",function(req,res){
  res.render("login")
})
router.post("/register", function (req, res) {

  const {username,email}=req.body

  const userdata=new userModel({username,email })
  console.log("Before registration:" + username,email )

  userModel.register(userdata, req.body.password, function (err, registeredUser) {
    if (err) {
      console.error(err+"Error");
      return res.redirect("/");
    }
    // console.log('After registration:', registeredUser);
    passport.authenticate("local")(req, res, function () {
      res.redirect("/profile");
    });
  });
});
router.get("uploadDp",function(req,res){
  res.render("uploadDp")
})

router.post("/login",passport.authenticate("local",{
successRedirect:"/feed",
failureRedirect:"/login",
failureFlash:true
})
)
router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) return next(err);
    res.redirect("/");
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}
router.get("/profile",isLoggedIn,async function(req,res){
  const user=await userModel.findOne({username:req.session.passport.user})
  res.render("profile",{user})
})

router.get("/createpost",function(req,res){
  res.render("createpost")
})

router.post("/upload",isLoggedIn,upload.single("post"),async function(req,res){
  const user=await userModel.findOne({username:req.session.passport.user})
  const post =await postModel.create({
    postTitle:req.body.postTitle,
    image:req.file.filename,
    postDescription:req.body.postDescription,
    user:user._id
  })
user.posts.push(post._id)
await user.save()
res.redirect("/profile")

})

router.get("/saved",isLoggedIn,async function(req,res){

  const user=await userModel.findOne({username:req.session.passport.user})
  .populate("posts")
  res.render("saved",{user})
})
router.get("/saved/post/:postId",isLoggedIn,async function(req,res){
  const user=await userModel.findOne({username:req.session.passport.user})
  const postId=req.params.postId
  const post=await postModel.findOne({_id:postId})
  res.render("showPost",{post})
})

router.get("/feed",async function(req,res){
const posts=await postModel.find()
res.render("feed",{posts})
})
router.post("/editprofileimage",isLoggedIn,upload.single("dp"),async function(req,res){
  const user=await userModel.findOne({username:req.session.passport.user})
  user.profileImage=req.file.filename
  await user.save()
  res.redirect("/profile")
})
module.exports = router;
