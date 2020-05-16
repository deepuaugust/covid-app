const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema;

let RequestHistorySchema = new Schema({
  requestID: { type: ObjectId, ref: "Requests" },
  comments: [
    {
      user: String,
      comment: { type: String },
      created_at: { type: Date, default: Date.now },
    },
  ],
  assignment: [
    {
      assignedTo: String,
      created_at: { type: Date, default: Date.now },
      status: String,
    },
  ],
});

module.exports = mongoose.model("RequestHistory", RequestHistorySchema);
