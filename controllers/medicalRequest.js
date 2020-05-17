const mongoose = require("mongoose");
const { Response, User, MedicalRequest } = require("../models");

const handler = (err, data) => {
  console.log(err, data);
};

exports.create = function (req, res, next) {
  const { body } = req;
  if (body._id) {
    MedicalRequest.findByIdAndUpdate(
      body._id,
      { $set: { ...body } },
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
    MedicalRequest.create(body, (err, data, next) => {
      if (err) return res.send(err);
      else
        return res.json(
          new Response({
            message: "success",
            data,
            code: 200,
          })
        );
    });
  }
};

exports.upload = function (req, res) {
  let { data, createdBy } = req.body;
  const { Medical = [] } = data;

  if (data && data.length == 0)
    return res.json(
      new Response({ message: "invalid file", data: null, code: 200 })
    );

  let newD = [];

  const keys = {
    token: "Nanma Reg No",
    country: "Country",
    area: "Area in Country",
    contactNumber: "Contact Number",
    age: "Age",
    gender: "Gender",
    complaints: "complaints",
    assignedTo: "assigned to",
    requirement: "Requirements General/Mental",
    covidStatus: "Covid Status Positive/Negative/Unknown",
    medicalHistory: "Medical / Psych History Yes/No",
    details: "Details",
    currentIssues: "Current Issues",
    currentPrescription: "Current Medication Yes/No",
    advice: "Advises or Medication",
    prescriptionIssue: "Prescription Issued Yes/No",
    medicalFollowup: "Medical / Mental /Social Follow up?",
    comments: "Comments",
    status: "status",
  };
  Medical.map((d) => {
    let obj = { createdBy };

    obj.token = d[keys.token];
    obj.country = d[keys.country];
    obj.area = d[keys.area];
    obj.contactNumber = d[keys.contactNumber];
    obj.age = d[keys.age];
    obj.gender = d[keys.gender];
    obj.complaints = d[keys.complaints];
    obj.assignedTo = d[keys.assignedTo];
    obj.requirement = d[keys.requirement];
    obj.covidStatus = d[keys.covidStatus];
    obj.medicalHistory = d[keys.medicalHistory];
    obj.details = d[keys.details];
    obj.currentIssues = d[keys.currentIssues];
    obj.currentPrescription = d[keys.currentPrescription];
    obj.advice = d[keys.advice];
    obj.prescriptionIssue = d[keys.prescriptionIssue];
    obj.medicalFollowup = d[keys.medicalFollowup];
    obj.status = d[keys.status];
    obj.comments = d[keys.comments];
    newD.push(obj);
    return newD;
  });

  MedicalRequest.insertMany(newD, (e, requests) => {
    if (e) {
      return res.json(e);
    } else {
      res.json(new Response({ message: "success", data: requests, code: 200 }));
    }
  });
};

exports.list = function (req, res) {
  let query = {};
  const { id = "" } = req.params;
  if (id != "") query = { _id: id };
  MedicalRequest.find(
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

// exports.update = function (req, res) {
//   res.send("TODO");
// };

// exports.interact = function (req, res) {
//   const requestID = req.params.requestid;
//   RequestHistory.findOne(
//     { requestID },
//     {},
//     {
//       populate: [
//         {
//           path: "requestID",
//           populate: [
//             {
//               path: "createdBy",
//               select: { _id: 1, fName: 1, lName: 1 },
//             },
//           ],
//         },
//       ],
//     },
//     (e, data) => {
//       return res.json(new Response({ message: "success", data, code: 200 }));
//     }
//   );
// };

// exports.addComment = function (req, res) {
//   const body = req.body;
//   let reponse = {};
//   RequestHistory.findById(
//     body.id,
//     {},
//     { populate: "requestID" },
//     (err, history) => {
//       let status = body.status;
//       let assignedTo = history.requestID.assignedTo;
//       const { assignment } = history;
//       const prevAssignment = assignment[assignment.length - 1];
//       if (body.comment != "")
//         history.comments.push({ user: body.user, comment: body.comment });
//       if (prevAssignment.status !== body.status) {
//         if (body.status === 4) {
//           User.findById(history.requestID.createdBy, (userErr, userData) => {
//             assignedTo = userData.username;
//             status = body.status;
//           });
//         }

//         history.assignment.push({ status, assignedTo });
//         history.save(handler);
//       }
//       Request.findByIdAndUpdate(
//         history.requestID,
//         { status, assignedTo },
//         (e, s) => {
//           reponse = { e, s };
//         }
//       );

//       return res.json(
//         new Response({
//           message: "success",
//           data: { err, history },
//           code: 200,
//         })
//       );
//     }
//   );
// };

exports.roleassigned = function (req, res) {
  const { userid } = req.params;
  User.findById(
    userid,
    {},
    { populate: { path: "role" } },
    (useErr, userData) => {
      if (useErr)
        res.json(new Response({ message: "fail", data: null, code: 200 }));
      else {
        let query = { assignedTo: userData.userName };
        if (userData.role && userData.role.requestReadAccess)
          query = { createdBy: userid };
        if (userData.type === "admin") query = {};
        console.log(query);
        MedicalRequest.find(
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

// exports.summary = function (req, res) {
//   const { userid } = req.params;
//   User.findById(userid, (err, user) => {
//     let match = {};
//     if (user.type === "regular")
//       match = { createdBy: new mongoose.Types.ObjectId(userid) };
//     Request.aggregate(
//       [{ $match: match }, { $group: { _id: "$status", count: { $sum: 1 } } }],
//       (errReq, data) =>
//         errReq
//           ? res.send(errReq)
//           : res.json(new Response({ message: "success", data, code: 200 }))
//     );
//   });
// };
