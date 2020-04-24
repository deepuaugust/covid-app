const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

router.get("/", userController.list);

router.post("/listwithquery", userController.listwithquery);

router.post("/update", userController.update);

module.exports = router;

