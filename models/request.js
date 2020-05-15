const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema;

let RequestSchema = new Schema({
  token: { type: String, required: true, max: 100, unique: true },
  title: { type: String, required: true, max: 500 },
  fullName: { type: String, required: true, max: 100 },
  description: { type: String },
  country: { type: String, required: true },
  currentAddress: { type: String },
  nativeAddress: { type: String },
  communicationMedium: { type: Number, required: true },
  primaryContactNumber: { type: Number, unique: true, required: true },
  alternateContactNumber: { type: String },
  status: { type: Number, required: true },
  category: { type: ObjectId, ref: "Categories" },
  role: { type: ObjectId, ref: "Roles" },
  assignedTo: { type: ObjectId, ref: "User" },
  createdBy: { type: ObjectId, ref: "User" },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Requests", RequestSchema);
