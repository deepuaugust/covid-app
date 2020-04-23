const { Response, Roles } = require("../models");

exports.create = function (req, res) {
  Roles.create(req.body, (err, data) =>
    err
      ? res.send(err)
      : res.json(new Response({ message: "success", data: null, code: 200 }))
  );
};

exports.list = function (req, res) {
  Roles.find({}, {}, { populate: { path: "category" } }, (err, data) =>
    err
      ? res.send(err)
      : res.json(new Response({ message: "success", data, code: 200 }))
  );
};

exports.getListByCategory = function (req, res) {
  const { category } = req.params;
  Roles.find({ category }, (err, data) =>
    err
      ? res.send(err)
      : res.json(new Response({ message: "success", data, code: 200 }))
  );
};

exports.update = function (req, res) {
  res.send("TODO");
};
