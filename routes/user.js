const express = require("express");
const router = express.Router();
const jwt = require("../utils/jwt");
const userController = require("../controllers/user");

router.get("/", jwt.verifyJWT, userController.list);

router.get("/role/:role", jwt.verifyJWT, userController.listWithRole);

router.post("/getassignee", jwt.verifyJWT, userController.getAssignee);

router.post("/update", jwt.verifyJWT, userController.update);

router.get("/summary/:role", jwt.verifyJWT, userController.summary);

module.exports = router;
