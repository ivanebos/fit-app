//Import
const express = require("express");
const { loginUser, signupUser } = require("../controllers/userController");

//Init
const router = express.Router();

//login router
router.post("/login", loginUser);

//signup routine
router.post("/signup", signupUser);

module.exports = router;
