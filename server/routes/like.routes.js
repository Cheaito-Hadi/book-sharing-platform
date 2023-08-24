const express = require("express");
const router = express.Router();
const { userLike, userUnlike } = require("../controllers/like.controllers");

router.post("/like", userLike);
router.post("/unlike", userUnlike);

module.exports = router;
