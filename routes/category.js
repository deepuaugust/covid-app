const { category } = require("../controllers");
const jwt = require("../utils/jwt");
const express = require("express");
const router = express.Router();

router.get("/", jwt.verifyJWT, category.list);

router.post("/create", jwt.verifyJWT, category.create);

router.post("/update", jwt.verifyJWT, category.update);

module.exports = router;
