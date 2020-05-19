const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema;
const RequestHistory = require("./requestHistory");
// const User = require("./user");

let RequestSchema = new Schema({
  token: { type: String, required: true, max: 100, unique: true },
  fullName: { type: String, required: true, max: 100 },
  currentCountry: { type: String, required: true, max: 500 },
  phoneNumber: { type: String },
  contactFullName: { type: String, required: true, max: 100 },
  contactPhone: { type: String },
  age: { type: Number },
  gender: { type: String },
  supportRequested: { type: String },
  supportRequiredFor: { type: String },
  houseNumber: { type: String },
  area: { type: String },
  landmark: { type: String },
  district: { type: String },
  status: { type: String },
  postal: { type: String },
  email: { type: String },
  assignedTo: { type: String },
  createdBy: { type: ObjectId, ref: "User" },
  created_at: { type: Date, default: Date.now },
});

// RequestSchema.pre("save", function (next) {
//   var request = this;
//   User.findOne({ userName: request.assignedTo }, (e, d) => {
//     console.log(e, d);
//     request.assignedTo = ObjectId(d._id);
//     next();
//   });
// });

RequestSchema.post("save", function (request, next) {
  const assignment = [{ assignedTo: request.assignedTo, status: 1 }];
  const history = { requestID: request._id, assignment, comments: [] };
  RequestHistory.create(history, (errrr, dattaaa) => {
    return next();
  });
  return next();
});

module.exports = mongoose.model("Requests", RequestSchema);
