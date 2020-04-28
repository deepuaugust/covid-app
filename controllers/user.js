const { Response, User } = require("../models");

exports.listWithRole = function (req, res) {
  const type = req.params.role;
  let populate = {};
  if (type === "regular")
    populate = { populate: [{ path: "category" }, { path: "role" }] };

  User.find({type}, {}, populate, (err, data) =>
    err
      ? res.send(err)
      : res.json(new Response({ message: "success", data, code: 200 }))
  );
};

exports.list = function (req, res) {
  let query = {};

  User.find(query, {}, (err, data) =>
    err
      ? res.send(err)
      : res.json(new Response({ message: "success", data, code: 200 }))
  );
};

exports.listwithquery = function (req, res) {
  let query = req.body;
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
