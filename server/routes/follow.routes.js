const express = require("express");
const router = express.Router();
const {
    followUser,
    unfollowUser,
    checkFollow,
} = require("../controllers/follow.controllers");

router.post("/follow", followUser);
router.post("/unfollow", unfollowUser);
router.get("/", checkFollow);

module.exports = router;
