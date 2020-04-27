const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema;

let RequestHistorySchema = new Schema({
  requestID: { type: ObjectId, ref: "Requests" },
  comments: [
    {
      user: { type: ObjectId, ref: "User" },
      comment: { type: String },
      created_at: { type: Date, default: Date.now },
    },
  ],
  assignment: [
    {
      previousAssignee: { type: ObjectId, ref: "User" },
      newAssignee: { type: ObjectId, ref: "User" },
      created_at: { type: Date, default: Date.now },
      status: Number,
    },
  ],
});

module.exports = mongoose.model("RequestHistory", RequestHistorySchema);
