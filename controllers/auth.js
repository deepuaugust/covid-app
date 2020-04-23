const { Response, User } = require("../models");
// const { mongo } = require("../dao");
const { collections, userTypes } = require("../const");
const jwt = require("../utils/jwt");
const { JWTsecret } = require("../config");

exports.createAdmin = function (adminData) {
  // var newUser = new User(adminData);
  // newUser.save((err) => {
  User.create(adminData, (err, data) =>
    err
      ? console.log({ status: "failed", msg: err })
      : console.log({
          status: "success",
          msg: "Successful created new user.",
        })``
  );
};

exports.signup = function (req, res) {
  console.log(req.body);
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
    // save the user
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
  User.findOne(
    {
      userName: req.body.userName,
    },
    (err, user) => {
      if (err) throw err;

      if (!user) {
        res.status(401).send({
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
            res.status(401).send({
              success: false,
              msg: "Authentication failed. Wrong password.",
            });
          }
        });
      }
    }
  );
};

exports.checkAdmins = function () {
  User.count({ type: userTypes.ADMIN }, (e, c) => (e ? e : c));
};
