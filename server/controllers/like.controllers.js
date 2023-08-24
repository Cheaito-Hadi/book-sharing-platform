const User = require("../models/users.model");

const userLike = async (req, res) => {
    const { user_id, postId } = req.body;

    try {
        const user = await User.findOne({ _id: user_id });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const postUser = await User.findOne({ "posts._id": postId });
        if (!postUser) {
            return res.status(404).json({ message: "Post not found" });
        }

        const post = postUser.posts.find((post) => post._id.toString() === postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        post.likes.push({ user_id });
        await postUser.save();

        res.json({ message: "Post liked successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "failed" });
    }
};
const userUnlike = async (req, res) => {
    const { user_id, postId } = req.body;

    try {
        const user = await User.findOne({ _id: user_id });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const postUser = await User.findOne({ "posts._id": postId });
        if (!postUser) {
            return res.status(404).json({ message: "Post not found" });
        }

        const post = postUser.posts.find((post) => post._id.toString() === postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        post.likes = post.likes.filter(
            (like) => like.user_id.toString() !== user_id
        );
        await postUser.save();
        await postUser.save();

        res.json({ message: "Post unliked successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "failed" });
    }
};

module.exports = { userLike, userUnlike };
