const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema;

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
  fullAddress: { type: String },
  district: { type: String },
  status: { type: Number },
  postal: { type: String },
  email: { type: String },
  assignedTo: { type: ObjectId, ref: "User" },
  createdBy: { type: ObjectId, ref: "User" },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Requests", RequestSchema);
