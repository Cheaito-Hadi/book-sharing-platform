const express = require("express");
const router = express.Router();
const { share, getPost, getAllPosts } = require("../controllers/share.controllers");

router.post("/share_book", share);
router.get("/get_posts/:id?", getPost);
router.get("/get_all_posts", getAllPosts);

module.exports = router;
