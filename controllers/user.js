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
  const { id = "" } = req.params;
  if (id != "") query = { _id: id };

  User.find(query, { password: 0 }, (err, data) =>
    err
      ? res.send(err)
      : res.json(new Response({ message: "success", data, code: 200 }))
  );
};

exports.getAssignee = function (req, res) {
  let body = req.body;
  match = {
    role: new mongoose.Types.ObjectId(body.role),
    type: body.type,
    status: true,
  };

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
  const { body } = req;
  const { category, status, role, fName, lName } = body;
  User.findByIdAndUpdate(body._id, {
    $set: { category, role, status, fName, lName },
  }).exec((err) => {
    console.log(err);
    if (err) return res.json({ success: false, msg: err });
    res.json(
      new Response({
        status: "success",
        message: "User created succesfully.!",
        code: 200,
      })
    );
  });
};

exports.summary = function (req, res) {
  const type = req.params.role;
  User.countDocuments({ type }, (err, c) =>
    err
      ? res.send(err)
      : res.json(new Response({ message: "success", data: c, code: 200 }))
  );
};
