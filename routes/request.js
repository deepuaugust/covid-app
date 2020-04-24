const express = require("express");
const router = express.Router();
const requestController = require("../controllers/request");

router.get("/", requestController.list);
router.get("/:key/:value", requestController.list);

router.post("/update", requestController.update);

router.post("/create", requestController.create);

module.exports = router;

