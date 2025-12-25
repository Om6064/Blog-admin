const express = require("express");
const { getLogin, getSignUp, signUpUser, loginUser, logOut } = require("../controllers/authController.js");
const router = express.Router();

router.get("/", getLogin);
router.get("/sign-up", getSignUp);
router.post("/sign-up", signUpUser);
router.post("/", loginUser);
router.post("/log-out", logOut)
module.exports = router;