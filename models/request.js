const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema;

let RequestSchema = new Schema({
  title: { type: String, required: true, max: 100 },
  description: { type: String },
  country: { type: String, required: true },
  currentAddress: { type: String },
  nativeAddress: { type: String },
  primaryContactNumber: { type: String, required: true },
  alternateContactNumber: { type: String },
  status: { type: String },
  category: { type: ObjectId, ref: "Categories" },
  role: { type: ObjectId, ref: "Roles" },
  assignedTo: { type: ObjectId, ref: "User" },
  createdBy: { type: ObjectId, ref: "User" },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Requests", RequestSchema);
