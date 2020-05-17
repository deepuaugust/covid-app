const mongoose = require("mongoose");
const { Response, Request, RequestHistory, User } = require("../models");

const handler = (err, data) => {
  console.log(err, data);
};

exports.create = function (req, res, next) {
  const { body } = req;
  if (body._id) {
    Request.findById(body._id)
      .lean()
      .exec((requestErr, requestData) => {
        if (
          requestData &&
          (requestData.status !== body.status ||
            requestData.assignedTo != body.assignedTo)
        ) {
          RequestHistory.updateOne(
            { requestID: body._id },
            {
              $push: {
                assignment: {
                  assignedTo: body.assignedTo,
                  status: body.status,
                },
                comments: {
                  comment: "Request modified",
                },
              },
            },
            handler
          );
        }
      });

    Request.findByIdAndUpdate(body._id, { $set: { ...body } }, (err, data) => {
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
    });
  } else {
    Request.create(body, (err, data, next) => {
      console.log(err, data);
      if (err) return res.send(err);
      else
        new Response({
          message: "success",
          data,
          code: 200,
        });
    });
  }
};

exports.upload = function (req, res) {
  let { data, createdBy } = req.body;
  console.log(createdBy);
  const { Sheet1 = [] } = data;
  let newD = [];

  const keys = {
    token: "Token Number",
    currentCountry: "Current Country of Residence",
    fullName: "Full Name",
    phoneNumber: "Contact WhatsApp Number",
    contactPhone: "Phone Number to be contacted",
    age: "Age",
    gender: "Gender",
    supportRequested: "Support Requested",
    supportRequiredFor: "Support Required for",
    contactFullName: "Full name of the Person to be Contacted*",
    houseName: "Flat No / House No / House Name",
    location: " Apartments / Local Area / Street / Road",
    landmark: "Landmark & Post Office",
    district: "District / City",
    postal: "Postal Code",
    email: "EMAIL Address",
    status: "Status",
    assignedTo: "Forwarded to",
  };
  Sheet1.map((d) => {
    let obj = { createdBy };

    obj.token = d[keys.token];

    obj.currentCountry = d[keys.currentCountry];
    obj.fullName = d[keys.fullName];
    obj.phoneNumber = d[keys.phoneNumber];
    obj.contactPhone = d[keys.contactPhone];
    obj.age = d[keys.age];
    obj.gender = d[keys.gender];
    obj.supportRequested = d[keys.supportRequested];
    obj.supportRequiredFor = d[keys.supportRequiredFor];
    obj.contactFullName = d[keys.contactFullName];
    obj.fullAddress = d[keys.fullAddress];
    obj.district = d[keys.district];
    obj.postal = d[keys.postal];
    obj.email = d[keys.email];
    obj.status = d[keys.status];
    obj.assignedTo = d[keys.assignedTo];
    newD.push(obj);
    return newD;
  });
  Request.insertMany(newD, (e, requests) => {
    if (e) {
      /* TOD0 delete created req */
      res.json(e);
    } else {
      let history = [];
      requests.map((req) => {
        const hisObj = {};
        hisObj.requestID = req._id;
        hisObj.assignment = [
          { assignedTo: req.assignedTo, status: req.status },
        ];
        history.push(hisObj);
      });
      RequestHistory.insertMany(history, (requestsErr, requestsHis) => {
        requestsErr
          ? res.json(requestsErr)
          : res.json(
              new Response({ message: "success", data: requestsHis, code: 200 })
            );
      });
    }
  });
};

exports.list = function (req, res) {
  let query = {};
  const { id = "" } = req.params;
  if (id != "") query = { _id: id };
  Request.find(
    query,
    {},
    {
      populate: [{ path: "createdBy", select: { _id: 1, fName: 1, lName: 1 } }],
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
            {
              path: "createdBy",
              select: { _id: 1, fName: 1, lName: 1 },
            },
          ],
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
      let status = body.status;
      let assignedTo = history.requestID.assignedTo;
      const { assignment } = history;
      const prevAssignment = assignment[assignment.length - 1];
      if (body.comment != "")
        history.comments.push({ user: body.user, comment: body.comment });
      if (prevAssignment.status !== body.status) {
        if (body.status === 4) {
          User.findById(history.requestID.createdBy, (userErr, userData) => {
            assignedTo = userData.username;
            status = body.status;
          });
        }

        history.assignment.push({ status, assignedTo });
        history.save(handler);
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
  User.findById(
    userid,
    {},
    { populate: { path: "role" } },
    (useErr, userData) => {
      console.log(userData);
      if (useErr)
        res.json(new Response({ message: "fail", data: null, code: 200 }));
      else {
        let query = { assignedTo: userData.userName };
        if (userData.role && userData.role.requestReadAccess)
          query = { createdBy: userid };
        if (userData.type === "admin") query = {};
        console.log(query);
        Request.find(
          query,
          {},
          {
            populate: {
              path: "createdBy",
              select: { _id: 1, fName: 1, lName: 1 },
            },
          },

          (err, data) =>
            err
              ? res.send(err)
              : res.json(new Response({ message: "success", data, code: 200 }))
        );
      }
    }
  );
};

exports.summary = function (req, res) {
  const { userid } = req.params;
  User.findById(userid, (err, user) => {
    let match = {};
    if (user.type === "regular")
      match = { createdBy: new mongoose.Types.ObjectId(userid) };
    Request.aggregate(
      [{ $match: match }, { $group: { _id: "$status", count: { $sum: 1 } } }],
      (errReq, data) =>
        errReq
          ? res.send(errReq)
          : res.json(new Response({ message: "success", data, code: 200 }))
    );
  });
};
