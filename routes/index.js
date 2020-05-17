var express = require("express");
var router = express.Router();

const category = require("./category");
const roles = require("./roles");
const user = require("./user");
const request = require("./request");
const medicalRequest = require("./medicalRequest");

/* GET home page. */
router.get("/", (req, res) => res.render("index", { title: "Express" }));

router.use("/category", category);

router.use("/roles", roles);

router.use("/user", user);

router.use("/request", request);

router.use("/medicalrequest", medicalRequest);

module.exports = router;
