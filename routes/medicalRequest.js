const express = require("express");
const router = express.Router();
const medicalRequestController = require("../controllers/medicalRequest");
const jwt = require("../utils/jwt");

// router.get("/", jwt.verifyJWT, requestController.list);

router.get("/:id", jwt.verifyJWT, medicalRequestController.list);

router.get(
  "/roleassigned/:userid",
  jwt.verifyJWT,
  medicalRequestController.roleassigned
);

router.post("/create", jwt.verifyJWT, medicalRequestController.create);

router.post("/upload", jwt.verifyJWT, medicalRequestController.upload);

// router.get("/interact/:requestid", jwt.verifyJWT, requestController.interact);

// router.get("/summary/:userid", jwt.verifyJWT, requestController.summary);

// router.post("/update", jwt.verifyJWT, requestController.update);

// router.post("/addcomment", jwt.verifyJWT, requestController.addComment);


module.exports = router;
