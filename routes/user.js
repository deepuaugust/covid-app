const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

router.get("/", userController.list);
router.get("/:key/:value", userController.list);

router.post("/update", userController.update);

module.exports = router;

