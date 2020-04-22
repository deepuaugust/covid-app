const express = require("express");
const router = express.Router();
const {  category } = require("../controllers");

router.get("/", async (req, res) => {
  let response = await category.list();
  res.status(response.code).send(response);
});

router.post("/create", async (req, res) => {
  let response = await category.create(req.body);
  res.status(response.code).send(response);
});

module.exports = router;
