const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {ObjectId} = Schema

let CategorySchema = new Schema({
  name: { type: String, required: true, max: 100 },
  description: { type: String },
  createdBy: { type: ObjectId, ref: "User" },
  created_at:{ type: Date, default: Date.now }
});

module.exports = mongoose.model("Categories", CategorySchema);
