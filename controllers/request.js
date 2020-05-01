const { Response, Request, RequestHistory, User } = require("../models");
const done = (err, data) => {
  console.log(err, data);
};

exports.create = function (req, res) {
  if (req.body._id) {
    Request.findByIdAndUpdate(
      req.body._id,
      { $set: { ...req.body } },
      (err, data) => {
        if (err) return res.send(err);
        else {
          return res.json(
            new Response({
              message: "success",
              data,
              code: 200,
            })
          );
        }
      }
    );
  } else {
    Request.create(req.body, (err, data) => {
      if (err) return res.send(err);
      else {
        const assignment = [{ assignedTo: data.assignedTo, status: 1 }];
        if (data.status !== 1)
          assignment.push({ assignedTo: data.assignedTo, status: data.status });
        const history = { requestID: data._id, assignment, comments: [] };
        RequestHistory.create(history, (e, s) => {
          return res.json(
            new Response({
              message: "success",
              data: { data, e, s },
              code: 200,
            })
          );
        });
      }
    });
  }
};

exports.list = function (req, res) {
  let query = {};
  const { id = "" } = req.params;
  if (id != "") query = { _id: id };
  Request.find(
    query,
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
      console.log(err, history);
      let status = body.status;
      let assignedTo = history.requestID.assignedTo;
      const { assignment } = history;
      const prevAssignment = assignment[assignment.length - 1];
      if (body.comment != "")
        history.comments.push({ user: body.user, comment: body.comment });
      if (prevAssignment.status !== body.status) {
        if (body.status === 3) {
          assignedTo = history.requestID.createdBy;
          status = body.status;
        }

        history.assignment.push({ status, assignedTo });
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

exports.roleassigned = function (req, res) {
  const { userid } = req.params;
  User.findById(userid, {}, { populate: "role" }, (useErr, userData) => {
    if (useErr)
      res.json(new Response({ message: "fail", data: null, code: 200 }));
    else {
      let query = { assignedTo: userid };
      if (
        (userData.role && userData.role.requestReadAccess) ||
        userData.type === "admin"
      )
        query = {};

      Request.find(
        query,
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
    }
  });
};
