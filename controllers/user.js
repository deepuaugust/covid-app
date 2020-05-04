const { Response, User } = require("../models");
const mongoose = require("mongoose");

exports.listWithRole = function (req, res) {
  const type = req.params.role;
  let populate = {};
  if (type === "regular")
    populate = { populate: [{ path: "category" }, { path: "role" }] };

  User.find({ type }, {}, populate, (err, data) =>
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

exports.getAssignee = function (req, res) {
  let body = req.body;
  match = { role: new mongoose.Types.ObjectId(body.role), type: body.type };

  User.aggregate(
    [
      { $match: match },
      {
        $lookup: {
          from: "requests",
          localField: "_id",
          foreignField: "assignedTo",
          as: "total",
        },
      },
      {
        $project: {
          fName: 1,
          lName: 1,
          total: {
            $size: {
              $filter: {
                input: "$total",
                as: "child",
                cond: { $in: ["$$child.status", [1, 2, 3]] },
              },
            },
          },
        },
      },
    ],
    (err, data) =>
      err
        ? res.send(err)
        : res.json(new Response({ message: "success", data, code: 200 }))
  );
};

exports.update = function (req, res) {
  res.send("TODO");
};
