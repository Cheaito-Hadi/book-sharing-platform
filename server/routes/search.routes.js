const express = require("express");
const router = express.Router();
const { userSearch } = require("../controllers/search.controllers");

router.get("/", userSearch);

module.exports = router;
