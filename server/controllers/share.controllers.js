const User = require("../models/users.model");
const Follow = require("../models/follow.model");
const jwt = require("jsonwebtoken");
const share = async (req, res) => {
    try {
        const {userId, title, author, review, genre, pic_url} = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({message: "User not found"});
        }
        if (pic_url === null) {
            return res.json({message: "image is required"});
        }

        const newBookPost = {
            title,
            author,
            review,
            genre,
            pic_url,
            likes: [],
        };

        user.posts.push(newBookPost);

        await user.save();

        res.status(201).json({message: "Book post added successfully"});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "failed"});
    }
};

const getPost = async (req, res) => {
    try {
        const {id} = req.params;

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({message: "User not found"});
        }
        const userPosts = user.posts.map((post) => ({
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                userId: user._id,
            },
            post: post,
        }));
        const followedUsers = await Follow.find({follower: id});
        const followedUsersData = [];
        for (const follow of followedUsers) {
            const followedUser = await User.findById(follow.following);
            followedUsersData.push(
                ...followedUser.posts.map((post) => ({
                    user: {
                        firstName: followedUser.firstName,
                        lastName: followedUser.lastName,
                        userId: followedUser._id,
                    },
                    post: post,
                }))
            );
        }
        userPosts.sort((a, b) => b.post.createdAt - a.post.createdAt);
        followedUsersData.sort((a, b) => b.post.createdAt - a.post.createdAt);

        res.json({userPosts: userPosts, followedPosts: followedUsersData});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Failed to fetch posts"});
    }
};

const getAllPosts = async (req, res) => {
    try {
        const usersWithPosts = await User.find().populate('posts');
        const token = req.headers.authorization?.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const otherUsers = await User.find({_id: {$ne: decoded._id}});

        const otherUserPostPairs = [];
        otherUsers.forEach(user => {
            user.posts.forEach(post => {
                otherUserPostPairs.push({
                    user: {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        userId: user._id,
                    },
                    post: post,
                });
            });
        });
        otherUserPostPairs.sort((a, b) => b.post.createdAt - a.post.createdAt);
        res.json({data: otherUserPostPairs});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Failed to fetch posts"});
    }
};

module.exports = {share, getPost, getAllPosts};

