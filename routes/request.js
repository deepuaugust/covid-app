const express = require("express");
const router = express.Router();
const requestController = require("../controllers/request");

router.get("/", requestController.list);

router.get("/roleassigned/:userid", requestController.roleassigned);

router.get("/interact/:requestid", requestController.interact);

router.post("/update", requestController.update);

router.post("/create", requestController.create);

router.post("/addcomment", requestController.addComment);

module.exports = router;

