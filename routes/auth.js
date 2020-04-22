const express = require("express");
const router = express.Router();
const { auth } = require("../controllers");

router.post("/signup", async (req, res) => {
  console.log(req.body);
  let response = await auth.signup(req.body);
  res.status(response.code).send(response);
});

router.post("/login", async (req, res) => {
  let response = await auth.login(req.body);
  res.status(response.code).send(response);
});

module.exports = router;
