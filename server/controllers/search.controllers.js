const User = require("../models/users.model");

const userSearch = async (req, res) => {
    const {query} = req.query;

    try {
        const regexQuery = new RegExp(query, "i");
        const searchOptions = {
            $or: [
                {"posts.title": {$regex: regexQuery}},
                {"posts.author": {$regex: regexQuery}},
                {"posts.genre": {$regex: regexQuery}},
                {"posts.review": {$regex: regexQuery}},
            ],
        };

        const usersPosts = await User.find(searchOptions);

        if (usersPosts.length > 0) {
            const matchingPosts = [];

            usersPosts.forEach((user) => {
                user.posts.forEach((post) => {
                    if (
                        post.title.match(regexQuery) ||
                        post.author.match(regexQuery) ||
                        post.genre.match(regexQuery) ||
                        post.review.match(regexQuery)
                    ) {
                        matchingPosts.push({
                            user: {
                                userId: user._id,
                                firstName: user.firstName,
                                lastName: user.lastName,
                            },
                            post: {
                                postId: post._id,
                                title: post.title,
                                author: post.author,
                                genre: post.genre,
                                review: post.review,
                                likes: post.likes,
                                pic_url: post.pic_url,
                            }
                        });
                    }
                });
            });

            return res.status(200).json({message: "success", data: matchingPosts});
        } else {
            return res.json({message: "No matching posts found"});
        }
    } catch (error) {
        console.error(error);
        return res.json({message: "No matching posts found"});
    }
};

module.exports = {userSearch};
