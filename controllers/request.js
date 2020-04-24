const { Response, Request } = require("../models");

exports.create = function (req, res) {
  Request.create(req.body, (err, data) =>
    err
      ? res.send(err)
      : res.json(new Response({ message: "success", data: null, code: 200 }))
  );
};

exports.list = function (req, res) {
  Request.find(
    {},
    {},
    { populate: [{ path: "category" },{ path: "assignedTo" }, { path: "role" }] },

    (err, data) => {
      console.log(data);
      return err
        ? res.send(err)
        : res.json(new Response({ message: "success", data, code: 200 }));
    }
  );
};
exports.update = function (req, res) {
  res.send("TODO");
};
