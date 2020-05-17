const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema;

let MedicalRequest = new Schema({
  token: String,
  contactNumber: String,
  age: Number,
  gender: String,
  area: String,
  country: String,
  complaints: String,
  assignedTo: String,
  requirement: String,
  covidStatus: String,
  medicalHistory: String,
  details: String,
  currentIssues: String,
  currentPrescription: String,
  advice: String,
  prescriptionIssue: String,
  medicalFollowup: String,
  comments: String,
  createdBy: { type: ObjectId, ref: "User" },
  created_at: { type: Date, default: Date.now },
  status: String,
});

module.exports = mongoose.model("MedicalRequest", MedicalRequest);
