const mongoose = require("mongoose");
const likeSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
}, {timestamps: true,});
const bookPostsSchema = new mongoose.Schema({
    title: String,
    author: String,
    review: String,
    genre: String,
    pic_url: String,
    likes: [likeSchema],
}, {timestamps: true});

const usersSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {type: String, unique: true,},
    password: String,
    posts: [bookPostsSchema],
}, {timestamps: true,});
const model = mongoose.model("User", usersSchema);
module.exports = model;