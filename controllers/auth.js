const { Response, User } = require("../models");
// const { mongo } = require("../dao");
const { collections, userTypes } = require("../const");
const jwt = require("../utils/jwt");
const { JWTsecret } = require("../config");

exports.createAdmin = function (adminData) {
  User.create(adminData, (err, data) =>
    err
      ? { status: "failed", msg: err }
      : {
          status: "success",
          msg: "Successful created new user.",
          data,
        }
  );
};

exports.signup = function (req, res) {
  if (!req.body.userName || !req.body.password) {
    res.json(
      new Response({
        message: "Please Enter username and password",
        status: "failed",
        code: 200,
      })
    );
  } else {
    var newUser = new User(req.body);
    newUser.save((err) => {
      if (err) {
        return res.json({ success: false, msg: err });
      }
      res.json(
        new Response({
          status: "success",
          message: "User created succesfully.!",
          code: 200,
        })
      );
    });
  }
};

exports.login = function login(req, res) {
  const { userName } = req.body;
  User.findOne({ userName }, (err, user) => {
    if (err) throw err;

    if (!user) {
      res.status(201).send({
        success: false,
        msg: "Authentication failed. User not found.",
      });
    } else {
      // check if password matches
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.createToken(user.toJSON(), JWTsecret, {
            expiresIn: "30m",
          });
          // return the information including token as JSON
          res.json(
            new Response({
              status: "success",
              message: "Authentication succesfull.!",
              data: { jwtToken: token, userDetails: user },
              code: 200,
            })
          );
        } else {
          res.status(201).send({
            success: false,
            msg: "Authentication failed. Wrong password.",
          });
        }
      });
    }
  });
};

exports.checkAdmins = function () {
  User.count({ type: userTypes.ADMIN }, (e, c) => (e ? e : c));
};
