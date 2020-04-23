const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const Schema = mongoose.Schema;
const { ObjectId } = Schema;

let UserSchema = new Schema({
  fName: { type: String, required: true, max: 100 },
  lName: { type: String },
  userName: { type: String, required: true, unique: true, max: 20 },
  password: { type: String, required: true },
  type: String,
  createdBy: { type: ObjectId, ref: "Users" },
  created_at: { type: Date, default: Date.now },
});

UserSchema.pre("save", function (next) {
  var user = this;
  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, null, function (err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

UserSchema.methods.comparePassword = function (passw, cb) {
  bcrypt.compare(passw, this.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

module.exports= mongoose.model("User", UserSchema);
