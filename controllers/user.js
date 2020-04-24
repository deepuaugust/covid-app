const { Response, User } = require("../models");

exports.list = function (req, res) {
  let query = {};
  const { key = "", value = "" } = req.params;
  if (key !== "" && value !== "") query[key] = value;
  console.log("got hit");
  User.find(
    query,
    {},
    { populate: [{ path: "category" }, { path: "role" }] },
    (err, data) =>
      err
        ? res.send(err)
        : res.json(new Response({ message: "success", data, code: 200 }))
  );
};

exports.listwithquery = function (req, res) {
  let query =  req.body;
  User.find(
    query,
    {},
    { populate: [{ path: "category" }, { path: "role" }] },
    (err, data) =>
      err
        ? res.send(err)
        : res.json(new Response({ message: "success", data, code: 200 }))
  );
};

exports.update = function (req, res) {
  res.send("TODO");
};
