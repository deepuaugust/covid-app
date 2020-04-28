const express = require("express");
const router = express.Router();
const requestController = require("../controllers/request");

router.get("/", requestController.list);

router.get("/interact/:requestid", requestController.interact);

router.post("/update", requestController.update);

router.post("/create", requestController.create);

module.exports = router;

