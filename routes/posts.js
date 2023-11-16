const router = require("express").Router();
const Post = require("../models/Post");

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
    const post = await Post.findById(req.param.id);
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
})
// delete a post
// like a post
// get a post
// get all post

module.exports = router