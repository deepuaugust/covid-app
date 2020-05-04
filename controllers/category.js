const { Response, Category } = require("../models");

exports.create = function (req, res) {
  Category.create(req.body, (err, data) =>
    err ? res.send(err) : res.json(new Response({ message: "success", data: null, code: 200 }))
  );
};

exports.list = function (req, res) {
  Category.find({}, (err, data) =>
    err ? res.send(err) : res.json(new Response({ message: "success", data, code: 200 }))
  );
};

exports.update = function (req, res) {
  res.send("TODO");
};

exports.summary = function (req, res) {
  Category.countDocuments({}, (err, c) =>
    err
      ? res.send(err)
      : res.json(new Response({ message: "success", data: c, code: 200 }))
  );
};
