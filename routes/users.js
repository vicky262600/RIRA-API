const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// update 
router.put("/:id", async(req, res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch(err){
                return res.status(500).json(err)
            }
        }
            try{
                const user = await User.findByIdAndUpdate(req.params.id, {
                    $set: req.body,
                });
                res.status(200).json("Account has been apdated")
            }catch(err){
                return res.status(500).json(err);
            }
    }else{
        return res.status(403).json("You can update only your account");
    }
});

// delete
router.delete("/:id", async (req, res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
            try{
                const user = await User.findByIdAndDelete(req.params.id);
                res.status(200).json("Account has been deleted successfully")
            }catch(err){
                return res.status(500).json(err);
            }
    }else{
        return res.status(403).json("You can delete only your account");
    }
});

// get a user
router.get("/:id", async (req, res)=>{
    try{
        const user = await User.findById(req.params.id)
        const {password, updatedAt, ...other} = user._doc;
        res.status(200).json(other);
    }catch(err){
        res.status(401).json(err);
    }
});

// follow a user
router.put("/:id/follow", async (req, res)=>{
    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({$push:{followers:req.body.userId}})
                await currentUser.updateOne({$push:{followings:req.params.id}});
                res.status(400).json("user has been updated");
            }else{
                res.status(403).json("you allready follow this user")
            }
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("you cant follow yourself")
    }
})

module.exports = router