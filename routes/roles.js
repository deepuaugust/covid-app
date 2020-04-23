const express = require("express");
const router = express.Router();
const rolesController = require("../controllers/roles");

router.get("/", rolesController.list);

router.post("/create", rolesController.create);

router.post("/update", rolesController.update);

module.exports = router;

