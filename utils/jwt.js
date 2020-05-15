var bcrypt = require("bcrypt-nodejs");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const { JWTsecret } = require("../config");

/**
 * expiresIn: 100000 sec is equal to 27.7 hrs
 */
function createToken(details) {
  let token = jwt.sign(details, JWTsecret, { expiresIn: 100000 });
  return token;
}

function verifyJWT(req, res, next) {
  var token = req.headers["authorization"] || req.body.authorization || req.query.authorization;
  if (token) {
    jwt.verify(token, JWTsecret, function (err, decoded) {
      if (err) {
        return res.json({
          title: "Authentication Failed",
          error: {
            success: false,
            message: "Failed to authenticate token",
            errorObject: err,
          },
        });
      } else {
        let currentTime = Date.now();
        currentTime = parseInt(currentTime.toString().slice(0, -3));
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      statusCode: 403,
      message: "Authentication Failed. Please login again.",
    });
  }
}

let encryptPassword = function (password) {
  let salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(password, salt);
};

let comparePassword = function (password, userPassword) {
  return bcrypt.compareSync(password, userPassword);
};

module.exports = {
  createToken,
  verifyJWT,
  encryptPassword,
  comparePassword,
};
