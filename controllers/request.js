const { Response, Request, RequestHistory } = require("../models");
const done = (err, data) => {
  console.log(err, data);
};

exports.create = function (req, res) {
  Request.create(req.body, (err, data) => {
    if (err) return res.send(err);
    else {
      const assignment = [{ assignedTo: data.assignedTo, status: 1 }];
      if (data.status !== 1)
        assignment.push({ assignedTo: data.assignedTo, status: data.status });
      const history = { requestID: data._id, assignment, comments: [] };
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
          path: "assignment.assignedTo",
          select: { _id: 1, fName: 1, lName: 1 },
        },
      ],
    },
    (e, data) => {
      return res.json(new Response({ message: "success", data, code: 200 }));
    }
  );
};

exports.addComment = function (req, res) {
  const body = req.body;
  let reponse = {};
  RequestHistory.findById(
    body.id,
    {},
    { populate: "requestID" },
    (err, history) => {
      let status;
      let assignedTo;
      const prevAssignment = history.assignment.length;
      if (prevAssignment.status !== body.status) {
        if (body.status === 3) {
          assignedTo = history.requestID.createdBy;
          status = body.status;
        } else {
          assignedTo = body.assignedTo;
          status = body.status;
        }
        history.assignment.push({ status, assignedTo });
        history.comments.push({ user: assignedTo, comment: body.comment });
        history.save(done);
      }
      Request.findByIdAndUpdate(
        history.requestID,
        { status, assignedTo },
        (e, s) => {
          reponse = { e, s };
        }
      );

      return res.json(
        new Response({
          message: "success",
          data: { err, history },
          code: 200,
        })
      );
    }
  );
};
