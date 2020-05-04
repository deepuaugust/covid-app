const express = require("express");
const router = express.Router();
const jwt = require("../utils/jwt");
const rolesController = require("../controllers/roles");

router.get("/", jwt.verifyJWT, rolesController.list);

router.get("/category/:category", jwt.verifyJWT, rolesController.getListByCategory);

router.post("/create", jwt.verifyJWT, rolesController.create);

router.post("/update", jwt.verifyJWT, rolesController.update);

router.get("/summary", jwt.verifyJWT, rolesController.summary);

module.exports = router;

