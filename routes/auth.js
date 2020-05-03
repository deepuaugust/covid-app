const express = require("express");
const router = express.Router();
const { auth } = require("../controllers");
const jwt = require("../utils/jwt");

router.post("/signup", jwt.verifyJWT, auth.signup);

router.post("/login", auth.login);

module.exports = router;




