const { category } = require("../controllers");

const express = require("express");
const router = express.Router();

router.get("/", category.list);

router.post("/create", category.create);

router.post("/update", category.update);

module.exports = router;
