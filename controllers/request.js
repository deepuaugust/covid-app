const { Response, Request, RequestHistory } = require("../models");

exports.create = function (req, res) {
  Request.create(req.body, (err, data) => {
    if (err) return res.send(err);
    else {
      const history = {
        requestID: data._id,
        assignment: [
          {
            previousAssignee: data.createdBy,
            newAssignee: data.assignedTo,
            status: 1,
          },
        ],
      };
      RequestHistory.create(history, (e, s) => {
        return res.json(
          new Response({ message: "success", data: { data, e, s }, code: 200 })
        );
      });
    }
  });
};

exports.list = function (req, res) {
  Request.find(
    {},
    {},
    {
      populate: [
        { path: "category", select: { _id: 1, name: 1 } },
        { path: "assignedTo", select: { _id: 1, fName: 1, lName: 1 } },
        { path: "role", select: { _id: 1, name: 1 } },
        { path: "createdBy", select: { _id: 1, fName: 1, lName: 1 } },
      ],
    },

    (err, data) =>
      err
        ? res.send(err)
        : res.json(new Response({ message: "success", data, code: 200 }))
  );
};
exports.update = function (req, res) {
  res.send("TODO");
};

exports.interact = function (req, res) {
  const requestID = req.params.requestid;
  RequestHistory.findOne(
    { requestID },
    {},
    {
      populate: [
        {
          path: "requestID",
          populate: [
            { path: "category", select: { _id: 1, name: 1 } },
            { path: "assignedTo", select: { _id: 1, fName: 1, lName: 1 } },
            { path: "role", select: { _id: 1, name: 1 } },
            { path: "createdBy", select: { _id: 1, fName: 1, lName: 1 } },
          ],
        },
        {
          path: "assignment.previousAssignee",
          select: { _id: 1, fName: 1, lName: 1 },
        },
        {
          path: "assignment.newAssignee",
          select: { _id: 1, fName: 1, lName: 1 },
        },
      ],
    },
    (e, data) => {
      return res.json(new Response({ message: "success", data, code: 200 }));
    }
  );
};
