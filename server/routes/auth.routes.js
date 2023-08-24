const express = require("express");
const router = express.Router();
const {
    login,
    register,
    verify,
    logout,
} = require("../controllers/auth.controllers");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/login", login);
router.post("/register", register);
router.get("/verify", authMiddleware, verify);
router.post("/logout", authMiddleware, logout);

module.exports = router;
