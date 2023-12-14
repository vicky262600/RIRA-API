const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

// create a post
router.post("/", async(req, res)=>{
    const newPost = new Post(req.body)
    try{
        const sevedPost = await newPost.save();
        res.status(200).json(sevedPost);
    }catch(err){
        res.status(500).json(err);
    }
})

// update a post
router.put("/:id", async(req,res)=>{
    const post = await Post.findById(req.params.id);
    try{
        if(post.userId == req.body.userId){
            await post.updateOne({$set:req.body});
            res.status(200).json("the post has been updated")
        }else{
            res.status(402).json("you can only update your post ")
        }
    }catch(err){
        res.status(500).json(err);
    } 
});

// delete a post
router.delete("/:id", async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.userId == req.body.userId){
            await post.deleteOne();
            res.status(200).json("the post has been deleted")
        }else{
            res.status(402).json("you can only delete your post ")
        }
    }catch(err){
        res.status(500).json(err);
    }
})

// like/ dislike a post
router.put("/:id/like", async(req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(!post.like.includes(req.body.userId)){
            await post.updateOne({ $push:{like: req.body.userId}});
            res.status(200).json("you have liked the post")
        }else{
            await post.updateOne({$pull:{like: req.body.userId}});
            res.status(200).json("you have disliked the post")
        }
    }catch(err){
        res.status(500).json(err);

    }
});

// get a post
router.get("/:id", async(req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    }catch(err){
        res.status(500).json(err);
    }
})

// get timeline post
router.get("/timeline/:userId", async(req, res)=>{
    // let postArray = [];
    try{
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({userId: currentUser._id});
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId)=>{
               return Post.find({ userId: friendId});
            })
        );
        res.json(userPosts.concat(...friendPosts))
    }catch(err){
        res.status(500).json(err);  
    }
})  


// get user's post
router.get("/profile/:username", async (req, res)=>{
    try{
        const user = await User.findOne({username: req.params.username})
        const posts = await Post.find({userId: user._id});
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router