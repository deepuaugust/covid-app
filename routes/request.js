const express = require("express");
const router = express.Router();
const requestController = require("../controllers/request");
const jwt = require("../utils/jwt");

router.get("/", jwt.verifyJWT, requestController.list);

router.get("/:id", jwt.verifyJWT, requestController.list);

router.get("/roleassigned/:userid", jwt.verifyJWT, requestController.roleassigned);

router.get("/interact/:requestid", jwt.verifyJWT, requestController.interact);

router.post("/update", jwt.verifyJWT, requestController.update);

router.post("/create", jwt.verifyJWT, requestController.create);

router.post("/addcomment", jwt.verifyJWT, requestController.addComment);

module.exports = router;

