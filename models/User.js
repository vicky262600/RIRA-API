const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username:{ type: String, required: true, min: 3, max: 20, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true},
        profilePicture: { type: String, default: ""},
        coverPicture: { type: String, default: ""},
        followers: { type: Array, default: []},
        followings: { type: Array, default: []},
        isAdmin: { type: Boolean, default: false},
        desc: {type: String, max: 80},
        city: { type: String, max: 15 },
        from: { type: String, max:15 },
        relationship: { type: String, max: 15}
    },
    {timestamps: true}
);

module.exports = mongoose.model("User", UserSchema);
