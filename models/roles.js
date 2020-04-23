const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema;

let RolesSchema = new Schema({
  name: { type: String, required: true, max: 100 },
  description: { type: String },
  category: { type: ObjectId, ref: "Categories" },
  createdBy: { type: ObjectId, ref: "Users" },
  created_at: { type: Date, default: Date.now },
});

// Export the model
module.exports = mongoose.model("Roles", RolesSchema);
